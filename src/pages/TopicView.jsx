// pages/TopicView.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, Play, FileText, Clock,
  ChevronLeft, ChevronRight, Download, BookOpen,
  MessageCircle, ThumbsUp, Share2, Check, Lock,
  Video, Target, Award, Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function TopicView() {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [topic, setTopic] = useState(null);
  const [course, setCourse] = useState(null);
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [enrolled, setEnrolled] = useState(false);

  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    lightGray: "#F3F4F6"
  };

  useEffect(() => {
    loadTopicData();
  }, [topicId, courseId, user]);

  const loadTopicData = async () => {
    try {
      setLoading(true);

      // Check if user is enrolled
      if (user) {
        const { data: enrollmentData } = await supabase
          .from('enrollments')
          .select('*')
          .eq('course_id', courseId)
          .eq('user_id', user.id)
          .single();

        setEnrolled(!!enrollmentData);
        
        if (!enrollmentData) {
          // If not enrolled, redirect to course page
          navigate(`/course/${courseId}`);
          return;
        }
      } else {
        // If not logged in, redirect to login
        navigate('/login');
        return;
      }

      // Get course details
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      setCourse(courseData);

      // Get current topic
      const { data: topicData } = await supabase
        .from('topics')
        .select('*')
        .eq('id', topicId)
        .single();

      if (!topicData) {
        navigate(`/course-curriculum/${courseData?.slug}`);
        return;
      }

      setTopic(topicData);

      // Get all topics for this course
      const { data: allTopicsData } = await supabase
        .from('topics')
        .select('*')
        .eq('course_id', courseId)
        .eq('is_published', true)
        .order('week_number', { ascending: true })
        .order('order_index', { ascending: true });

      setAllTopics(allTopicsData || []);

      // Check if topic is already completed
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('topic_id', topicId)
        .single();

      setCompleted(!!progressData?.completed);

      // Calculate progress position
      const currentIndex = allTopicsData?.findIndex(t => t.id === topicId) || 0;
      setProgress(((currentIndex + 1) / (allTopicsData?.length || 1)) * 100);

    } catch (error) {
      console.error('Error loading topic:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async () => {
    if (!user || !topic || completed) return;

    try {
      // Save to user_progress table
      await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          topic_id: topic.id,
          course_id: courseId,
          completed: true,
          completed_at: new Date().toISOString()
        });

      setCompleted(true);

      // Calculate new overall progress
      const completedTopics = allTopics.filter(t => 
        t.id === topic.id ? true : false // This will be updated with actual data
      ).length + 1;
      
      const progressPercent = (completedTopics / allTopics.length) * 100;

      // Update enrollment progress
      await supabase
        .from('enrollments')
        .update({ 
          progress_percentage: progressPercent,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('course_id', courseId);

    } catch (error) {
      console.error('Error marking as completed:', error);
    }
  };

  const getAdjacentTopics = () => {
    const currentIndex = allTopics.findIndex(t => t.id === topicId);
    return {
      prev: currentIndex > 0 ? allTopics[currentIndex - 1] : null,
      next: currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null
    };
  };

  const { prev, next } = getAdjacentTopics();

  const getContentIcon = (contentType) => {
    switch(contentType) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to={`/course-curriculum/${course?.slug}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Curriculum</span>
              </Link>
              <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
              <h1 className="font-bold text-sm sm:text-base truncate max-w-[150px] sm:max-w-md">
                {course?.title}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs sm:text-sm text-gray-500">
                Week {topic?.week_number}
              </span>
              <div className="hidden sm:block h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-300"
                  style={{ width: `${progress}%`, background: colors.secondary }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Topic Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                Week {topic?.week_number}
              </span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
                {getContentIcon(topic?.content_type)}
                {topic?.content_type || 'Lesson'}
              </span>
              {topic?.duration && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {topic.duration}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {topic?.title}
            </h1>
            {topic?.description && (
              <p className="text-gray-600">{topic.description}</p>
            )}
          </div>

          {/* Video Player */}
          {topic?.video_url && (
            <div className="aspect-video bg-gray-900">
              <video 
                controls 
                className="w-full h-full"
                poster={course?.thumbnail_url}
              >
                <source src={topic.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Content Area */}
          {topic?.content_url && !topic?.video_url && (
            <div className="p-6">
              <iframe 
                src={topic.content_url}
                className="w-full h-[500px] border-0 rounded-lg"
                title={topic.title}
                allowFullScreen
              />
            </div>
          )}

          {/* Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={markAsCompleted}
                  disabled={completed}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    completed 
                      ? 'bg-green-100 text-green-700 cursor-default' 
                      : 'text-white hover:scale-105'
                  }`}
                  style={!completed ? { background: colors.primary } : {}}
                >
                  {completed ? (
                    <>
                      <Check className="w-4 h-4" />
                      Completed
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Mark as Completed
                    </>
                  )}
                </button>
                
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  <ThumbsUp className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  <MessageCircle className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {prev && (
                  <Link
                    to={`/learn/${courseId}/topic/${prev.id}`}
                    className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Link>
                )}
                
                {next && (
                  <Link
                    to={`/learn/${courseId}/topic/${next.id}`}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-white text-sm hover:scale-105 transition-all flex items-center justify-center gap-2"
                    style={{ background: colors.secondary }}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Download className="w-5 h-5" style={{ color: colors.primary }} />
            Lesson Resources
          </h3>
          <div className="space-y-3">
            <button className="w-full p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Lesson Notes - Week {topic?.week_number}</span>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Exercise Files</span>
              </div>
              <Download className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Discussion Section */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" style={{ color: colors.secondary }} />
            Discussion
          </h3>
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 mb-4">Join the conversation about this lesson</p>
            <Link
              to="/community"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Go to Community Forum
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}