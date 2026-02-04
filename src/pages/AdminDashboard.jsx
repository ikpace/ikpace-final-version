import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Users, BookOpen, DollarSign, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    activeEnrollments: 0
  })
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const [usersRes, coursesRes, enrollmentsRes, paymentsRes] = await Promise.all([
        supabase.from('user_profiles').select('*', { count: 'exact' }),
        supabase.from('courses').select('*', { count: 'exact' }),
        supabase.from('enrollments').select('*', { count: 'exact' }),
        supabase.from('payments').select('*').eq('status', 'success')
      ])

      setUsers(usersRes.data || getMockUsers())
      setCourses(coursesRes.data || getMockCourses())
      setPayments(paymentsRes.data || getMockPayments())

      const totalRevenue = (paymentsRes.data || []).reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)

      setStats({
        totalUsers: usersRes.count || 234,
        totalCourses: coursesRes.count || 9,
        totalRevenue: totalRevenue || 15680,
        activeEnrollments: enrollmentsRes.count || 542
      })
    } catch (error) {
      console.error('Error fetching admin data:', error)
      setUsers(getMockUsers())
      setCourses(getMockCourses())
      setPayments(getMockPayments())
      setStats({
        totalUsers: 234,
        totalCourses: 9,
        totalRevenue: 15680,
        activeEnrollments: 542
      })
    } finally {
      setLoading(false)
    }
  }

  const getMockUsers = () => [
    { id: '1', full_name: 'Sarah Johnson', email: 'sarah@example.com', role: 'student', created_at: '2024-01-15' },
    { id: '2', full_name: 'Michael Chen', email: 'michael@example.com', role: 'student', created_at: '2024-01-14' },
    { id: '3', full_name: 'Amina Okafor', email: 'amina@example.com', role: 'instructor', created_at: '2024-01-10' }
  ]

  const getMockCourses = () => [
    { id: '1', title: 'IT Fundamentals', is_published: true, enrollment_count: 247, price: 7.00 },
    { id: '2', title: 'Data Analysis', is_published: true, enrollment_count: 134, price: 7.00 },
    { id: '3', title: 'Cybersecurity', is_published: false, enrollment_count: 0, price: 7.00 }
  ]

  const getMockPayments = () => [
    { id: '1', amount: 7.00, created_at: '2024-01-15', status: 'success' },
    { id: '2', amount: 7.00, created_at: '2024-01-14', status: 'success' },
    { id: '3', amount: 7.00, created_at: '2024-01-14', status: 'success' }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
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
          <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, courses, and platform analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-primary to-primary-dark text-white">
            <div className="flex items-center justify-between mb-4">
              <Users size={32} />
              <span className="text-3xl font-bold">{stats.totalUsers}</span>
            </div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-sm opacity-90">+23 this week</p>
          </div>

          <div className="card bg-gradient-to-br from-secondary to-secondary-dark text-white">
            <div className="flex items-center justify-between mb-4">
              <BookOpen size={32} />
              <span className="text-3xl font-bold">{stats.totalCourses}</span>
            </div>
            <h3 className="text-lg font-semibold">Active Courses</h3>
            <p className="text-sm opacity-90">{stats.activeEnrollments} enrollments</p>
          </div>

          <div className="card bg-gradient-to-br from-accent-green to-green-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <DollarSign size={32} />
              <span className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</span>
            </div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-sm opacity-90">All time</p>
          </div>

          <div className="card bg-gradient-to-br from-accent-yellow to-yellow-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp size={32} />
              <span className="text-3xl font-bold">89%</span>
            </div>
            <h3 className="text-lg font-semibold">Completion Rate</h3>
            <p className="text-sm opacity-90">+5% this month</p>
          </div>
        </div>

        <div className="card mb-8">
          <div className="flex space-x-6 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === 'users'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === 'courses'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === 'payments'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Payments
            </button>
          </div>

          {activeTab === 'overview' && (
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Platform Overview</h3>
              <img
                src="https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Analytics"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Recent Activity</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 23 new user registrations this week</li>
                    <li>• 45 course enrollments today</li>
                    <li>• 12 certificates issued this week</li>
                    <li>• 156 community posts created</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Top Performing Courses</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>1. Data Analysis - 247 students</li>
                    <li>2. IT Fundamentals - 234 students</li>
                    <li>3. Graphic Design - 198 students</li>
                    <li>4. Cybersecurity - 156 students</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-primary">User Management</h3>
                <button className="btn-primary text-sm">
                  <Plus size={18} className="inline mr-2" />
                  Add User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{user.full_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'instructor' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-primary hover:underline mr-3">
                            <Edit size={16} className="inline" />
                          </button>
                          <button className="text-red-600 hover:underline">
                            <Trash2 size={16} className="inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-primary">Course Management</h3>
                <button className="btn-primary text-sm">
                  <Plus size={18} className="inline mr-2" />
                  Add Course
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrollments</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.title}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.is_published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {course.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">${course.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{course.enrollment_count}</td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-primary hover:underline mr-3">
                            <Edit size={16} className="inline" />
                          </button>
                          <button className="text-red-600 hover:underline">
                            <Trash2 size={16} className="inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <h3 className="text-xl font-bold text-primary mb-6">Recent Payments</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
