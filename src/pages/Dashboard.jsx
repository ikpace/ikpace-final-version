import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { BookOpen, TrendingUp, Award, Clock, Flame, Target, Sparkles, Bell } from 'lucide-react'

export default function Dashboard() {
  const { profile } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [notifications, setNotifications] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    learningStreak: 0,
    totalLearningTime: 0
  })

  useEffect(() => {
    fetchDashboardData()
  }, [profile])

  const fetchDashboardData = async () => {
    if (!profile) return

    try {
      const [enrollmentsRes, notificationsRes, recommendationsRes] = await Promise.all([
        supabase
          .from('enrollments')
          .select(`
            *,
            courses (
              id,
              title,
              slug,
              thumbnail_url,
              duration_weeks
            )
          `)
          .eq('user_id', profile.id)
          .order('enrollment_date', { ascending: false }),

        supabase
          .from('notifications')
          .select('*')
          .eq('user_id', profile.id)
          .eq('is_read', false)
          .order('created_at', { ascending: false })
          .limit(5),

        supabase
          .from('learning_recommendations')
          .select('*')
          .eq('user_id', profile.id)
          .eq('is_completed', false)
          .order('created_at', { ascending: false })
          .limit(3)
      ])

      if (enrollmentsRes.data) {
        setEnrollments(enrollmentsRes.data)
        const completed = enrollmentsRes.data.filter(e => e.is_completed).length
        setStats(prev => ({
          ...prev,
          totalCourses: enrollmentsRes.data.length,
          completedCourses: completed
        }))
      }

      if (notificationsRes.data) setNotifications(notificationsRes.data)
      if (recommendationsRes.data) setRecommendations(recommendationsRes.data)

      setStats(prev => ({
        ...prev,
        learningStreak: profile.learning_streak || 0,
        totalLearningTime: profile.total_learning_time || 0
      }))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-gray py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            {getGreeting()}, {profile?.full_name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-primary to-primary-dark text-white">
            <div className="flex items-center justify-between mb-4">
              <Flame size={32} />
              <span className="text-3xl font-bold">{stats.learningStreak}</span>
            </div>
            <h3 className="text-lg font-semibold">Day Streak</h3>
            <p className="text-sm opacity-90">Keep it going!</p>
          </div>

          <div className="card bg-gradient-to-br from-secondary to-secondary-dark text-white">
            <div className="flex items-center justify-between mb-4">
              <BookOpen size={32} />
              <span className="text-3xl font-bold">{stats.totalCourses}</span>
            </div>
            <h3 className="text-lg font-semibold">Enrolled Courses</h3>
            <p className="text-sm opacity-90">{stats.completedCourses} completed</p>
          </div>

          <div className="card bg-gradient-to-br from-accent-green to-green-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Clock size={32} />
              <span className="text-3xl font-bold">{Math.floor(stats.totalLearningTime / 60)}</span>
            </div>
            <h3 className="text-lg font-semibold">Hours Learned</h3>
            <p className="text-sm opacity-90">This month</p>
          </div>

          <div className="card bg-gradient-to-br from-accent-yellow to-yellow-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Target size={32} />
              <span className="text-3xl font-bold capitalize">{profile?.skill_level}</span>
            </div>
            <h3 className="text-lg font-semibold">Skill Level</h3>
            <p className="text-sm opacity-90">Keep learning!</p>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="card mb-8 bg-blue-50 border-blue-200">
            <div className="flex items-start">
              <Bell className="text-primary mr-3 flex-shrink-0" size={24} />
              <div className="flex-1">
                <h3 className="font-semibold text-primary mb-2">Notifications</h3>
                <div className="space-y-2">
                  {notifications.map(notif => (
                    <p key={notif.id} className="text-sm text-gray-700">{notif.message}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="card mb-8 gradient-card border-secondary">
            <div className="flex items-start mb-4">
              <Sparkles className="text-secondary mr-3 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-primary text-lg">AI Recommendations</h3>
                <p className="text-sm text-gray-600">Personalized suggestions based on your progress</p>
              </div>
            </div>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={rec.id} className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700">{rec.content?.message || 'Continue your learning journey'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">My Courses</h2>
            <Link to="/courses" className="text-secondary hover:underline font-medium">
              Browse All Courses
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="card text-center py-12">
              <img
                src="https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Start Learning"
                className="w-full max-w-md mx-auto h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-primary mb-4">Start Your Learning Journey</h3>
              <p className="text-gray-600 mb-6">
                You haven't enrolled in any courses yet. Browse our catalog and start learning today!
              </p>
              <Link to="/courses" className="btn-primary inline-block">
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <Link
                  key={enrollment.id}
                  to={`/learn/${enrollment.course_id}`}
                  className="card hover:scale-105 transition-transform p-0 overflow-hidden"
                >
                  <img
                    src={enrollment.courses?.thumbnail_url || 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={enrollment.courses?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      {enrollment.courses?.title}
                    </h3>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold">{Math.round(enrollment.progress_percentage)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${enrollment.progress_percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {enrollment.is_completed ? (
                      <div className="flex items-center text-accent-green">
                        <Award size={18} className="mr-2" />
                        <span className="font-semibold text-sm">Completed</span>
                      </div>
                    ) : (
                      <button className="w-full btn-primary text-sm">
                        Continue Learning
                      </button>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/courses" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <BookOpen className="text-primary mr-3" size={20} />
                <span>Browse Courses</span>
              </Link>
              <Link to="/community" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <TrendingUp className="text-primary mr-3" size={20} />
                <span>Join Community</span>
              </Link>
              <Link to="/certificates" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <Award className="text-primary mr-3" size={20} />
                <span>My Certificates</span>
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-4">Learning Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                  <span className="text-secondary font-bold">1</span>
                </div>
                <p className="text-sm text-gray-600">Set aside 30 minutes daily for consistent progress</p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                  <span className="text-secondary font-bold">2</span>
                </div>
                <p className="text-sm text-gray-600">Take notes and practice what you learn</p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                  <span className="text-secondary font-bold">3</span>
                </div>
                <p className="text-sm text-gray-600">Join community discussions to deepen understanding</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
