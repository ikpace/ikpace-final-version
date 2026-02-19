import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: any;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecretKey) throw new Error("PAYSTACK_SECRET_KEY not configured");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SERVICE_ROLE_KEY")!
    );

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) throw new Error("Unauthorized");

    // Only accept reference from frontend
    const { reference } = await req.json();
    if (!reference) throw new Error("Missing payment reference");

    // Check duplicate transaction
    const { data: existingTransaction } = await supabase
      .from("transactions")
      .select("id, status")
      .eq("reference", reference)
      .maybeSingle();

    if (existingTransaction?.status === "success") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Payment already processed",
          enrollmentExists: true,
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify with Paystack
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
        },
      }
    );

    if (!verifyResponse.ok) {
      throw new Error("Failed to verify payment with Paystack");
    }

    const verificationData: PaystackVerificationResponse =
      await verifyResponse.json();

    if (!verificationData.status || verificationData.data.status !== "success") {
      // Save failed transaction
      await supabase.from("transactions").insert({
        user_id: user.id,
        reference,
        status: "failed",
        paystack_response: verificationData,
      });

      return new Response(
        JSON.stringify({
          success: false,
          error: "Payment verification failed",
          details: verificationData.message,
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const metadata = verificationData.data.metadata;
    if (!metadata?.course_id) {
      throw new Error("Missing course metadata");
    }

    // Get course price from DB (SOURCE OF TRUTH)
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("price, title")
      .eq("id", metadata.course_id)
      .single();

    if (courseError || !course) {
      throw new Error("Course not found");
    }

    const paidAmount = verificationData.data.amount / 100;
    const expectedAmount = course.price;

    if (paidAmount !== expectedAmount) {
      throw new Error("Payment amount mismatch");
    }

    // Save successful transaction
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .upsert(
        {
          user_id: user.id,
          course_id: metadata.course_id,
          reference,
          amount: expectedAmount,
          status: "success",
          customer_email: verificationData.data.customer.email,
          paystack_response: verificationData,
          verified_at: new Date().toISOString(),
          payment_method: verificationData.data.channel,
          currency: verificationData.data.currency,
        },
        { onConflict: "reference" }
      )
      .select()
      .single();

    if (transactionError) {
      throw new Error(transactionError.message);
    }

    // Create enrollment via RPC
    const { data: enrollmentResult, error: enrollmentError } =
      await supabase.rpc("create_enrollment_after_payment", {
        p_user_id: user.id,
        p_course_id: metadata.course_id,
        p_transaction_id: transaction.id,
      });

    if (enrollmentError) {
      throw new Error(enrollmentError.message);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment verified and enrollment created",
        data: {
          transactionId: transaction.id,
          enrollmentId: enrollmentResult,
          courseName: course.title,
          amount: expectedAmount,
          reference,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error verifying payment:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to verify payment",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
