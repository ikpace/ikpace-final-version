// src/lib/resend.js
import { Resend } from 'resend';

// Initialize Resend with your API key
// Note: In production, API keys should be server-side only
// For client-side usage, you'll need a backend endpoint
export const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

// Helper function to send emails (to be used in API routes)
export const sendEmail = async ({ to, subject, html, from = 'Acme <onboarding@resend.dev>' }) => {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception sending email:', error);
    return { success: false, error };
  }
};