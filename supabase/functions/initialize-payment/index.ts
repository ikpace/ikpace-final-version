import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

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
    const { data: { user }, error: authError } =
      await supabase.auth.getUser(token);

    if (authError || !user) throw new Error("Unauthorized");

    const { courseId } = await req.json();
    if (!courseId) throw new Error("Missing courseId");

    // Fetch course from DB (SOURCE OF TRUTH)
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id, title, price")
      .eq("id", courseId)
      .single();

    if (courseError || !course) {
      throw new Error("Course not found");
    }

    // Initialize payment with Paystack
    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          amount: course.price * 100, // Convert to kobo
          metadata: {
            user_id: user.id,
            course_id: course.id,
            course_name: course.title,
          },
          callback_url: "https://yourdomain.com/payment-success",
        }),
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      throw new Error(paystackData.message || "Failed to initialize payment");
    }

    return new Response(
      JSON.stringify({
        success: true,
        authorization_url: paystackData.data.authorization_url,
        reference: paystackData.data.reference,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to initialize payment",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
