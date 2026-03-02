import React from 'react';
import { PaystackButton } from 'react-paystack';
import { supabase } from '../lib/supabase';

const PaystackPayment = ({ amount, email, courseName, onSuccess, onClose, userId, fullName, phone, courseId }) => {
  // Your Paystack public live key
  const publicKey = "pk_live_c9ccd8f9712da376d25ff3f634ec7f0ba89c29d7";
  
  // Convert amount from dollars to pesewas (Paystack expects amount in smallest currency unit)
  // amount is in cents (e.g., 700 for $7.00)
  const exchangeRate = 11.8;
  const amountInGHS = (amount / 100) * exchangeRate; // Convert cents to dollars then to GHS
  const amountInPesewas = Math.round(amountInGHS * 100);
  
  const handlePaymentSuccess = async (reference) => {
    console.log("Payment successful!", reference);
    
    try {
      // Get current user if userId not provided
      let currentUserId = userId;
      let userEmail = email;
      
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        currentUserId = user?.id;
        userEmail = user?.email;
      }

      // 1. Insert payment record into Supabase
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .insert([
          {
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
            email: userEmail,
            phone_number: phone || null,
            created_at: new Date(),
            updated_at: new Date()
          }
        ]);

      if (paymentError) {
        console.error('Error saving payment to database:', paymentError);
      } else {
        console.log('Payment saved successfully:', paymentData);
      }

      // 2. Create enrollment for course access - FIXED with all required fields
      if (courseId && currentUserId) {
        console.log('Creating enrollment with:', {
          user_id: currentUserId,
          course_id: courseId,
          user_email: userEmail,
          user_name: fullName,
          amount: amountInGHS
        });

        const { data: enrollData, error: enrollError } = await supabase
          .from('enrollments')
          .insert([
            {
              user_id: currentUserId,
              course_id: courseId,
              progress: 0,
              completed: false,
              enrolled_at: new Date(),
              completed_at: null,
              user_email: userEmail,
              user_name: fullName || null,
              amount: amountInGHS,
              payment_method: 'mobile_money',
              status: 'active'
            }
          ])
          .select();

        if (enrollError) {
          console.error('Error creating enrollment:', enrollError);
          console.error('Error details:', JSON.stringify(enrollError));
        } else {
          console.log('Enrollment created successfully:', enrollData);
        }
      }

      // Call the original onSuccess callback
      if (onSuccess) {
        onSuccess({
          reference: reference.reference,
          transactionId: reference.transaction,
          amount: amountInGHS,
          currency: "GHS",
          method: "Mobile Money",
          courseId: courseId
        });
      }
    } catch (error) {
      console.error('Error in payment success handler:', error);
    }
  };
  
  const componentProps = {
    email: email || "customer@example.com",
    amount: amountInPesewas,
    publicKey: publicKey,
    text: "Pay Now",
    onSuccess: handlePaymentSuccess,
    onClose: onClose || (() => {
      console.log("Payment modal closed");
      alert("Payment was cancelled. You can try again.");
    }),
    metadata: {
      custom_fields: [
        {
          display_name: "Course Name",
          variable_name: "course_name",
          value: courseName || "Digital Entrepreneurship Course"
        },
        {
          display_name: "User ID",
          variable_name: "user_id",
          value: userId || "guest"
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
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#065f46", marginBottom: "5px" }}>
            Complete Payment
          </h2>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            {courseName || "Digital Entrepreneurship Course"}
          </p>
          <button 
            onClick={onClose}
            style={{
              position: "absolute",
              top: "-15px",
              right: "-15px",
              background: "white",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#6b7280",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{
          backgroundColor: "#f0fdf4",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          <p style={{ fontSize: "14px", color: "#065f46", marginBottom: "5px" }}>
            Amount to Pay
          </p>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#065f46", margin: "0" }}>
            ₵{amountInGHS.toFixed(2)}
          </p>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "5px" }}>
            ≈ ${(amount / 100).toFixed(2)} USD • Exchange Rate: 1 USD = {exchangeRate} GHS
          </p>
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "18px", color: "#374151", marginBottom: "10px" }}>
            💳 Pay with Card
          </h3>
          <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "15px" }}>
            You will be redirected to Paystack's secure payment page to enter your card details.
            We accept Visa, Mastercard, and Verve cards.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div style={{ 
              backgroundColor: "#f3f4f6", 
              padding: "15px", 
              borderRadius: "8px",
              marginBottom: "15px"
            }}>
              <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "5px" }}>
                💡 <strong>Test Card for Development:</strong>
              </p>
              <p style={{ fontSize: "13px", color: "#1f2937", margin: "0", fontFamily: "monospace" }}>
                Card: 4084 0840 8408 4081 • CVV: 408
              </p>
            </div>
          )}
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
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
          />
          
          <p style={{
            fontSize: "11px",
            color: "#9ca3af",
            textAlign: "center",
            marginTop: "15px",
            lineHeight: "1.4"
          }}>
            🔒 Secure 256-bit SSL encryption • Your payment will be recorded in your dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaystackPayment;