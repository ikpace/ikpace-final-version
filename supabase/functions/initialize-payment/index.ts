import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecretKey) {
      console.error('❌ PAYSTACK_SECRET_KEY environment variable is not set');
      throw new Error("Payment system not configured. Please contact administrator.");
    }

    console.log('✅ Paystack secret key found:', paystackSecretKey.substring(0, 15) + '...');

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const { email, amount, currency, courseId, courseName, paymentMethod } = await req.json();

    if (!email || !amount || !courseId || !courseName) {
      throw new Error("Missing required fields");
    }

    const reference = 'IKPACE_' + Math.floor((Math.random() * 1000000000) + 1) + '_' + Date.now();
    const callbackUrl = `${req.headers.get("origin") || "https://yourdomain.com"}/payment-success?reference=${reference}`;

    console.log('Initializing Paystack payment:', {
      email,
      amount,
      currency,
      reference,
      callbackUrl
    });

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount,
          currency: currency || "GHS",
          reference,
          callback_url: callbackUrl,
          channels: paymentMethod === 'card' ? ['card'] : ['mobile_money'],
          metadata: {
            course_id: courseId,
            course_name: courseName,
            user_id: user.id,
            customer_email: email,
          },
        }),
      }
    );

    if (!paystackResponse.ok) {
      const errorData = await paystackResponse.text();
      console.error('Paystack initialization failed:', errorData);
      throw new Error(`Paystack API error: ${errorData}`);
    }

    const initData: PaystackInitializeResponse = await paystackResponse.json();

    if (!initData.status) {
      throw new Error(initData.message || "Failed to initialize payment");
    }

    console.log('✅ Payment initialized successfully:', {
      reference: initData.data.reference,
      authorization_url: initData.data.authorization_url
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          authorization_url: initData.data.authorization_url,
          access_code: initData.data.access_code,
          reference: initData.data.reference,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error initializing payment:", error);

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
