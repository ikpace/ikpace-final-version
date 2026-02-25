import { supabase } from '../lib/supabase'

export const dashboardService = {
  // Get user profile
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // Get user enrollments with course details
  async getUserEnrollments(userId) {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        courses (*)
      `)
      .eq('user_id', userId)
    
    if (error) throw error
    return data
  },

  // Get user payments
  async getUserPayments(userId) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get all courses (for recommendations)
  async getAllCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
    
    if (error) throw error
    return data
  },

  // Get user stats
  async getUserStats(userId) {
    const enrollments = await this.getUserEnrollments(userId)
    const payments = await this.getUserPayments(userId)
    
    const totalCourses = enrollments.length
    const completedCourses = enrollments.filter(e => e.completed).length
    const totalSpent = payments.reduce((sum, p) => sum + (p.amount || 0), 0)
    
    return {
      totalCourses,
      completedCourses,
      totalSpent,
      enrollmentCount: enrollments.length,
      paymentCount: payments.length
    }
  },

  // Log user activity
  async logActivity(userId, activityType, metadata = {}) {
    const { error } = await supabase
      .from('activity_logs')
      .insert([{
        user_id: userId,
        activity_type: activityType,
        metadata
      }])
    
    if (error) console.error('Error logging activity:', error)
  },

  // Save IQ test result
  async saveIQResult(userId, score, answers) {
    const { data, error } = await supabase
      .from('iq_tests')
      .insert([{
        user_id: userId,
        score,
        answers
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // ✅ NEW: Get latest IQ test result
  async getLatestIQResult(userId) {
    const { data, error } = await supabase
      .from('iq_tests')
      .select('score, completed_at')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    
    if (error) throw error
    return data
  },

  // Get user notifications
  async getNotifications(userId) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('read', false)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Mark notification as read
  async markNotificationAsRead(notificationId) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
    
    if (error) throw error
  }
}