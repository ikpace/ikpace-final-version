import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Users, Home, LogOut } from 'lucide-react';

export default function TeacherDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("TeacherDashboard - auth state:", { user, authLoading });
    
    if (!authLoading && !user) {
      console.log("No user found, redirecting to login");
      navigate('/login');
      return;
    }

    if (user) {
      console.log("User found, fetching courses for:", user.email);
      fetchCourses();
    }
  }, [user, authLoading, navigate]);

  const fetchCourses = async () => {
    try {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3D7C]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1A3D7C] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            <p className="text-sm opacity-90">Welcome, {user?.email}</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/')}
              className="bg-white/10 p-2 rounded-lg hover:bg-white/20"
            >
              <Home size={20} />
            </button>
            <button 
              onClick={handleLogout}
              className="bg-white/10 p-2 rounded-lg hover:bg-white/20"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <BookOpen className="w-8 h-8 text-[#1A3D7C] mb-3" />
            <div className="text-3xl font-bold">{courses.length}</div>
            <div className="text-gray-600">Total Courses</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Users className="w-8 h-8 text-[#FF7A00] mb-3" />
            <div className="text-3xl font-bold">0</div>
            <div className="text-gray-600">Students</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <BookOpen className="w-8 h-8 text-green-500 mb-3" />
            <div className="text-3xl font-bold">{courses.length}</div>
            <div className="text-gray-600">Your Courses</div>
          </div>
        </div>

        {/* Courses List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Your Courses</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {courses.map(course => (
              <div key={course.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
                <h3 className="font-bold">{course.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}