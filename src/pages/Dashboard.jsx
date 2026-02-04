import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { BookOpen, TrendingUp, Award, Clock, Flame, Target, Sparkles, Bell } from 'lucide-react'
import VideoPlayer from '../components/VideoPlayer'
import { videoConfig } from '../config/videos'

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
    if (!profile) {
      setLoading(false)
      return
    }

    try {
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
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
        .order('enrolled_at', { ascending: false })

      if (enrollmentsError) {
        console.error('Error fetching enrollments:', enrollmentsError)
      }

      if (enrollmentsData) {
        setEnrollments(enrollmentsData)
        const completed = enrollmentsData.filter(e => e.is_completed).length
        setStats(prev => ({
          ...prev,
          totalCourses: enrollmentsData.length,
          completedCourses: completed
        }))
      }

      setStats(prev => ({
        ...prev,
        learningStreak: profile.learning_streak || 0,
        totalLearningTime: profile.total_hours_learned || 0
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
        <div className="card mb-8 bg-gradient-to-r from-primary via-primary-dark to-secondary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10">
            <Sparkles size={200} />
          </div>
          <div className="relative z-10 py-8">
            <h1 className="text-4xl font-bold mb-3">
              Welcome, {profile?.full_name}!
            </h1>
            <p className="text-xl mb-4 text-white/90">
              Your learning journey begins today. Let's explore together!
            </p>
            {profile?.student_id && (
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-semibold">Student ID: {profile.student_id}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">
            {getGreeting()}, {profile?.full_name?.split(' ')[0]}!
          </h2>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <BookOpen className="mr-2" size={24} />
              {videoConfig.welcome.title}
            </h3>
            <VideoPlayer
              videoId={videoConfig.welcome.youtubeId}
              title={videoConfig.welcome.title}
              className="mb-4"
            />
            <p className="text-sm text-gray-600">
              {videoConfig.welcome.description}
            </p>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <Target className="mr-2" size={24} />
              {videoConfig.orientation.title}
            </h3>
            <VideoPlayer
              videoId={videoConfig.orientation.youtubeId}
              title={videoConfig.orientation.title}
              className="mb-4"
            />
            <p className="text-sm text-gray-600">
              {videoConfig.orientation.description}
            </p>
          </div>
        </div>

        <div className="card mb-8 bg-gradient-to-br from-secondary/10 to-accent-yellow/10 border-secondary">
          <div className="flex items-start mb-6">
            <TrendingUp className="text-secondary mr-3 flex-shrink-0" size={32} />
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">Recommended Programs</h3>
              <p className="text-gray-600">Tailored learning paths based on your interests and goals</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-5 border-2 border-primary/20 hover:border-primary transition-all hover:shadow-lg cursor-pointer">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="text-primary" size={24} />
              </div>
              <h4 className="font-bold text-primary mb-2">Tech Fundamentals Track</h4>
              <p className="text-sm text-gray-600 mb-3">Master IT basics, data analysis, and cybersecurity</p>
              <div className="flex items-center text-xs text-secondary font-semibold">
                <span>3 Courses</span>
                <span className="mx-2">•</span>
                <span>16 Weeks</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border-2 border-secondary/20 hover:border-secondary transition-all hover:shadow-lg cursor-pointer">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                <Sparkles className="text-secondary" size={24} />
              </div>
              <h4 className="font-bold text-primary mb-2">Creative Professional Track</h4>
              <p className="text-sm text-gray-600 mb-3">Content creation, graphic design, and AI animation</p>
              <div className="flex items-center text-xs text-secondary font-semibold">
                <span>3 Courses</span>
                <span className="mx-2">•</span>
                <span>14 Weeks</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border-2 border-accent-green/20 hover:border-accent-green transition-all hover:shadow-lg cursor-pointer">
              <div className="w-12 h-12 bg-accent-green/10 rounded-full flex items-center justify-center mb-3">
                <Award className="text-accent-green" size={24} />
              </div>
              <h4 className="font-bold text-primary mb-2">Entrepreneur Path</h4>
              <p className="text-sm text-gray-600 mb-3">Freelancing, VA mastery, and digital business</p>
              <div className="flex items-center text-xs text-secondary font-semibold">
                <span>3 Courses</span>
                <span className="mx-2">•</span>
                <span>12 Weeks</span>
              </div>
            </div>
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
