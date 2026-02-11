import React from 'react';
import { PaystackButton } from 'react-paystack';

const PaystackPayment = ({ amount, email, courseName, onSuccess, onClose }) => {
  // Your Paystack public test key (replace with your actual key)
  const publicKey = "pk_test_d42afb4dd7431f9a9ee9a0ac0a9eb0e0a1877d7a";
  
  // Convert amount from dollars to pesewas (Paystack expects amount in smallest currency unit)
  // amount is in dollars, we need to convert to GHS then to pesewas
  const exchangeRate = 11.8;
  const amountInGHS = amount / 100 * exchangeRate; // amount is in cents, convert to dollars first
  const amountInPesewas = Math.round(amountInGHS * 100);
  
  const componentProps = {
    email: email || "customer@example.com",
    amount: amountInPesewas,
    publicKey: publicKey,
    text: "Pay Now",
    onSuccess: (reference) => {
      console.log("Payment successful!", reference);
      if (onSuccess) {
        onSuccess({
          reference: reference.reference,
          transactionId: reference.transaction,
          amount: amountInGHS,
          currency: "GHS",
          method: "Card Payment"
        });
      }
    },
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
        <div style={{ marginBottom: "20px" }}>
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
              top: "15px",
              right: "15px",
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#6b7280"
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
          
          <div style={{ 
            backgroundColor: "#f3f4f6", 
            padding: "15px", 
            borderRadius: "8px",
            marginBottom: "15px"
          }}>
            <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "5px" }}>
              💡 <strong>Test Card for Demo:</strong>
            </p>
            <p style={{ fontSize: "13px", color: "#1f2937", margin: "0", fontFamily: "monospace" }}>
              Card: 4084 0840 8408 4081 • CVV: 408 • PIN: 0000 • OTP: 123456
            </p>
          </div>
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
            🔒 Secure 256-bit SSL encryption • Your card details are never stored on our servers
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaystackPayment;
