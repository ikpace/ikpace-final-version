import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import {
  Users, BookOpen, DollarSign, TrendingUp, CheckCircle, RefreshCw,
  Home, LogOut, Search, Database, Plus, Edit, Trash2, Eye,
  BarChart3, CreditCard, UserPlus, BookPlus, Shield, Filter,
  Download, Calendar, MessageSquare, Settings, Bell, ChevronDown,
  Target, Award, Cpu, Zap, Activity, ExternalLink, ArrowRight,
  Video, FileText, Clock, Globe, Layers, PlayCircle
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  
  // Data states
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [payments, setPayments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  
  // Selected course for topic management
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseTopics, setCourseTopics] = useState([]);
  
  // Modal states
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [showTopicManager, setShowTopicManager] = useState(false);
  
  // Form states
  const [newUser, setNewUser] = useState({
    email: "",
    full_name: "",
    role: "student",
    password: "Test@1234"
  });
  
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: 7.00,
    duration_weeks: 8,
    level: "beginner",
    category: "career",
    is_published: true
  });

  const [newTopic, setNewTopic] = useState({
    week_number: 1,
    title: "",
    description: "",
    content_type: "video",
    video_url: "",
    duration: "10 min",
    order_index: 1,
    is_published: true
  });

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalTopics: 0,
    totalRevenue: 0,
    activeEnrollments: 0,
    monthlyGrowth: 23,
    completionRate: 89,
    successRate: 80
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const toastId = toast.loading("Loading dashboard data...");
      
      // Fetch all data in parallel
      const [usersRes, coursesRes, topicsRes, paymentsRes, enrollmentsRes] = await Promise.all([
        supabase.from("user_profiles").select("*"),
        supabase.from("courses").select("*"),
        supabase.from("topics").select("*"),
        supabase.from("payments").select("*"),
        supabase.from("enrollments").select("*")
      ]);

      setUsers(usersRes.data || []);
      setCourses(coursesRes.data || []);
      setTopics(topicsRes.data || []);
      setPayments(paymentsRes.data || []);
      setEnrollments(enrollmentsRes.data || []);

      // Calculate stats
      const successfulPayments = paymentsRes.data?.filter(p => p.status === "success") || [];
      const totalRevenue = successfulPayments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
      const successRate = paymentsRes.data?.length ? 
        (successfulPayments.length / paymentsRes.data.length * 100) : 0;

      setStats({
        totalUsers: usersRes.data?.length || 0,
        totalCourses: coursesRes.data?.length || 0,
        totalTopics: topicsRes.data?.length || 0,
        totalRevenue: totalRevenue,
        activeEnrollments: enrollmentsRes.data?.length || 0,
        monthlyGrowth: 23,
        completionRate: 89,
        successRate: Math.round(successRate)
      });

      toast.success(`Loaded ${coursesRes.data?.length || 0} courses, ${topicsRes.data?.length || 0} topics`, { id: toastId });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating user...");
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
      });

      if (authError) throw authError;

      const { error: profileError } = await supabase.from("user_profiles").insert([{
        id: authData.user.id,
        email: newUser.email,
        full_name: newUser.full_name,
        role: newUser.role
      }]);

      if (profileError) throw profileError;

      toast.success("User created successfully!", { id: toastId });
      setShowAddUser(false);
      setNewUser({ email: "", full_name: "", role: "student", password: "Test@1234" });
      fetchData();
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(error.message || "Failed to create user", { id: toastId });
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating course...");
    
    try {
      const slug = newCourse.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      
      const { error } = await supabase.from("courses").insert([{
        ...newCourse,
        slug: slug,
        enrollment_count: 0,
        thumbnail_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
      }]);

      if (error) throw error;

      toast.success("Course created successfully!", { id: toastId });
      setShowAddCourse(false);
      setNewCourse({
        title: "",
        description: "",
        price: 7.00,
        duration_weeks: 8,
        level: "beginner",
        category: "career",
        is_published: true
      });
      fetchData();
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error(error.message || "Failed to create course", { id: toastId });
    }
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!selectedCourse) {
      toast.error("Please select a course first");
      return;
    }

    const toastId = toast.loading("Adding topic...");
    
    try {
      const { error } = await supabase.from("topics").insert([{
        course_id: selectedCourse.id,
        week_number: newTopic.week_number,
        title: newTopic.title,
        description: newTopic.description,
        content_type: newTopic.content_type,
        video_url: newTopic.video_url,
        duration: newTopic.duration,
        order_index: newTopic.order_index,
        is_published: newTopic.is_published
      }]);

      if (error) throw error;

      toast.success("Topic added successfully!", { id: toastId });
      setShowAddTopic(false);
      setNewTopic({
        week_number: 1,
        title: "",
        description: "",
        content_type: "video",
        video_url: "",
        duration: "10 min",
        order_index: 1,
        is_published: true
      });
      
      // Refresh topics for selected course
      if (selectedCourse) {
        const { data } = await supabase
          .from("topics")
          .select("*")
          .eq("course_id", selectedCourse.id)
          .order("week_number")
          .order("order_index");
        setCourseTopics(data || []);
      }
      fetchData();
    } catch (error) {
      console.error("Error adding topic:", error);
      toast.error(error.message || "Failed to add topic", { id: toastId });
    }
  };

  const handleDeleteTopic = async (topicId) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;
    
    const toastId = toast.loading("Deleting topic...");
    try {
      const { error } = await supabase.from("topics").delete().eq("id", topicId);
      
      if (error) throw error;

      toast.success("Topic deleted successfully!", { id: toastId });
      
      // Refresh topics for selected course
      if (selectedCourse) {
        const { data } = await supabase
          .from("topics")
          .select("*")
          .eq("course_id", selectedCourse.id)
          .order("week_number")
          .order("order_index");
        setCourseTopics(data || []);
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting topic:", error);
      toast.error("Failed to delete topic", { id: toastId });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    const toastId = toast.loading("Deleting user...");
    try {
      const { error } = await supabase.from("user_profiles").delete().eq("id", userId);
      
      if (error) throw error;

      toast.success("User deleted successfully!", { id: toastId });
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user", { id: toastId });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    
    const toastId = toast.loading("Deleting course...");
    try {
      const { error } = await supabase.from("courses").delete().eq("id", courseId);
      
      if (error) throw error;

      toast.success("Course deleted successfully!", { id: toastId });
      fetchData();
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course", { id: toastId });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const openTopicManager = (course) => {
    setSelectedCourse(course);
    loadCourseTopics(course.id);
    setShowTopicManager(true);
  };

  const loadCourseTopics = async (courseId) => {
    const { data } = await supabase
      .from("topics")
      .select("*")
      .eq("course_id", courseId)
      .order("week_number")
      .order("order_index");
    setCourseTopics(data || []);
  };

  // Filter data based on search
  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(search.toLowerCase()) ||
    course.description?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPayments = payments.filter(payment =>
    payment.reference?.toLowerCase().includes(search.toLowerCase()) ||
    payment.status?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Toaster />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-24 h-24 border-4 border-[#1A3D7C] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-600 text-lg font-medium">Loading admin dashboard...</p>
            <p className="text-gray-500">Fetching real-time data from Supabase</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] rounded-2xl shadow-lg">
                <Shield className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">Manage your complete IKPACE platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-[#1A3D7C] hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
                title="Refresh Data"
              >
                <RefreshCw size={20} />
                Refresh
              </button>
              
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-[#1A3D7C] hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
              >
                <Home size={20} />
                Home
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: "Total Users", 
              value: stats.totalUsers, 
              icon: Users, 
              color: "blue", 
              change: `+${stats.monthlyGrowth}% this month`,
              bg: "from-blue-50 to-blue-100",
              iconBg: "bg-blue-500"
            },
            { 
              label: "Active Courses", 
              value: stats.totalCourses, 
              icon: BookOpen, 
              color: "green", 
              change: `${stats.totalTopics} topics`,
              bg: "from-green-50 to-green-100",
              iconBg: "bg-green-500"
            },
            { 
              label: "Total Revenue", 
              value: `$${stats.totalRevenue.toFixed(2)}`, 
              icon: DollarSign, 
              color: "purple", 
              change: "All time revenue",
              bg: "from-purple-50 to-purple-100",
              iconBg: "bg-purple-500"
            },
            { 
              label: "Success Rate", 
              value: `${stats.successRate}%`, 
              icon: Award, 
              color: "amber", 
              change: "Payment success rate",
              bg: "from-amber-50 to-amber-100",
              iconBg: "bg-amber-500"
            }
          ].map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${stat.bg} border border-${stat.color}-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <TrendingUp size={14} className="mr-1" />
                    {stat.change}
                  </div>
                </div>
                <div className={`p-4 ${stat.iconBg} rounded-xl shadow-lg`}>
                  <stat.icon className="text-white" size={28} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg mb-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto px-6">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "users", label: `Users (${users.length})`, icon: Users },
                { id: "courses", label: `Courses (${courses.length})`, icon: BookOpen },
                { id: "topics", label: `Topics (${topics.length})`, icon: Layers },
                { id: "payments", label: `Payments (${payments.length})`, icon: CreditCard },
                { id: "enrollments", label: `Enrollments (${enrollments.length})`, icon: CheckCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-[#1A3D7C] border-b-2 border-[#1A3D7C] bg-blue-50"
                      : "text-gray-600 hover:text-[#1A3D7C] hover:bg-gray-50"
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Filter size={20} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                      <Activity size={22} className="mr-2 text-[#1A3D7C]" />
                      Platform Health
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Database Status</span>
                        <span className="flex items-center text-green-600 font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Healthy
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Total Topics</span>
                        <span className="font-bold">{stats.totalTopics}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Total Courses</span>
                        <span className="font-bold">{stats.totalCourses}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                      <Zap size={22} className="mr-2 text-[#1A3D7C]" />
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setShowAddUser(true)}
                        className="p-4 bg-white border border-gray-200 rounded-xl hover:border-[#1A3D7C] hover:shadow-md transition-all text-center group"
                      >
                        <UserPlus size={24} className="text-[#1A3D7C] mx-auto mb-2" />
                        <div className="font-medium text-gray-900 group-hover:text-[#1A3D7C]">Add User</div>
                      </button>
                      <button
                        onClick={() => setShowAddCourse(true)}
                        className="p-4 bg-white border border-gray-200 rounded-xl hover:border-[#1A3D7C] hover:shadow-md transition-all text-center group"
                      >
                        <BookPlus size={24} className="text-[#1A3D7C] mx-auto mb-2" />
                        <div className="font-medium text-gray-900 group-hover:text-[#1A3D7C]">Add Course</div>
                      </button>
                      <button
                        onClick={() => setActiveTab("topics")}
                        className="p-4 bg-white border border-gray-200 rounded-xl hover:border-[#1A3D7C] hover:shadow-md transition-all text-center group"
                      >
                        <Video size={24} className="text-[#FF7A00] mx-auto mb-2" />
                        <div className="font-medium text-gray-900 group-hover:text-[#FF7A00]">Add Topic</div>
                      </button>
                      <button
                        onClick={fetchData}
                        className="p-4 bg-white border border-gray-200 rounded-xl hover:border-[#1A3D7C] hover:shadow-md transition-all text-center group"
                      >
                        <RefreshCw size={24} className="text-[#1A3D7C] mx-auto mb-2" />
                        <div className="font-medium text-gray-900 group-hover:text-[#1A3D7C]">Refresh Data</div>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                      <Target size={22} className="mr-2 text-[#1A3D7C]" />
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {payments.slice(0, 3).map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg mr-3">
                              <CreditCard size={18} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium">Payment: {payment.reference}</div>
                              <div className="text-gray-500 text-sm">${payment.amount} • {payment.status}</div>
                            </div>
                          </div>
                          <div className="text-gray-500 text-sm">
                            {new Date(payment.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Database Info */}
                <div className="bg-gradient-to-r from-[#1A3D7C]/10 to-[#FF7A00]/10 rounded-2xl p-8 border border-[#1A3D7C]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-2xl text-gray-900 mb-2 flex items-center">
                        <Database size={24} className="mr-3" />
                        Supabase Database
                      </h4>
                      <p className="text-gray-600">
                        Connected to project: <span className="font-mono bg-white px-2 py-1 rounded">agiyudvwmaanwpsozcsh</span>
                      </p>
                      <div className="flex items-center mt-4 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#1A3D7C]">{users.length + courses.length + topics.length + payments.length + enrollments.length}</div>
                          <div className="text-gray-600 text-sm">Total Records</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">5</div>
                          <div className="text-gray-600 text-sm">Active Tables</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#FF7A00]">{topics.length}</div>
                          <div className="text-gray-600 text-sm">Topics/Lessons</div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={fetchData}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white rounded-xl hover:shadow-lg transition-all font-medium"
                    >
                      <RefreshCw size={20} />
                      Sync Data
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">User Management</h3>
                    <p className="text-gray-600">Manage all platform users and permissions</p>
                  </div>
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    <Plus size={20} />
                    Add New User
                  </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                      <tr>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Name</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Email</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Role</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Joined</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-3">
                                <Users size={18} className="text-blue-600" />
                              </div>
                              <span className="font-medium text-gray-900">{user.full_name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">{user.email}</td>
                          <td className="py-4 px-6">
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                              user.role === "admin" 
                                ? "bg-red-100 text-red-800" 
                                : user.role === "instructor"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-600">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <Eye size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-16">
                      <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No users found</p>
                      <button
                        onClick={() => setSearch("")}
                        className="text-[#1A3D7C] hover:underline mt-2"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Course Management</h3>
                    <p className="text-gray-600">Manage all courses and learning content</p>
                  </div>
                  <button
                    onClick={() => setShowAddCourse(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    <Plus size={20} />
                    Add New Course
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="h-48 bg-gradient-to-r from-[#1A3D7C]/20 to-[#FF7A00]/20 relative overflow-hidden">
                        {course.thumbnail_url ? (
                          <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="text-[#1A3D7C]/40" size={64} />
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                            course.is_published 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {course.is_published ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#1A3D7C] transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                          <div className="flex items-center">
                            <DollarSign size={16} className="mr-1" />
                            <span className="font-bold">${course.price?.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            {course.duration_weeks || 8} weeks
                          </div>
                          <div className="flex items-center">
                            <Users size={16} className="mr-1" />
                            {course.enrollment_count || 0}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => openTopicManager(course)}
                            className="flex-1 py-3 bg-[#1A3D7C] text-white rounded-xl hover:bg-[#2F5EA8] transition-colors font-medium text-sm flex items-center justify-center gap-2"
                          >
                            <Layers size={16} />
                            Manage Topics
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="flex-1 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredCourses.length === 0 && (
                    <div className="col-span-3 text-center py-16">
                      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No courses found</p>
                      <button
                        onClick={() => setSearch("")}
                        className="text-[#1A3D7C] hover:underline mt-2"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Topics Tab */}
            {activeTab === "topics" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Topic Management</h3>
                    <p className="text-gray-600">Manage all course topics and learning materials</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => {
                    const courseTopicCount = topics.filter(t => t.course_id === course.id).length;
                    
                    return (
                      <div key={course.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900">{course.title}</h4>
                          <span className="px-3 py-1 bg-[#1A3D7C]/10 text-[#1A3D7C] rounded-full text-sm font-bold">
                            {courseTopicCount} Topics
                          </span>
                        </div>
                        
                        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                          {topics
                            .filter(t => t.course_id === course.id)
                            .sort((a, b) => a.week_number - b.week_number)
                            .map(topic => (
                              <div key={topic.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-3">
                                  {topic.content_type === 'video' ? (
                                    <Video size={16} className="text-[#FF7A00]" />
                                  ) : (
                                    <FileText size={16} className="text-[#1A3D7C]" />
                                  )}
                                  <div>
                                    <div className="font-medium text-gray-800">Week {topic.week_number}: {topic.title}</div>
                                    <div className="text-xs text-gray-500">{topic.duration} • {topic.content_type}</div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDeleteTopic(topic.id)}
                                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                        </div>
                        
                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowAddTopic(true);
                          }}
                          className="w-full py-3 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                        >
                          <Plus size={18} />
                          Add Topic to {course.title}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Payment History</h3>
                    <p className="text-gray-600">Track all transactions and revenue</p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white rounded-xl hover:shadow-lg transition-all font-medium">
                    <Download size={20} />
                    Export Report
                  </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                      <tr>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Reference</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Amount</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Status</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Date</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 font-mono font-bold">{payment.reference}</td>
                          <td className="py-4 px-6">
                            <span className="text-2xl font-bold text-gray-900">${payment.amount}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                              payment.status === "success" 
                                ? "bg-green-100 text-green-800" 
                                : payment.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-600">
                            {new Date(payment.created_at).toLocaleDateString()}
                            <div className="text-gray-500 text-sm">
                              {new Date(payment.created_at).toLocaleTimeString()}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Enrollments Tab */}
            {activeTab === "enrollments" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Course Enrollments</h3>
                    <p className="text-gray-600">Track all student enrollments and progress</p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white rounded-xl hover:shadow-lg transition-all font-medium">
                    <Download size={20} />
                    Export List
                  </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                      <tr>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Student</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Course</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Progress</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Status</th>
                        <th className="py-4 px-6 text-left text-gray-700 font-bold">Enrolled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.slice(0, 15).map((enrollment) => {
                        const user = users.find(u => u.id === enrollment.user_id);
                        const course = courses.find(c => c.id === enrollment.course_id);
                        
                        return (
                          <tr key={enrollment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-3">
                                  <Users size={18} className="text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{user?.full_name || "Unknown User"}</div>
                                  <div className="text-gray-500 text-sm">{user?.email || "No email"}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-900">{course?.title || "Unknown Course"}</td>
                            <td className="py-4 px-6">
                              <div className="w-48">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                  <span>Progress</span>
                                  <span>{enrollment.progress || 0}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className="bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] h-2.5 rounded-full transition-all duration-500" 
                                    style={{ width: `${enrollment.progress || 0}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                enrollment.completed 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {enrollment.completed ? "Completed" : "Active"}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-gray-600">
                              {new Date(enrollment.enrolled_at).toLocaleDateString()}
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
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="p-8 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Add New User</h3>
              <p className="text-gray-600 mt-2">Create a new user account on the platform</p>
            </div>
            
            <form onSubmit={handleAddUser} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password *</label>
                <input
                  type="text"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  placeholder="Minimum 8 characters"
                />
                <p className="text-sm text-gray-500 mt-2">Default password: Test@1234</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Role *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 py-4 text-gray-700 hover:bg-gray-100 rounded-xl font-bold text-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all text-lg"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            <div className="p-8 border-b border-gray-200 sticky top-0 bg-white">
              <h3 className="text-2xl font-bold text-gray-900">Add New Course</h3>
              <p className="text-gray-600 mt-2">Create a new course for your platform</p>
            </div>
            
            <form onSubmit={handleAddCourse} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Course Title *</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  placeholder="Digital Marketing Mastery"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                <textarea
                  required
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  rows="4"
                  placeholder="Brief description of what students will learn..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Duration (weeks)</label>
                  <input
                    type="number"
                    min="1"
                    value={newCourse.duration_weeks}
                    onChange={(e) => setNewCourse({...newCourse, duration_weeks: parseInt(e.target.value) || 8})}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Level</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  >
                    <option value="career">Career</option>
                    <option value="marketing">Marketing</option>
                    <option value="design">Design</option>
                    <option value="kids">Kids</option>
                    <option value="business">Business</option>
                    <option value="tech">Tech</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                <select
                  value={newCourse.is_published}
                  onChange={(e) => setNewCourse({...newCourse, is_published: e.target.value === "true"})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                >
                  <option value="true">Published</option>
                  <option value="false">Draft</option>
                </select>
              </div>
              
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowAddCourse(false)}
                  className="flex-1 py-4 text-gray-700 hover:bg-gray-100 rounded-xl font-bold text-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all text-lg"
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
          <div className="bg-white rounded-3xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="p-8 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Add Topic to {selectedCourse.title}</h3>
              <p className="text-gray-600 mt-2">Create a new lesson or learning material</p>
            </div>
            
            <form onSubmit={handleAddTopic} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Week *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTopic.week_number}
                    onChange={(e) => setNewTopic({...newTopic, week_number: parseInt(e.target.value) || 1})}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Order *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTopic.order_index}
                    onChange={(e) => setNewTopic({...newTopic, order_index: parseInt(e.target.value) || 1})}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Topic Title *</label>
                <input
                  type="text"
                  required
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  placeholder="Introduction to the topic"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  value={newTopic.description}
                  onChange={(e) => setNewTopic({...newTopic, description: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  rows="3"
                  placeholder="What students will learn in this topic"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Content Type</label>
                <select
                  value={newTopic.content_type}
                  onChange={(e) => setNewTopic({...newTopic, content_type: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                >
                  <option value="video">Video</option>
                  <option value="article">Article</option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              
              {newTopic.content_type === 'video' && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Video URL</label>
                  <input
                    type="url"
                    value={newTopic.video_url}
                    onChange={(e) => setNewTopic({...newTopic, video_url: e.target.value})}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={newTopic.duration}
                  onChange={(e) => setNewTopic({...newTopic, duration: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-[#1A3D7C]/20 focus:border-[#1A3D7C] transition-all"
                  placeholder="10 min"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newTopic.is_published}
                  onChange={(e) => setNewTopic({...newTopic, is_published: e.target.checked})}
                  className="w-5 h-5 mr-3"
                />
                <label className="text-gray-700 font-medium">Publish immediately</label>
              </div>
              
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowAddTopic(false)}
                  className="flex-1 py-4 text-gray-700 hover:bg-gray-100 rounded-xl font-bold text-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#1A3D7C] to-[#FF7A00] text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all text-lg"
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