import React, { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack';
import { supabase } from '../lib/supabase';

const PaystackPayment = ({ amount, courseName, onSuccess, onClose, courseId }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const amountInPesewas = Math.round(amount * 100);

  // Get logged-in user on mount
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !authUser) {
          console.error("❌ No user logged in");
          return;
        }
        
        setUser(authUser);
        
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();
        
        if (!profileError && profile) {
          setUserProfile(profile);
        }
        
      } catch (error) {
        console.error("❌ Error getting user:", error);
      }
    };
    
    getCurrentUser();
  }, []);

  const handlePaymentSuccess = async (reference) => {
    console.log("✅ Payment successful!", reference);
    setLoading(true);

    try {
      // Get the logged-in user again to ensure fresh session
      const { data: { user: currentUser }, error: sessionError } = await supabase.auth.getUser();

      if (sessionError || !currentUser) {
        console.error("❌ No active session. User must be logged in");
        alert("Please log in again to complete your payment.");
        setLoading(false);
        return;
      }

      console.log("✅ User found:", currentUser.id, currentUser.email);

      // 1️⃣ Save payment in payments table
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .insert([{
          reference: reference.reference,
          amount: amount,
          status: 'success',
          user_id: currentUser.id,
          user_email: currentUser.email,
          full_name: userProfile?.full_name || currentUser.user_metadata?.full_name,
          phone: userProfile?.phone || '',
          course_id: courseId,
          course_title: courseName,
          payment_method: 'paystack',
          currency: 'GHS',
          created_at: new Date().toISOString()
        }])
        .select();

      if (paymentError) {
        console.error('❌ Payment DB error:', paymentError);
      } else {
        console.log('✅ Payment saved:', paymentData);
      }

      // 2️⃣ Check for existing enrollment BEFORE creating a new one
      // This prevents duplicate enrollments even if the user accidentally pays twice
      const { data: existingEnrollment, error: checkError } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', currentUser.id)
        .eq('course_id', courseId)
        .maybeSingle();

      if (checkError) {
        console.error('❌ Error checking existing enrollment:', checkError);
      }

      // Only create enrollment if it doesn't already exist
      if (!existingEnrollment) {
        console.log('✅ No existing enrollment found, creating new enrollment...');
        
        const { error: enrollError } = await supabase
          .from('enrollments')
          .insert([{
            user_id: currentUser.id,
            course_id: courseId,
            progress: 0,
            completed: false,
            enrolled_at: new Date().toISOString(),
            user_email: currentUser.email,
            user_name: userProfile?.full_name,
            amount: amount,
            payment_method: 'paystack',
            status: 'active',
            payment_reference: reference.reference
          }]);

        if (enrollError) {
          console.error('❌ Enrollment error:', enrollError);
        } else {
          console.log('✅ Enrollment created successfully');
        }
      } else {
        console.log('⚠️ User already enrolled in this course, skipping enrollment creation');
        // Optional: Show a message to the user that they're already enrolled
        // alert('You are already enrolled in this course!');
      }

      // 3️⃣ Callback
      if (onSuccess) {
        onSuccess({
          reference: reference.reference,
          amount: amount,
          courseId: courseId,
          courseName: courseName
        });
      }

      // 4️⃣ Redirect to success page
      setTimeout(() => {
        window.location.href = `/payment-success?reference=${reference.reference}&course=${encodeURIComponent(courseName)}`;
      }, 1500);

    } catch (error) {
      console.error('❌ Payment handler error:', error);
      alert('Payment was successful but there was an issue saving your enrollment. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  // Show login prompt if no user
  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please log in to complete your payment.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full py-3 bg-[#1A3D7C] text-white rounded-xl font-semibold hover:bg-[#0F2655] transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#1A3D7C]">Complete Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
        </div>
        
        <p className="text-gray-600 mb-4">{courseName}</p>
        
        <div className="bg-green-50 p-4 rounded-xl text-center mb-6">
          <p className="text-sm text-green-700">Amount to Pay</p>
          <p className="text-3xl font-bold text-green-700">₵{amount.toFixed(2)}</p>
        </div>
        
        <PaystackButton
          email={user.email}
          amount={amountInPesewas}
          publicKey={publicKey}
          currency="GHS"
          text={loading ? "Processing..." : `Pay ₵${amount.toFixed(2)}`}
          onSuccess={handlePaymentSuccess}
          onClose={onClose}
          metadata={{
            custom_fields: [
              { display_name: "Course", variable_name: "course", value: courseName },
              { display_name: "User ID", variable_name: "user_id", value: user.id }
            ]
          }}
          className="w-full py-3 bg-[#059669] text-white rounded-xl font-semibold hover:bg-[#047857] transition disabled:opacity-50"
          disabled={loading}
        />
        
        <p className="text-xs text-gray-400 text-center mt-4">
          🔒 Secure payment by Paystack
        </p>
      </div>
    </div>
  );
};

export default PaystackPayment;