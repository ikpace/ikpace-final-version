// src/components/TestEmail.jsx
import { useState } from 'react';
import { sendWelcomeEmail, testEmailService } from '../services/emailService';

const TestEmail = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendTest = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('Please enter an email address');
      return;
    }

    setLoading(true);
    setStatus('Sending...');

    try {
      // Using the test function
      const result = await testEmailService(email);
      
      if (result.success) {
        setStatus('✅ Test email sent successfully! Check your inbox.');
        setEmail('');
      } else {
        setStatus(`❌ Failed: ${result.error}`);
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📧 Test Email Service</h2>
      
      <form onSubmit={handleSendTest} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Email Address:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {})
          }}
        >
          {loading ? 'Sending...' : 'Send Test Email'}
        </button>
        
        {status && (
          <div style={styles.status}>
            {status}
          </div>
        )}
      </form>

      <div style={styles.note}>
        <p><strong>Note:</strong> The email will be sent from <code>onboarding@resend.dev</code></p>
        <p>Make sure to check your spam folder if you don't see it in your inbox.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#555',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  status: {
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontSize: '14px',
  },
  note: {
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#666',
    borderLeft: '4px solid #0070f3',
  },
};

export default TestEmail;