import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function TeacherAccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginAsTeacher = async () => {
      try {
        // Hardcoded admin credentials (you can change these)
        const email = 'newadmin@ikpace.com';
        const password = 'Admin123!'; // Set your password here

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          console.error('Login error:', error);
          alert('Login failed: ' + error.message);
          return;
        }

        console.log('Login successful, redirecting to teacher dashboard');
        window.location.href = '/teacher';
        
      } catch (err) {
        console.error('Error:', err);
        alert('Error: ' + err.message);
      }
    };

    loginAsTeacher();
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1A3D7C, #2F5EA8)'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#1A3D7C' }}>Logging you into Teacher Dashboard...</h2>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #FF7A00',
          borderRadius: '50%',
          margin: '20px auto',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}