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
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: any;
    customer: {
      id: number;
      email: string;
      customer_code: string;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
    };
  };
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Get Paystack secret key from environment
    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecretKey) {
      throw new Error("PAYSTACK_SECRET_KEY not configured");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Parse request body
    const { reference, courseId, amount, email } = await req.json();

    if (!reference || !courseId || !amount || !email) {
      throw new Error("Missing required fields: reference, courseId, amount, email");
    }

    // Check for duplicate payment
    const { data: existingTransaction } = await supabase
      .from("transactions")
      .select("id, status")
      .eq("reference", reference)
      .maybeSingle();

    if (existingTransaction && existingTransaction.status === "success") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Payment already processed",
          enrollmentExists: true,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify payment with Paystack
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!verifyResponse.ok) {
      throw new Error("Failed to verify payment with Paystack");
    }

    const verificationData: PaystackVerificationResponse = await verifyResponse.json();

    // Validate payment data
    if (!verificationData.status || verificationData.data.status !== "success") {
      // Save failed transaction
      await supabase.from("transactions").insert({
        user_id: user.id,
        course_id: courseId,
        reference,
        amount: amount,
        status: "failed",
        customer_email: email,
        paystack_response: verificationData,
      });

      return new Response(
        JSON.stringify({
          success: false,
          error: "Payment verification failed",
          details: verificationData.message,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate amount (Paystack returns amount in kobo/pesewas, divide by 100)
    const paidAmount = verificationData.data.amount / 100;
    const expectedAmount = parseFloat(amount);

    if (Math.abs(paidAmount - expectedAmount) > 0.01) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Amount mismatch",
          expected: expectedAmount,
          received: paidAmount,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate email
    if (verificationData.data.customer.email.toLowerCase() !== email.toLowerCase()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email mismatch",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create or update transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .upsert(
        {
          user_id: user.id,
          course_id: courseId,
          reference,
          amount: expectedAmount,
          status: "success",
          customer_email: email,
          paystack_response: verificationData,
          verified_at: new Date().toISOString(),
          payment_method: verificationData.data.channel,
          currency: verificationData.data.currency,
        },
        {
          onConflict: "reference",
        }
      )
      .select()
      .single();

    if (transactionError) {
      throw new Error(`Failed to save transaction: ${transactionError.message}`);
    }

    // Create enrollment using the database function
    const { data: enrollmentResult, error: enrollmentError } = await supabase.rpc(
      "create_enrollment_after_payment",
      {
        p_user_id: user.id,
        p_course_id: courseId,
        p_transaction_id: transaction.id,
      }
    );

    if (enrollmentError) {
      throw new Error(`Failed to create enrollment: ${enrollmentError.message}`);
    }

    // Get course details
    const { data: course } = await supabase
      .from("courses")
      .select("title")
      .eq("id", courseId)
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment verified and enrollment created",
        data: {
          transactionId: transaction.id,
          enrollmentId: enrollmentResult,
          courseName: course?.title,
          amount: expectedAmount,
          reference,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to verify payment",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
