import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, Users, Plus, Edit, Trash2, Eye, LogOut,
  Video, FileText, HelpCircle, ClipboardList, Clock,
  CheckCircle, XCircle, Award, Star, Calendar, Download,
  MessageCircle, Settings, Home, ChevronDown, ChevronUp,
  Save, X, PlayCircle, Upload, Image, Link as LinkIcon
} from 'lucide-react';

export default function TeacherDashboard() {
  console.log("🔥🔥🔥 TEACHER DASHBOARD IS RENDERING 🔥🔥🔥");
  
  const { user, loading: authLoading } = useAuth();
  console.log("User from useAuth:", user, "Auth loading:", authLoading);
  
  const navigate = useNavigate();
  
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [expandedCourses, setExpandedCourses] = useState({});

  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    success: "#008F4C",
    purple: "#7329ce"
  };

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    duration_weeks: 6,
    level: 'beginner',
    category: 'career',
    thumbnail_url: '',
    is_published: true
  });

  const [newTopic, setNewTopic] = useState({
    week_number: 1,
    title: '',
    description: '',
    content_type: 'video',
    video_url: '',
    duration: '10 min',
    order_index: 1,
    is_published: true,
    has_quiz: false,
    has_assignment: false
  });

  // Show loading while auth is being checked - AFTER ALL HOOKS
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3D7C]"></div>
        <p className="ml-3 text-gray-600">Loading authentication...</p>
      </div>
    );
  }

  // Redirect if no user - AFTER ALL HOOKS
  if (!user) {
    console.log("No user found, redirecting to login");
    navigate('/login', { replace: true });
    return null;
  }

  useEffect(() => {
    console.log("useEffect running - checking user");
    console.log("Current user:", user);
    console.log("Auth loading complete:", authLoading);
    
    // Check user role - allow admin OR instructor
    const checkUserRole = async () => {
      console.log("Checking user role for ID:", user.id);
      
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        console.log("Profile query result:", { profile, error });

        if (error) {
          console.error('Error fetching profile:', error);
          console.log("Redirecting to dashboard due to error");
          navigate('/dashboard');
          return;
        }

        console.log("User role from database:", profile?.role);

        // Allow admin OR instructor
        if (profile?.role === 'admin' || profile?.role === 'instructor') {
          console.log('✅ Access granted - loading teacher dashboard');
          fetchTeacherData();
        } else {
          console.log('❌ Access denied - user role is:', profile?.role);
          console.log('Redirecting to student dashboard');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error in role check:', error);
        navigate('/dashboard');
      }
    };

    checkUserRole();
  }, [user, navigate]);

  const fetchTeacherData = async () => {
    console.log("fetchTeacherData called");
    try {
      setLoading(true);

      // Get all courses (admins see all, instructors see their own)
      let query = supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      // If not admin, filter by instructor_id
      if (profile?.role !== 'admin') {
        query = query.eq('instructor_id', user.id);
      }

      const { data: coursesData } = await query;
      console.log("Courses fetched:", coursesData);
      setCourses(coursesData || []);

      // Get all topics for these courses
      if (coursesData?.length > 0) {
        const courseIds = coursesData.map(c => c.id);
        const { data: topicsData } = await supabase
          .from('topics')
          .select('*')
          .in('course_id', courseIds)
          .order('week_number')
          .order('order_index');

        console.log("Topics fetched:", topicsData);
        setTopics(topicsData || []);

        // Get enrollments for these courses
        const { data: enrollmentsData } = await supabase
          .from('enrollments')
          .select(`
            *,
            profiles!enrollments_user_id_fkey (
              id,
              full_name,
              email
            )
          `)
          .in('course_id', courseIds);

        console.log("Enrollments fetched:", enrollmentsData);
        setEnrollments(enrollmentsData || []);
        
        // Extract unique students
        const uniqueStudents = {};
        enrollmentsData?.forEach(e => {
          if (e.profiles && !uniqueStudents[e.user_id]) {
            uniqueStudents[e.user_id] = e.profiles;
          }
        });
        setStudents(Object.values(uniqueStudents));
        console.log("Students extracted:", Object.values(uniqueStudents));
      }

    } catch (error) {
      console.error('Error fetching teacher data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    
    // Generate slug from title
    const slug = newCourse.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { error } = await supabase
      .from('courses')
      .insert([{
        ...newCourse,
        slug,
        instructor_id: user.id,
        thumbnail_url: newCourse.thumbnail_url || 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg'
      }]);

    if (!error) {
      setShowAddCourse(false);
      setNewCourse({
        title: '',
        description: '',
        duration_weeks: 6,
        level: 'beginner',
        category: 'career',
        thumbnail_url: '',
        is_published: true
      });
      fetchTeacherData();
    }
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return;

    const { error } = await supabase
      .from('topics')
      .insert([{
        course_id: selectedCourse.id,
        week_number: newTopic.week_number,
        title: newTopic.title,
        description: newTopic.description,
        content_type: newTopic.content_type,
        video_url: newTopic.video_url,
        duration: newTopic.duration,
        order_index: newTopic.order_index,
        is_published: newTopic.is_published,
        has_quiz: newTopic.has_quiz,
        has_assignment: newTopic.has_assignment
      }]);

    if (!error) {
      setShowAddTopic(false);
      setNewTopic({
        week_number: 1,
        title: '',
        description: '',
        content_type: 'video',
        video_url: '',
        duration: '10 min',
        order_index: 1,
        is_published: true,
        has_quiz: false,
        has_assignment: false
      });
      fetchTeacherData();
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Delete this course? All topics and enrollments will also be deleted.')) return;
    
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    if (!error) {
      fetchTeacherData();
    }
  };

  const handleDeleteTopic = async (topicId) => {
    if (!confirm('Delete this topic?')) return;
    
    const { error } = await supabase
      .from('topics')
      .delete()
      .eq('id', topicId);

    if (!error) {
      fetchTeacherData();
    }
  };

  const toggleCourseExpand = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const getStudentCount = (courseId) => {
    return enrollments.filter(e => e.course_id === courseId).length;
  };

  const getCourseTopics = (courseId) => {
    return topics.filter(t => t.course_id === courseId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3D7C]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-white/80">Welcome, {user?.email || 'Teacher'}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <Home size={24} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <BookOpen className="w-8 h-8 text-[#1A3D7C] mb-3" />
            <div className="text-3xl font-bold">{courses.length}</div>
            <div className="text-gray-600">Your Courses</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <Users className="w-8 h-8 text-[#FF7A00] mb-3" />
            <div className="text-3xl font-bold">{students.length}</div>
            <div className="text-gray-600">Total Students</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <Video className="w-8 h-8 text-purple-500 mb-3" />
            <div className="text-3xl font-bold">{topics.length}</div>
            <div className="text-gray-600">Total Topics</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <Award className="w-8 h-8 text-green-500 mb-3" />
            <div className="text-3xl font-bold">{enrollments.length}</div>
            <div className="text-gray-600">Enrollments</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 font-medium ${activeTab === 'courses' ? 'text-[#1A3D7C] border-b-2 border-[#1A3D7C]' : 'text-gray-600'}`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-3 font-medium ${activeTab === 'students' ? 'text-[#1A3D7C] border-b-2 border-[#1A3D7C]' : 'text-gray-600'}`}
          >
            My Students
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
              <button
                onClick={() => setShowAddCourse(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                <Plus size={18} />
                Create New Course
              </button>
            </div>

            {courses.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Courses Yet</h3>
                <p className="text-gray-600 mb-6">Create your first course to start teaching</p>
                <button
                  onClick={() => setShowAddCourse(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white rounded-lg font-bold"
                >
                  Create New Course
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {courses.map(course => {
                  const courseTopics = getCourseTopics(course.id);
                  const studentCount = getStudentCount(course.id);
                  const isExpanded = expandedCourses[course.id];

                  return (
                    <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                course.is_published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {course.is_published ? 'Published' : 'Draft'}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar size={16} />
                                {course.duration_weeks} weeks
                              </span>
                              <span className="flex items-center gap-1">
                                <Users size={16} />
                                {studentCount} students
                              </span>
                              <span className="flex items-center gap-1">
                                <Video size={16} />
                                {courseTopics.length} topics
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setShowAddTopic(true);
                              }}
                              className="p-2 text-[#1A3D7C] hover:bg-blue-50 rounded-lg transition-colors"
                              title="Add Topic"
                            >
                              <Plus size={20} />
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Course"
                            >
                              <Trash2 size={20} />
                            </button>
                            <button
                              onClick={() => toggleCourseExpand(course.id)}
                              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-6 bg-gray-50">
                          <h4 className="font-semibold text-gray-900 mb-4">Course Topics</h4>
                          {courseTopics.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No topics yet. Click + to add your first topic.</p>
                          ) : (
                            <div className="space-y-3">
                              {courseTopics.map(topic => (
                                <div key={topic.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                  <div className="flex items-center gap-3">
                                    {topic.content_type === 'video' ? (
                                      <Video className="w-5 h-5 text-[#FF7A00]" />
                                    ) : topic.content_type === 'quiz' ? (
                                      <HelpCircle className="w-5 h-5 text-purple-500" />
                                    ) : (
                                      <FileText className="w-5 h-5 text-[#1A3D7C]" />
                                    )}
                                    <div>
                                      <div className="font-medium">Week {topic.week_number}: {topic.title}</div>
                                      <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                                        <Clock size={12} /> {topic.duration}
                                        {topic.has_quiz && <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">Quiz</span>}
                                        {topic.has_assignment && <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Assignment</span>}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => setEditingTopic(topic)}
                                      className="p-1 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteTopic(topic.id)}
                                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Students</h2>
            {students.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Students Yet</h3>
                <p className="text-gray-600">Students will appear here when they enroll in your courses</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700">Student</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700">Email</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700">Enrolled Courses</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-700">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => {
                      const studentEnrollments = enrollments.filter(e => e.user_id === student.id);
                      return (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#1A3D7C] to-[#FF7A00] rounded-full flex items-center justify-center text-white font-bold">
                                {student.full_name?.charAt(0) || 'S'}
                              </div>
                              <span className="font-medium">{student.full_name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-600">{student.email}</td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                              {studentEnrollments.length} courses
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-500">
                            {studentEnrollments[0]?.enrolled_at 
                              ? new Date(studentEnrollments[0].enrolled_at).toLocaleDateString()
                              : 'N/A'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h3 className="text-2xl font-bold text-gray-900">Create New Course</h3>
            </div>
            
            <form onSubmit={handleAddCourse} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  placeholder="e.g., AI for Business"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  required
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  rows="4"
                  placeholder="What students will learn..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (weeks)</label>
                  <input
                    type="number"
                    min="1"
                    value={newCourse.duration_weeks}
                    onChange={(e) => setNewCourse({...newCourse, duration_weeks: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  >
                    <option value="career">Career</option>
                    <option value="marketing">Marketing</option>
                    <option value="design">Design</option>
                    <option value="kids">Kids</option>
                    <option value="business">Business</option>
                    <option value="tech">Tech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newCourse.is_published}
                    onChange={(e) => setNewCourse({...newCourse, is_published: e.target.value === 'true'})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCourse(false)}
                  className="flex-1 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Topic Modal */}
      {showAddTopic && selectedCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Add Topic to {selectedCourse.title}</h3>
            </div>
            
            <form onSubmit={handleAddTopic} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Week *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTopic.week_number}
                    onChange={(e) => setNewTopic({...newTopic, week_number: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTopic.order_index}
                    onChange={(e) => setNewTopic({...newTopic, order_index: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  placeholder="e.g., Introduction to AI"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newTopic.description}
                  onChange={(e) => setNewTopic({...newTopic, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  rows="3"
                  placeholder="What students will learn in this topic"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                <select
                  value={newTopic.content_type}
                  onChange={(e) => setNewTopic({...newTopic, content_type: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                >
                  <option value="video">Video Lesson</option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                  <option value="article">Reading Material</option>
                </select>
              </div>
              
              {newTopic.content_type === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                  <input
                    type="url"
                    value={newTopic.video_url}
                    onChange={(e) => setNewTopic({...newTopic, video_url: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={newTopic.duration}
                  onChange={(e) => setNewTopic({...newTopic, duration: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                  placeholder="e.g., 15 min"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newTopic.has_quiz}
                    onChange={(e) => setNewTopic({...newTopic, has_quiz: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Include Quiz</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newTopic.has_assignment}
                    onChange={(e) => setNewTopic({...newTopic, has_assignment: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Include Assignment</span>
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTopic(false)}
                  className="flex-1 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Add Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}