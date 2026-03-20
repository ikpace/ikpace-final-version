import React from 'react';
import { PaystackButton } from 'react-paystack';
import { supabase } from '../lib/supabase';

const PaystackPayment = ({
  amount,
  email,
  courseName,
  onSuccess,
  onClose,
  userId,
  fullName,
  phone,
  courseId
}) => {

  // ✅ USE ENV KEY (IMPORTANT FOR NETLIFY)
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  // ✅ FIX: Assume amount is already in GHS (e.g., 87.5)
  const amountInPesewas = Math.round(amount * 100);

  // ✅ DEBUG (REMOVE LATER)
  console.log("PAYMENT DEBUG:", {
    email,
    amount,
    amountInPesewas,
    key: publicKey
  });

  // ❌ STOP IF INVALID
  if (!publicKey) {
    console.error("❌ Paystack key missing");
  }

  if (!email) {
    console.error("❌ Email missing");
  }

  if (!amount || amount <= 0) {
    console.error("❌ Invalid amount");
  }

  const handlePaymentSuccess = async (reference) => {
    console.log("✅ Payment successful!", reference);

    try {
      let currentUserId = userId;
      let userEmail = email;

      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        currentUserId = user?.id;
        userEmail = user?.email;
      }

      // ✅ SAVE PAYMENT
      const { error: paymentError } = await supabase
        .from('payments')
        .insert([
          {
            reference: reference.reference,
            amount: amount,
            status: 'success',
            user_id: currentUserId,
            user_email: userEmail,
            full_name: fullName || null,
            phone: phone || null,
            course_id: courseId || null,
            course_title: courseName,
            payment_method: 'paystack',
            currency: 'GHS'
          }
        ]);

      if (paymentError) {
        console.error('❌ Payment DB error:', paymentError);
      }

      // ✅ CREATE ENROLLMENT
      if (courseId && currentUserId) {
        const { error: enrollError } = await supabase
          .from('enrollments')
          .insert([
            {
              user_id: currentUserId,
              course_id: courseId,
              progress: 0,
              completed: false,
              user_email: userEmail,
              user_name: fullName || null,
              amount: amount,
              payment_method: 'paystack',
              status: 'active'
            }
          ]);

        if (enrollError) {
          console.error('❌ Enrollment error:', enrollError);
        } else {
          console.log('✅ Enrollment created');
        }
      }

      if (onSuccess) {
        onSuccess({
          reference: reference.reference,
          amount: amount,
          currency: "GHS",
          courseId
        });
      }

    } catch (error) {
      console.error('❌ Payment handler error:', error);
    }
  };

  const componentProps = {
    email: email || "test@email.com",
    amount: amountInPesewas, // ✅ CORRECT FORMAT
    publicKey: publicKey,
    currency: "GHS",
    text: "Pay Now",
    onSuccess: handlePaymentSuccess,
    onClose: onClose || (() => {
      console.log("Payment closed");
    }),
    metadata: {
      custom_fields: [
        {
          display_name: "Course Name",
          variable_name: "course_name",
          value: courseName || "Course"
        }
      ]
    }
  };

  return (
    <div className="paystack-payment-modal" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "30px",
        maxWidth: "500px",
        width: "100%"
      }}>
        <h2>Complete Payment</h2>

        <h1 style={{ fontSize: "32px" }}>
          ₵{amount.toFixed(2)}
        </h1>

        <PaystackButton
          {...componentProps}
          style={{
            width: "100%",
            backgroundColor: "#059669",
            color: "white",
            border: "none",
            padding: "16px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        />
      </div>
    </div>
  );
};

export default PaystackPayment;