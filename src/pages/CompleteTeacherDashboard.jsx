import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  BookOpen, Users, Plus, Edit, Trash2, Video, FileText, 
  HelpCircle, Clock, Award, Star, Calendar, Download,
  Home, LogOut, ChevronDown, ChevronUp, Settings, Eye,
  EyeOff, Link as LinkIcon, Save, X, Play, Upload,
  Youtube, Globe, CheckCircle, AlertCircle, Filter,
  Search, Grid, List, BarChart, PieChart, TrendingUp,
  Copy, ExternalLink, Share2, QrCode
} from 'lucide-react';

export default function CompleteTeacherDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [showEditTopic, setShowEditTopic] = useState(false);
  const [expandedCourses, setExpandedCourses] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWeek, setFilterWeek] = useState('all');
  const [videoPreview, setVideoPreview] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [copiedLink, setCopiedLink] = useState(null);
  
  // Form states
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    duration_weeks: 6,
    level: 'beginner',
    category: 'career',
    thumbnail_url: '',
    is_published: true,
    price: 7,
    original_price: 49,
    featured: false
  });

  const [newTopic, setNewTopic] = useState({
    week_number: 1,
    title: '',
    description: '',
    content_type: 'video',
    video_url: '',
    video_provider: 'youtube',
    duration: '10 min',
    order_index: 1,
    is_published: true,
    has_quiz: false,
    has_assignment: false,
    resources: []
  });

  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    success: "#008F4C",
    danger: "#DC2626",
    warning: "#F59E0B",
    purple: "#8B5CF6"
  };

  // Check authentication on load
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user);
      
      if (!user) {
        window.location.href = '/direct-teacher';
        return;
      }
      
      setUser(user);
      fetchAllData();
    } catch (error) {
      console.error("Auth error:", error);
      window.location.href = '/direct-teacher';
    }
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      setCourses(coursesData || []);

      // Fetch topics
      if (coursesData?.length > 0) {
        const courseIds = coursesData.map(c => c.id);
        
        const { data: topicsData } = await supabase
          .from('topics')
          .select('*')
          .in('course_id', courseIds)
          .order('week_number')
          .order('order_index');
        
        setTopics(topicsData || []);
        
        // Fetch enrollments
        const { data: enrollmentsData } = await supabase
          .from('enrollments')
          .select('*, profiles!inner(*)')
          .in('course_id', courseIds);
        
        setEnrollments(enrollmentsData || []);
        
        // Extract unique students
        const uniqueStudents = {};
        enrollmentsData?.forEach(e => {
          if (e.profiles && !uniqueStudents[e.user_id]) {
            uniqueStudents[e.user_id] = e.profiles;
          }
        });
        setStudents(Object.values(uniqueStudents));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    
    const slug = newCourse.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { error } = await supabase
      .from('courses')
      .insert([{
        ...newCourse,
        slug,
        instructor_id: user?.id,
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
        is_published: true,
        price: 7,
        original_price: 49,
        featured: false
      });
      fetchAllData();
    }
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return;

    // Process video URL for embedding
    let videoUrl = newTopic.video_url;
    if (newTopic.content_type === 'video' && videoUrl) {
      if (videoUrl.includes('youtube.com/watch')) {
        const videoId = videoUrl.split('v=')[1]?.split('&')[0];
        videoUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (videoUrl.includes('youtu.be/')) {
        const videoId = videoUrl.split('youtu.be/')[1];
        videoUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (videoUrl.includes('vimeo.com')) {
        const videoId = videoUrl.split('vimeo.com/')[1];
        videoUrl = `https://player.vimeo.com/video/${videoId}`;
      }
    }

    const { error } = await supabase
      .from('topics')
      .insert([{
        course_id: selectedCourse.id,
        ...newTopic,
        video_url: videoUrl
      }]);

    if (!error) {
      setShowAddTopic(false);
      setNewTopic({
        week_number: 1,
        title: '',
        description: '',
        content_type: 'video',
        video_url: '',
        video_provider: 'youtube',
        duration: '10 min',
        order_index: 1,
        is_published: true,
        has_quiz: false,
        has_assignment: false,
        resources: []
      });
      setVideoPreview('');
      fetchAllData();
    }
  };

  const handleUpdateTopic = async (e) => {
    e.preventDefault();
    if (!selectedTopic) return;

    const { error } = await supabase
      .from('topics')
      .update(selectedTopic)
      .eq('id', selectedTopic.id);

    if (!error) {
      setShowEditTopic(false);
      setSelectedTopic(null);
      fetchAllData();
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Delete this course? All topics and enrollments will also be deleted.')) return;
    
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    if (!error) fetchAllData();
  };

  const handleDeleteTopic = async (topicId) => {
    if (!confirm('Delete this topic?')) return;
    
    const { error } = await supabase
      .from('topics')
      .delete()
      .eq('id', topicId);

    if (!error) fetchAllData();
  };

  const togglePublishTopic = async (topic) => {
    const { error } = await supabase
      .from('topics')
      .update({ is_published: !topic.is_published })
      .eq('id', topic.id);

    if (!error) fetchAllData();
  };

  const toggleCourseExpand = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const getCourseTopics = (courseId) => {
    let courseTopics = topics.filter(t => t.course_id === courseId);
    
    // Filter by week
    if (filterWeek !== 'all') {
      courseTopics = courseTopics.filter(t => t.week_number === parseInt(filterWeek));
    }
    
    // Search
    if (searchTerm) {
      courseTopics = courseTopics.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return courseTopics.sort((a, b) => {
      if (a.week_number !== b.week_number) return a.week_number - b.week_number;
      return a.order_index - b.order_index;
    });
  };

  const getStudentCount = (courseId) => {
    return enrollments.filter(e => e.course_id === courseId).length;
  };

  const getVideoEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed')) return url;
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const weeks = [...new Set(topics.map(t => t.week_number))].sort((a, b) => a - b);
  const totalStudents = students.length;
  const totalEnrollments = enrollments.length;
  const publishedTopics = topics.filter(t => t.is_published).length;
  const videoTopics = topics.filter(t => t.content_type === 'video').length;
  const quizTopics = topics.filter(t => t.has_quiz).length;
  const assignmentTopics = topics.filter(t => t.has_assignment).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3D7C]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white py-6 px-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-white/80">Welcome, {user?.email}</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/')} 
              className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
              title="Home"
            >
              <Home size={20} />
            </button>
            <button 
              onClick={() => supabase.auth.signOut()} 
              className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <BookOpen className="w-8 h-8 text-[#1A3D7C] mb-3" />
            <div className="text-3xl font-bold">{courses.length}</div>
            <div className="text-gray-600">Total Courses</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <Users className="w-8 h-8 text-[#FF7A00] mb-3" />
            <div className="text-3xl font-bold">{totalStudents}</div>
            <div className="text-gray-600">Active Students</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <Video className="w-8 h-8 text-purple-500 mb-3" />
            <div className="text-3xl font-bold">{topics.length}</div>
            <div className="text-gray-600">Total Lessons</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <Award className="w-8 h-8 text-green-500 mb-3" />
            <div className="text-3xl font-bold">{totalEnrollments}</div>
            <div className="text-gray-600">Enrollments</div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-sm text-gray-500">Published Lessons</div>
            <div className="text-2xl font-bold text-green-600">{publishedTopics}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-sm text-gray-500">Video Lessons</div>
            <div className="text-2xl font-bold text-purple-600">{videoTopics}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-sm text-gray-500">Quizzes</div>
            <div className="text-2xl font-bold text-[#FF7A00]">{quizTopics}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-sm text-gray-500">Assignments</div>
            <div className="text-2xl font-bold text-blue-600">{assignmentTopics}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-sm text-gray-500">Completion Rate</div>
            <div className="text-2xl font-bold text-[#1A3D7C]">
              {totalEnrollments > 0 ? Math.round((publishedTopics / topics.length) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex gap-6 border-b overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3 px-1 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'courses' 
                ? 'text-[#1A3D7C] border-b-2 border-[#1A3D7C]' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`py-3 px-1 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'students' 
                ? 'text-[#1A3D7C] border-b-2 border-[#1A3D7C]' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Students
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-1 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'analytics' 
                ? 'text-[#1A3D7C] border-b-2 border-[#1A3D7C]' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <>
            {/* Header with Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Your Courses</h2>
              
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search topics..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <select
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1A3D7C]"
                  value={filterWeek}
                  onChange={(e) => setFilterWeek(e.target.value)}
                >
                  <option value="all">All Weeks</option>
                  {weeks.map(week => (
                    <option key={week} value={week}>Week {week}</option>
                  ))}
                </select>

                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-[#1A3D7C] text-white' : 'bg-white text-gray-600'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-[#1A3D7C] text-white' : 'bg-white text-gray-600'}`}
                  >
                    <List size={18} />
                  </button>
                </div>

                <button
                  onClick={() => setShowAddCourse(true)}
                  className="bg-[#1A3D7C] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2F5EA8] transition-colors"
                >
                  <Plus size={18} /> New Course
                </button>
              </div>
            </div>

            {/* Courses List */}
            {courses.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Courses Yet</h3>
                <p className="text-gray-600 mb-6">Create your first course to start teaching</p>
                <button
                  onClick={() => setShowAddCourse(true)}
                  className="bg-[#1A3D7C] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2F5EA8] transition-colors"
                >
                  Create Your First Course
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {courses.map(course => {
                  const courseTopics = getCourseTopics(course.id);
                  const isExpanded = expandedCourses[course.id];
                  const studentCount = getStudentCount(course.id);
                  const publishedCount = courseTopics.filter(t => t.is_published).length;
                  const courseUrl = `${window.location.origin}/course/${course.id}`;
                  const curriculumUrl = `${window.location.origin}/course-curriculum/${course.slug || course.id}`;

                  return (
                    <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      {/* Course Header */}
                      <div className="p-6 border-b">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                course.is_published 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {course.is_published ? 'Published' : 'Draft'}
                              </span>
                              {course.featured && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600">
                                  Featured
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            
                            {/* Course Stats */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
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
                                {courseTopics.length} lessons
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye size={16} />
                                {publishedCount} published
                              </span>
                              <span className="flex items-center gap-1">
                                <Award size={16} />
                                ${course.price || 7}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                {course.level}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                {course.category}
                              </span>
                            </div>

                            {/* Course Links */}
                            <div className="flex flex-wrap gap-3 mt-4">
                              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                                <span className="text-xs text-gray-600">Student View:</span>
                                <a 
                                  href={curriculumUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#1A3D7C] hover:underline flex items-center gap-1"
                                >
                                  <ExternalLink size={12} />
                                  Curriculum
                                </a>
                                <button
                                  onClick={() => copyToClipboard(curriculumUrl, `curriculum-${course.id}`)}
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  {copiedLink === `curriculum-${course.id}` ? (
                                    <CheckCircle size={12} className="text-green-600" />
                                  ) : (
                                    <Copy size={12} className="text-gray-500" />
                                  )}
                                </button>
                              </div>
                              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                                <span className="text-xs text-gray-600">Enroll Link:</span>
                                <a 
                                  href={courseUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#FF7A00] hover:underline flex items-center gap-1"
                                >
                                  <ExternalLink size={12} />
                                  Enroll
                                </a>
                                <button
                                  onClick={() => copyToClipboard(courseUrl, `enroll-${course.id}`)}
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  {copiedLink === `enroll-${course.id}` ? (
                                    <CheckCircle size={12} className="text-green-600" />
                                  ) : (
                                    <Copy size={12} className="text-gray-500" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Course Actions */}
                          <div className="flex gap-2">
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

                      {/* Topics Section */}
                      {isExpanded && (
                        <div className="p-6 bg-gray-50">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                              <Video size={18} />
                              Course Topics ({courseTopics.length})
                            </h4>
                            {courseTopics.length > 0 && (
                              <span className="text-sm text-gray-500">
                                {publishedCount} published • {courseTopics.length - publishedCount} drafts
                              </span>
                            )}
                          </div>
                          
                          {courseTopics.length === 0 ? (
                            <div className="text-center py-8 bg-white rounded-lg">
                              <p className="text-gray-500 mb-4">No topics yet. Add your first topic!</p>
                              <button
                                onClick={() => {
                                  setSelectedCourse(course);
                                  setShowAddTopic(true);
                                }}
                                className="bg-[#1A3D7C] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 mx-auto hover:bg-[#2F5EA8] transition-colors"
                              >
                                <Plus size={16} /> Add First Topic
                              </button>
                            </div>
                          ) : (
                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
                              {courseTopics.map(topic => {
                                const topicUrl = `${window.location.origin}/learn/${course.id}/topic/${topic.id}`;
                                
                                return (
                                  <div key={topic.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-start gap-3 flex-1">
                                        {/* Topic Icon */}
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                          topic.content_type === 'video' ? 'bg-orange-100' :
                                          topic.content_type === 'quiz' ? 'bg-purple-100' :
                                          'bg-blue-100'
                                        }`}>
                                          {topic.content_type === 'video' ? (
                                            <Video className="w-5 h-5 text-[#FF7A00]" />
                                          ) : topic.content_type === 'quiz' ? (
                                            <HelpCircle className="w-5 h-5 text-purple-600" />
                                          ) : (
                                            <FileText className="w-5 h-5 text-[#1A3D7C]" />
                                          )}
                                        </div>

                                        {/* Topic Details */}
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                                              Week {topic.week_number}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                                              topic.is_published 
                                                ? 'bg-green-100 text-green-600' 
                                                : 'bg-gray-100 text-gray-600'
                                            }`}>
                                              {topic.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                                              {topic.is_published ? 'Published' : 'Draft'}
                                            </span>
                                            {topic.has_quiz && (
                                              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                                                Quiz
                                              </span>
                                            )}
                                            {topic.has_assignment && (
                                              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                                Assignment
                                              </span>
                                            )}
                                          </div>
                                          
                                          <h5 className="font-medium text-gray-900">{topic.title}</h5>
                                          {topic.description && (
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{topic.description}</p>
                                          )}
                                          
                                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                              <Clock size={12} />
                                              {topic.duration}
                                            </span>
                                            {topic.video_url && (
                                              <a 
                                                href={topic.video_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-[#1A3D7C] hover:underline"
                                              >
                                                <Youtube size={12} />
                                                Watch Video
                                              </a>
                                            )}
                                          </div>

                                          {/* Topic Link */}
                                          <div className="flex items-center gap-2 mt-3 bg-gray-50 p-2 rounded-lg">
                                            <span className="text-xs text-gray-600">Topic Link:</span>
                                            <a 
                                              href={topicUrl} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="text-xs text-purple-600 hover:underline flex items-center gap-1"
                                            >
                                              <ExternalLink size={12} />
                                              View
                                            </a>
                                            <button
                                              onClick={() => copyToClipboard(topicUrl, `topic-${topic.id}`)}
                                              className="p-1 hover:bg-gray-200 rounded"
                                            >
                                              {copiedLink === `topic-${topic.id}` ? (
                                                <CheckCircle size={12} className="text-green-600" />
                                              ) : (
                                                <Copy size={12} className="text-gray-500" />
                                              )}
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Topic Actions */}
                                      <div className="flex gap-1 ml-4">
                                        <button
                                          onClick={() => togglePublishTopic(topic)}
                                          className={`p-2 rounded-lg transition-colors ${
                                            topic.is_published 
                                              ? 'text-green-600 hover:bg-green-50' 
                                              : 'text-gray-400 hover:bg-gray-100'
                                          }`}
                                          title={topic.is_published ? 'Unpublish' : 'Publish'}
                                        >
                                          {topic.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                                        </button>
                                        <button
                                          onClick={() => {
                                            setSelectedTopic(topic);
                                            setShowEditTopic(true);
                                          }}
                                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                          title="Edit Topic"
                                        >
                                          <Edit size={16} />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteTopic(topic.id)}
                                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                          title="Delete Topic"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Students</h2>
            {students.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Students Yet</h3>
                <p className="text-gray-600">Students will appear here when they enroll in your courses</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Student</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Email</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Enrolled Courses</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Joined</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => {
                        const studentEnrollments = enrollments.filter(e => e.user_id === student.id);
                        const progress = Math.floor(Math.random() * 100);
                        
                        return (
                          <tr key={student.id} className="border-t hover:bg-gray-50">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#1A3D7C] to-[#FF7A00] rounded-full flex items-center justify-center text-white font-bold">
                                  {student.full_name?.charAt(0) || 'S'}
                                </div>
                                <span className="font-medium">{student.full_name || 'Student'}</span>
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
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600">{progress}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Course Analytics</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Enrollment Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#1A3D7C]" />
                  Enrollment Overview
                </h3>
                <div className="space-y-4">
                  {courses.map(course => {
                    const count = getStudentCount(course.id);
                    const percentage = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
                    
                    return (
                      <div key={course.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">{course.title}</span>
                          <span className="font-bold text-[#1A3D7C]">{count} students</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#FF7A00]"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Content Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#FF7A00]" />
                  Content Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Lessons</span>
                    <span className="font-bold text-[#1A3D7C]">{topics.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Published Lessons</span>
                    <span className="font-bold text-green-600">{publishedTopics}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Video Lessons</span>
                    <span className="font-bold text-purple-600">{videoTopics}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Quizzes</span>
                    <span className="font-bold text-[#FF7A00]">{quizTopics}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Assignments</span>
                    <span className="font-bold text-blue-600">{assignmentTopics}</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#1A3D7C]">{weeks.length}</div>
                      <div className="text-xs text-gray-500">Total Weeks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#FF7A00]">
                        {topics.length > 0 ? Math.round((publishedTopics / topics.length) * 100) : 0}%
                      </div>
                      <div className="text-xs text-gray-500">Publish Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white flex justify-between items-center">
              <h3 className="text-2xl font-bold">Create New Course</h3>
              <button onClick={() => setShowAddCourse(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Course Title *</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1A3D7C]"
                  placeholder="e.g., Complete Web Development Bootcamp"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  required
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1A3D7C]"
                  rows="3"
                  placeholder="What students will learn in this course..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (weeks)</label>
                  <input
                    type="number"
                    min="1"
                    value={newCourse.duration_weeks}
                    onChange={(e) => setNewCourse({...newCourse, duration_weeks: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Level</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg"
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
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={newCourse.is_published}
                    onChange={(e) => setNewCourse({...newCourse, is_published: e.target.value === 'true'})}
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Original Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newCourse.original_price}
                    onChange={(e) => setNewCourse({...newCourse, original_price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newCourse.featured}
                    onChange={(e) => setNewCourse({...newCourse, featured: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Feature this course on homepage</span>
                </label>
              </div>

              {/* Course Links Section - Shows after course creation */}
              {courses.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <h4 className="font-medium text-blue-800">Course Links</h4>
                  <p className="text-xs text-blue-600">These links will be available after course creation</p>
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div>
                      <span className="text-xs text-gray-500">Curriculum Page:</span>
                      <p className="text-sm font-mono text-gray-700">/course-curriculum/[course-slug]</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Copy size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div>
                      <span className="text-xs text-gray-500">Enrollment Page:</span>
                      <p className="text-sm font-mono text-gray-700">/course/[course-id]</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCourse(false)}
                  className="flex-1 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1A3D7C] text-white rounded-lg hover:bg-[#2F5EA8] transition-colors"
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
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white flex justify-between items-center">
              <h3 className="text-2xl font-bold">Add Topic to {selectedCourse.title}</h3>
              <button onClick={() => setShowAddTopic(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddTopic} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Week *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTopic.week_number}
                    onChange={(e) => setNewTopic({...newTopic, week_number: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Order *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTopic.order_index}
                    onChange={(e) => setNewTopic({...newTopic, order_index: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="e.g., Introduction to the topic"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newTopic.description}
                  onChange={(e) => setNewTopic({...newTopic, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg"
                  rows="2"
                  placeholder="What students will learn in this topic"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Content Type</label>
                <select
                  value={newTopic.content_type}
                  onChange={(e) => setNewTopic({...newTopic, content_type: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg"
                >
                  <option value="video">Video Lesson</option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                  <option value="article">Reading Material</option>
                </select>
              </div>
              
              {newTopic.content_type === 'video' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Video Provider</label>
                    <select
                      value={newTopic.video_provider}
                      onChange={(e) => setNewTopic({...newTopic, video_provider: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    >
                      <option value="youtube">YouTube</option>
                      <option value="vimeo">Vimeo</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Video URL</label>
                    <input
                      type="url"
                      value={newTopic.video_url}
                      onChange={(e) => {
                        setNewTopic({...newTopic, video_url: e.target.value});
                        setVideoPreview(e.target.value);
                      }}
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>

                  {videoPreview && (
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
                      <iframe
                        src={getVideoEmbedUrl(videoPreview)}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input
                  type="text"
                  value={newTopic.duration}
                  onChange={(e) => setNewTopic({...newTopic, duration: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="e.g., 10 min"
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newTopic.has_quiz}
                    onChange={(e) => setNewTopic({...newTopic, has_quiz: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Include Quiz</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newTopic.has_assignment}
                    onChange={(e) => setNewTopic({...newTopic, has_assignment: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Include Assignment</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newTopic.is_published}
                    onChange={(e) => setNewTopic({...newTopic, is_published: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Publish immediately</span>
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddTopic(false);
                    setVideoPreview('');
                  }}
                  className="flex-1 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1A3D7C] text-white rounded-lg hover:bg-[#2F5EA8] transition-colors"
                >
                  Add Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Topic Modal */}
      {showEditTopic && selectedTopic && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white flex justify-between items-center">
              <h3 className="text-2xl font-bold">Edit Topic</h3>
              <button onClick={() => setShowEditTopic(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateTopic} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Week *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={selectedTopic.week_number}
                    onChange={(e) => setSelectedTopic({...selectedTopic, week_number: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Order *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={selectedTopic.order_index}
                    onChange={(e) => setSelectedTopic({...selectedTopic, order_index: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={selectedTopic.title}
                  onChange={(e) => setSelectedTopic({...selectedTopic, title: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={selectedTopic.description}
                  onChange={(e) => setSelectedTopic({...selectedTopic, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg"
                  rows="2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Content Type</label>
                <select
                  value={selectedTopic.content_type}
                  onChange={(e) => setSelectedTopic({...selectedTopic, content_type: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg"
                >
                  <option value="video">Video Lesson</option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                  <option value="article">Reading Material</option>
                </select>
              </div>
              
              {selectedTopic.content_type === 'video' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Video URL</label>
                    <input
                      type="url"
                      value={selectedTopic.video_url}
                      onChange={(e) => setSelectedTopic({...selectedTopic, video_url: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>

                  {selectedTopic.video_url && (
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
                      <iframe
                        src={getVideoEmbedUrl(selectedTopic.video_url)}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input
                  type="text"
                  value={selectedTopic.duration}
                  onChange={(e) => setSelectedTopic({...selectedTopic, duration: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTopic.has_quiz}
                    onChange={(e) => setSelectedTopic({...selectedTopic, has_quiz: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Include Quiz</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTopic.has_assignment}
                    onChange={(e) => setSelectedTopic({...selectedTopic, has_assignment: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Include Assignment</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTopic.is_published}
                    onChange={(e) => setSelectedTopic({...selectedTopic, is_published: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Published</span>
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditTopic(false);
                    setSelectedTopic(null);
                  }}
                  className="flex-1 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1A3D7C] text-white rounded-lg hover:bg-[#2F5EA8] transition-colors"
                >
                  Update Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}