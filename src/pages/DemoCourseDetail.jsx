import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Star,
  Clock,
  Users,
  CheckCircle,
  Award,
  Calendar,
  Shield,
  ShoppingCart,
  Video,
  FileText,
  Download,
  MessageCircle,
  PlayCircle,
  BookOpen,
  Target,
  Zap,
  TrendingUp,
  Heart,
  ChevronRight,
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink,
  Share2,
  Bookmark,
  BookmarkCheck,
  Brain,
  Code,
  Home,
  TrendingUp as TrendingUpIcon,
  Cpu,
  DollarSign,
  Palette,
  Briefcase,
  MessageSquare,
  Percent,
  Users as UsersIcon,
  Coffee,
  Sparkles,
  Rocket,
  Wifi,
  Monitor,
  Smartphone,
  Headphones,
  Camera,
  Settings,
  Database,
  Server,
  Cloud,
  Terminal,
  Mail as EmailIcon,
  CreditCard,
  ShoppingBag,
  BarChart,
  PieChart,
  Lock,
  Bitcoin,
  Megaphone,
  ThumbsUp,
  Medal,
  PhoneOutgoing,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import Loader from "../components/Loader";
import { allCourses } from "../data/DemoCourses";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [enrolled, setEnrolled] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [openModule, setOpenModule] = useState(null);

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);

        if (id) {
          // Try to fetch from Supabase first
          const { data, error } = await supabase
            .from("courses")
            .select("*")
            .eq("id", id)
            .single();

          if (error) {
            console.log(
              "Course not found in Supabase, using sample data:",
              error,
            );
            // Fall back to sample data
            const sampleCourse = allCourses[id];
            if (sampleCourse) {
              setCourse(sampleCourse);
            } else {
              // If course not found, show the first course
              const firstCourse = Object.values(allCourses)[0];
              setCourse(firstCourse);
            }
          } else if (data) {
            // Map Supabase data to our course format
            const formattedCourse = {
              id: data.id,
              title: data.title || "Untitled Course",
              subtitle:
                data.subtitle || "Master this skill and boost your career",
              description: data.description || "No description available",
              fullDescription:
                data.full_description ||
                data.description ||
                "Learn valuable skills that will transform your career and income potential.",
              price: 7, // All courses are $7
              originalPrice: parseFloat(data.original_price) || 49,
              duration: data.duration || "Self-paced",
              students: data.enrollment_count || 0,
              rating: data.rating || 4.5,
              category: data.category || "general",
              level: data.level || "beginner",
              instructor: data.instructor || "iKPACE Expert",
              instructorTitle: data.instructor_title || "Industry Expert",
              instructorImage:
                data.instructor_image ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
              image:
                data.image_url ||
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
              featured: data.featured || false,
              badge: data.badge || "Popular",
              badgeColor:
                data.badge_color ||
                "bg-gradient-to-r from-[#7329ce] to-[#4610db]",
              tags: data.tags
                ? typeof data.tags === "string"
                  ? JSON.parse(data.tags)
                  : data.tags
                : ["Skill", "Learning", "Career"],
              features: data.features
                ? typeof data.features === "string"
                  ? JSON.parse(data.features)
                  : data.features
                : [
                    "30-day money-back guarantee",
                    "Certificate of completion",
                    "Lifetime access",
                    "Community access",
                  ],
              discount: 85, // 85% off from $49 to $7
              color: data.color || "from-[#7329ce] to-[#4610db]",
              // Use default content
              learningOutcomes: [
                "Master the fundamental concepts and principles",
                "Build practical projects to apply your knowledge",
                "Develop problem-solving skills for real-world scenarios",
                "Create a portfolio to showcase your expertise",
                "Prepare for industry certification exams",
              ],
              requirements: [
                "No prior experience required",
                "Basic computer skills",
                "Internet connection",
                "Dedication to learn",
              ],
              toolsNeeded: data.tools_needed || [
                "Computer",
                "Internet",
                "Basic software",
              ],
              timeCommitment: data.time_commitment || "2-3 hours per week",
              modules: [
                {
                  title: "Getting Started",
                  duration: "2 hours",
                  lessons: 5,
                  topics: [
                    "Introduction to the Course",
                    "Setting Up Your Environment",
                    "Understanding Core Concepts",
                    "Your First Project",
                    "Course Resources Overview",
                  ],
                },
                {
                  title: "Fundamentals",
                  duration: "6 hours",
                  lessons: 12,
                  topics: [
                    "Basic Principles",
                    "Key Terminology",
                    "Essential Tools",
                    "Common Patterns",
                    "Best Practices",
                  ],
                },
                {
                  title: "Advanced Concepts",
                  duration: "8 hours",
                  lessons: 15,
                  topics: [
                    "Advanced Techniques",
                    "Performance Optimization",
                    "Troubleshooting",
                    "Real-world Applications",
                    "Industry Insights",
                  ],
                },
              ],
              testimonials: [
                {
                  name: "Alex Johnson",
                  role: "Software Developer",
                  rating: 5,
                  text: "This course transformed my career. The practical approach and real-world examples made all the difference.",
                },
                {
                  name: "Sarah Miller",
                  role: "Marketing Manager",
                  rating: 5,
                  text: "I was able to apply what I learned immediately. The instructor is fantastic and very responsive.",
                },
              ],
              lessons: 32,
              projects: 5,
              monthsToComplete: "1-2 months",
              weeklyHours: "2-4 hours",
            };
            setCourse(formattedCourse);
          }
        } else {
          // If no ID, redirect to courses
          navigate("/courses");
        }
      } catch (error) {
        console.error("Error loading course:", error);
        // Fall back to sample data
        const sampleCourse = allCourses[id];
        if (sampleCourse) {
          setCourse(sampleCourse);
        } else {
          navigate("/courses");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id, navigate]);

  const handleEnrollNow = () => {
    if (course) {
      navigate(`/confirm-enrollment/${course.id}`);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <Loader text="Loading Course Details..." />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Course Not Found
            </h3>
            <p className="text-gray-600 mb-6">
              The course you're looking for doesn't exist.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7329ce] to-[#4610db] text-white rounded-lg font-medium hover:opacity-90"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse All Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Ensure features is always an array
  const courseFeatures = Array.isArray(course.features)
    ? course.features
    : [
        "30-day money-back guarantee",
        "Certificate of completion",
        "Lifetime access",
        "Community access",
      ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden bg-[#F5555]  border-white/20 rounded-2xl`}
      >
        {/* <div className="absolute inset-0"></div> */}
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            {/* Left Content */}
            <div className="md:w-2/3">
              <div>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Courses
                </Link>

                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`${course.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold`}
                  >
                    {course.badge}
                  </span>
                  <span className="text-sm">
                    {course.category?.toUpperCase() || "COURSE"}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {course.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className=" font-bold text-lg">
                        {course.rating}
                      </span>
                    </div>
                    <span className="">
                      ({course.students?.toLocaleString() || 0} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 " />
                    <span className="">
                      {course.students?.toLocaleString() || 0}+ students
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    <span className="text-gray-700 capitalize">
                      {course.level || "beginner"}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-700 mb-4">{course.fullDescription}</p>
                </div>
              </div>

              <div>
                {/* ===================== */}
                {/* WHAT YOU'LL LEARN */}
                {/* ===================== */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">
                    What You'll Learn
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    {course.learningOutcomes?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#7329ce] transition-all duration-300 hover:shadow-sm"
                      >
                        <CheckCircle
                          className="text-[#7329ce] mt-1 flex-shrink-0"
                          size={18}
                        />
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ===================== */}
                {/* CURRICULUM ACCORDION */}
                {/* ===================== */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">
                    Course Curriculum
                  </h2>

                  <div className="space-y-4">
                    {course.modules?.map((module, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300"
                      >
                        {/* Accordion Header */}
                        <button
                          onClick={() => toggleModule(index)}
                          className="w-full flex justify-between items-center p-5 text-left bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                        >
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {module.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {module.lessons} lessons • {module.duration}
                            </p>
                          </div>

                          <ChevronDown
                            className={`transition-transform duration-300 ${
                              openModule === index
                                ? "rotate-180 text-[#7329ce]"
                                : ""
                            }`}
                          />
                        </button>

                        {/* Accordion Content */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            openModule === index
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="p-5 bg-white border-t border-gray-100">
                              <ul className="space-y-3">
                                {module.topics?.map((topic, i) => (
                                  <li
                                    key={i}
                                    className="flex justify-between text-sm text-gray-700 hover:text-[#7329ce] transition-colors duration-200"
                                  >
                                    <span className="flex items-center gap-2">
                                      <Video className="w-4 h-4 text-gray-400" />
                                      {topic}
                                    </span>
                                    <span className="text-gray-400">
                                      15–30 min
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ===================== */}
                {/* INSTRUCTOR */}
                {/* ===================== */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">
                    Instructor
                  </h2>

                  <div className="flex items-center gap-6 p-6 border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-300">
                    <img
                      src={course.instructorImage}
                      alt={course.instructor}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#7329ce]"
                    />

                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {course.instructor}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {course.instructorTitle}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star
                          className="text-amber-500 fill-current"
                          size={16}
                        />
                        {course.rating} Instructor Rating
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===================== */}
                {/* REVIEWS */}
                {/* ===================== */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">
                    Student Reviews
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {course.testimonials?.map((review, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-amber-500 fill-current mr-1"
                            />
                          ))}
                        </div>

                        <p className="text-gray-700 text-sm italic mb-4">
                          "{review.text}"
                        </p>

                        <p className="font-semibold text-gray-900 text-sm">
                          {review.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Card - Right Side */}
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-[#F5555] shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl font-bold">
                      <div className="flex items-center gap-1">
                        ${course.price?.toFixed(2) || "7.00"}
                        {course.originalPrice > course.price && (
                          <div className="text-base line-through text-gray-400">
                            ${course.originalPrice?.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>

                    {course.discount > 0 && (
                      <div className="text-[#FF7A00] text-lg font-bold mb-2">
                        {course.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">One-time payment</div>
                  <div className="text-sm mb-2 text-gray-400">
                    30-day money-back guarantee
                  </div>
                </div>

                <button
                  onClick={handleEnrollNow}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold  py-4 sm:py-2 sm:px-3 px-6 rounded-xl text-lg  my-6 flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart size={24} />
                  Enroll Now - Only $7
                </button>

                <hr className="my-6 border-gray-200" />

                <div className="space-y-3">
                  {courseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle
                        size={18}
                        className="mr-3 text-green-400 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 my-3">
                  <button
                    onClick={handleBookmark}
                    className="ml-auto text-black hover:text-yellow-300 transition-colors"
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-6 h-6" />
                    ) : (
                      <Bookmark className="w-6 h-6" />
                    )}
                  </button>
                  <button className="hover:text-yellow-300 transition-colors">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Course Details Card */}
              <div className="bg-white border border-gray-300 my-6 shadow-lg  hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm border-white/20 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">Course Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-bold text-gray-900">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Lessons:</span>
                    <span className="font-bold text-gray-900">
                      {course.lessons || 30}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Projects:</span>
                    <span className="font-bold text-gray-900">
                      {course.projects || 5}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-bold text-gray-900 capitalize">
                      {course.level || "beginner"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Access:</span>
                    <span className="font-bold text-gray-900">Lifetime</span>
                  </div>
                </div>
              </div>

              {/* Quick Help Card */}

              <div className="sticky top-24 space-y-6">
                {/* Course Progress (if enrolled) */}
                {enrolled && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">
                      Your Progress
                    </h4>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Course Progress</span>
                        <span>25%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#7329ce] h-2 rounded-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                    </div>
                    <button className="w-full bg-[#7329ce] hover:bg-[#5a1fb3] text-white font-medium py-3 px-4 rounded-lg">
                      Continue Learning
                    </button>
                  </div>
                )}

                {/* Quick Help Card */}
                <div className="bg-gradient-to-r from-[#7329ce]/60 to-[#4610db]/60 text-white rounded-2xl p-8 my-8 shadow-lg">
                  <h4 className="font-bold text-xl mb-4">Have Any Question?</h4>
                  <p className="my-4 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio minima in dolore. Totam nobis earum consequuntur
                  </p>
                  <div className="text-sm text-white/80">
                    <div className="mb-2 flex items-center gap-1">
                      <PhoneOutgoing size={16} strokeWidth={2} />
                      <span className="ml-2">+1 (555) 123-4567</span>
                    </div>
                    <div className="mb-2 flex items-center gap-1">
                      <Mail size={16} strokeWidth={2} />
                      <span className="ml-2">contact@ikpace.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
