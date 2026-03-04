// src/services/api.js
const API_BASE_URL = 'https://ikpace-new-backend.onrender.com/api';

export const api = {
  // Get user profile
  async getUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  // Get user enrollments
  async getUserEnrollments(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/enrollments`);
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      return await response.json();
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      return [];
    }
  },

  // Get user payments
  async getUserPayments(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/payments`);
      if (!response.ok) throw new Error('Failed to fetch payments');
      return await response.json();
    } catch (error) {
      console.error('Error fetching payments:', error);
      return [];
    }
  },

  // Health check (optional)
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Backend health check failed:', error);
      return null;
    }
  }
};