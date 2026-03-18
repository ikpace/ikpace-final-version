// src/services/emailService.js
import { supabase } from '../lib/supabase';

// ✅ EXPORT THIS - Test function
export const testEmailService = async (email) => {
  console.log('🔵 testEmailService called with:', email);
  
  try {
    const result = await sendWelcomeEmail({
      to: email,
      username: 'Test User',
      dashboardUrl: 'https://yourapp.com/dashboard'
    });
    
    console.log('🟢 testEmailService result:', result);
    return result;
  } catch (error) {
    console.error('🔴 testEmailService error:', error);
    return { success: false, error: error.message };
  }
};

// ✅ EXPORT THIS - Main email function
export const sendWelcomeEmail = async ({ to, username, dashboardUrl }) => {
  try {
    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('No active session. Please log in.');
    }
    
    console.log('🔑 User is authenticated:', session.user.email);
    
    // Generate HTML email
    const html = generateWelcomeEmailHTML(username, dashboardUrl);
    
    console.log('Sending email to:', to);
    
    const requestBody = { 
      to, 
      subject: 'Welcome to Our App! 🎉',
      html 
    };
    
    console.log('Request body being sent:', JSON.stringify(requestBody));
    
    // Call the edge function
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: requestBody,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw error;
    }
    
    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Helper function (not exported, used internally)
function generateWelcomeEmailHTML(username, dashboardUrl) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #333; text-align: center;">Welcome, ${username}! 🎉</h1>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">Thank you for joining our community! We're excited to have you on board.</p>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">Your dashboard is ready and waiting for you.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${dashboardUrl}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
          </div>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
          <p style="color: #888; font-size: 14px;">Best regards,<br>The Team</p>
        </div>
      </body>
    </html>
  `;
}

// ✅ EXPORT THIS - Optional: for checking email logs
export const getEmailLogs = async (email) => {
  try {
    const { data, error } = await supabase
      .from('email_logs')
      .select('*')
      .eq('recipient_email', email)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching logs:', error);
    return { success: false, error: error.message };
  }
};