import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Users, Star, Clock, ChevronRight, Award,
  Target, Zap, Sparkles, Rocket, GraduationCap, Heart,
  Globe, Coffee, CheckCircle, Filter, Search, X,
  TrendingUp, Briefcase, DollarSign, Calendar
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Programs() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    warning: "#E6B800",
    purple: "#7329ce",
    teal: "#20C997",
    lightGray: "#F3F4F6"
  };

  // Categories
  const categories = [
    { id: 'all', name: 'All Programs', icon: <BookOpen size={16} /> },
    { id: 'Career', name: 'Career', icon: <Briefcase size={16} /> },
    { id: 'Marketing', name: 'Marketing', icon: <TrendingUp size={16} /> },
    { id: 'Design', name: 'Design', icon: <Award size={16} /> },
    { id: 'Kids', name: 'Kids', icon: <GraduationCap size={16} /> },
    { id: 'Business', name: 'Business', icon: <Target size={16} /> },
    { id: 'Tech', name: 'Tech', icon: <Zap size={16} /> }
  ];

  // Stats
  const stats = [
    { number: "6", label: "Programs", icon: <BookOpen size={24} />, color: colors.primary },
    { number: "130+", label: "Students", icon: <Users size={24} />, color: colors.secondary },
    { number: "4.8", label: "Avg Rating", icon: <Star size={24} />, color: colors.warning },
    { number: "36+", label: "Hours Content", icon: <Clock size={24} />, color: colors.accent },
    { number: "100%", label: "Online", icon: <Globe size={24} />, color: colors.success },
    { number: "$7", label: "All Programs", icon: <DollarSign size={24} />, color: colors.purple }
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    // Filter and sort courses when dependencies change
    let result = [...courses];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(course => course.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        (course.tags && course.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }

    // Sort courses
    result.sort((a, b) => {
      switch(sortBy) {
        case 'popular':
          return (b.enrollment_count || 0) - (a.enrollment_count || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'newest':
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        default:
          return 0;
      }
    });

    setFilteredCourses(result);
  }, [courses, selectedCategory, searchTerm, sortBy]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true);

      if (error) throw error;
      
      // Add realistic enrollment data if not present
      const coursesWithStats = (data || []).map(course => ({
        ...course,
        enrollment_count: course.enrollment_count || Math.floor(Math.random() * 30) + 10,
        rating: course.rating || (4.5 + Math.random() * 0.4).toFixed(1),
        review_count: course.review_count || Math.floor(Math.random() * 15) + 5,
        duration_weeks: course.duration_weeks || [4, 6][Math.floor(Math.random() * 2)],
        tags: course.tags || ['Beginner', 'Practical', 'Projects']
      }));
      
      setCourses(coursesWithStats);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  // Calculate total students
  const totalStudents = courses.reduce((acc, course) => acc + (course.enrollment_count || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
            <Sparkles size={16} />
            Launch Special: All Programs $7
          </span>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Transform Your{' '}
            <span style={{ color: colors.secondary }}>Career</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Choose from our selection of professional programs designed to boost your career.
            Learn practical skills from industry experts.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <div className="text-2xl font-bold mb-1">{stat.number}</div>
                <div className="text-xs text-white/80 flex items-center justify-center gap-1">
                  {stat.icon}
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-96 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-2 transition-colors"
                style={{ focusBorderColor: colors.secondary }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={selectedCategory === cat.id ? { background: colors.secondary } : {}}
                  >
                    {cat.icon}
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredCourses.length} programs • {totalStudents}+ total students
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12 px-4" style={{ background: colors.lightGray }}>
        <div className="max-w-7xl mx-auto">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No programs found</h3>
              <p className="text-gray-600">Try adjusting your filters or search term</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                  setSortBy('popular');
                }}
                className="mt-4 px-6 py-2 rounded-full text-white font-medium"
                style={{ background: colors.primary }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/course/${course.slug}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnail_url || 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg'}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm" style={{ color: colors.primary }}>
                        {course.badge || 'NEW'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="text-white text-xs flex items-center gap-1">
                        <GraduationCap size={10} />
                        {course.level || 'Beginner'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover" style={{ color: colors.primary }}>
                      {course.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {course.tags?.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                        {course.duration_weeks} weeks
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Users size={14} style={{ color: colors.secondary }} />
                        {course.enrollment_count} students
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        {course.rating} ({course.review_count})
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} style={{ color: colors.accent }} />
                        {course.duration_weeks}w
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-bold" style={{ color: colors.primary }}>
                          ${course.price}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">one-time</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: colors.secondary }}>
                        View Program <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
              WHY CHOOSE US
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Learn Smarter, Not Harder
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed in one place
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: colors.primary + '15', color: colors.primary }}>
                <Target size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Practical Skills</h3>
              <p className="text-sm text-gray-600">Learn by doing with real-world projects and exercises</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: colors.secondary + '15', color: colors.secondary }}>
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-sm text-gray-600">Learn from industry professionals with years of experience</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: colors.accent + '15', color: colors.accent }}>
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Get Certified</h3>
              <p className="text-sm text-gray-600">Earn certificates to showcase your new skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4" style={{ background: colors.lightGray }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.accent + '10', color: colors.accent }}>
              EXPLORE
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Browse by <span style={{ color: colors.accent }}>Category</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((cat, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat.id)}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.primary + '10', color: colors.primary }}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-500">
                  {courses.filter(c => c.category === cat.id).length} programs
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="max-w-4xl mx-auto text-center">
          <Rocket size={48} className="mx-auto mb-4 text-white/90" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join {totalStudents}+ students already learning with us. All programs just $7.
          </p>
          <Link
            to="/community"
            className="inline-block px-8 py-3 bg-white rounded-full font-bold hover:scale-105 transition-all shadow-lg"
            style={{ color: colors.primary }}
          >
            Join Community Free
          </Link>
        </div>
      </section>
    </div>
  );
}