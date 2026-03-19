import React from 'react';
import { PaystackButton } from 'react-paystack';
import { supabase } from '../lib/supabase';

const PaystackPayment = ({ amount, email, courseName, onSuccess, onClose, userId, fullName, phone, courseId }) => {
  // 🔴 TEMPORARY HARDCODED KEY - Replace if needed
  const publicKey = "pk_live_c9ccd8f9712da376d25ff3f634ec7f0ba89c29d7";
  
  // Convert amount from dollars to pesewas
  const exchangeRate = 11.8;
  const amountInGHS = (amount / 100) * exchangeRate;
  const amountInPesewas = Math.round(amountInGHS * 100);
  
  const handlePaymentSuccess = async (reference) => {
    console.log("Payment successful!", reference);
    
    try {
      let currentUserId = userId;
      let userEmail = email;
      
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        currentUserId = user?.id;
        userEmail = user?.email;
      }

      // Save payment to database
      const { error: paymentError } = await supabase
        .from('payments')
        .insert([{
          reference: reference.reference,
          amount: amountInGHS,
          status: 'success',
          user_id: currentUserId,
          user_email: userEmail,
          full_name: fullName || null,
          phone: phone || null,
          course_id: courseId || null,
          course_title: courseName,
          payment_method: 'mobile_money',
          currency: 'GHS',
          created_at: new Date()
        }]);

      if (paymentError) {
        console.error('Error saving payment:', paymentError);
      }

      // Create enrollment
      if (courseId && currentUserId) {
        await supabase
          .from('enrollments')
          .insert([{
            user_id: currentUserId,
            course_id: courseId,
            progress: 0,
            completed: false,
            enrolled_at: new Date(),
            user_email: userEmail,
            user_name: fullName || null,
            amount: amountInGHS,
            payment_method: 'mobile_money',
            status: 'active'
          }]);
      }

      if (onSuccess) {
        onSuccess({
          reference: reference.reference,
          amount: amountInGHS,
          currency: "GHS",
          courseId: courseId
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const componentProps = {
    email: email || "customer@example.com",
    amount: amountInPesewas,
    publicKey: publicKey,
    text: `Pay ₵${amountInGHS.toFixed(2)}`,
    onSuccess: handlePaymentSuccess,
    onClose: onClose || (() => {
      alert("Payment was cancelled. You can try again.");
    }),
    metadata: {
      custom_fields: [
        {
          display_name: "Course",
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
        width: "100%",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
      }}>
        <div style={{ marginBottom: "20px", position: "relative" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#065f46" }}>
            Complete Payment
          </h2>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            {courseName || "Course"}
          </p>
          <button onClick={onClose} style={{
            position: "absolute",
            top: "-15px",
            right: "-15px",
            background: "white",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>×</button>
        </div>
        
        <div style={{
          backgroundColor: "#f0fdf4",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#065f46", margin: "0" }}>
            ₵{amountInGHS.toFixed(2)}
          </p>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            ≈ ${(amount / 100).toFixed(2)} USD
          </p>
        </div>
        
        <div>
          <PaystackButton 
            {...componentProps}
            style={{
              width: "100%",
              backgroundColor: "#059669",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "16px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PaystackPayment;