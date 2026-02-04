import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { ChevronLeft, ChevronRight, CheckCircle, Circle, PlayCircle, Award, Book } from 'lucide-react'
import AdvancedVideoPlayer from '../components/AdvancedVideoPlayer'
import QuizSystem from '../components/QuizSystem'

export default function EnhancedCoursePlayer() {
  const { courseId } = useParams()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [currentLesson, setCurrentLesson] = useState(null)
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [videoCompleted, setVideoCompleted] = useState(false)
  const [quizData, setQuizData] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchCourseData()
  }, [courseId, user])

  const fetchCourseData = async () => {
    try {
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .maybeSingle()

      if (courseData) {
        setCourse(courseData)

        const { data: modulesData } = await supabase
          .from('modules')
          .select(`
            *,
            lessons (*)
          `)
          .eq('course_id', courseId)
          .order('order_index')

        if (modulesData) {
          modulesData.forEach(module => {
            module.lessons.sort((a, b) => a.order_index - b.order_index)
          })
          setModules(modulesData)
          if (modulesData[0]?.lessons?.[0]) {
            loadLesson(modulesData[0].lessons[0])
          }
        }

        if (profile?.id) {
          const { data: progressData } = await supabase
            .from('lesson_progress')
            .select('lesson_id, is_completed, quiz_score')
            .eq('user_id', profile.id)

          const progressMap = {}
          progressData?.forEach(p => {
            progressMap[p.lesson_id] = {
              completed: p.is_completed,
              quizScore: p.quiz_score
            }
          })
          setProgress(progressMap)
        }
      }
    } catch (error) {
      console.error('Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadLesson = async (lesson) => {
    setCurrentLesson(lesson)
    setShowQuiz(false)
    setVideoCompleted(false)

    if (lesson.quiz_questions) {
      try {
        const quizQuestions = typeof lesson.quiz_questions === 'string'
          ? JSON.parse(lesson.quiz_questions)
          : lesson.quiz_questions
        setQuizData(quizQuestions)
      } catch (error) {
        console.error('Error parsing quiz data:', error)
        setQuizData(null)
      }
    } else {
      setQuizData(getSampleQuiz())
    }
  }

  const getSampleQuiz = () => {
    return [
      {
        type: 'multiple-choice',
        question: 'What is the primary purpose of this lesson?',
        options: [
          'To understand core concepts',
          'To practice implementation',
          'To review fundamentals',
          'All of the above'
        ],
        correctAnswer: 'All of the above',
        explanation: 'Effective learning combines understanding concepts, practicing implementation, and reviewing fundamentals.'
      },
      {
        type: 'true-false',
        question: 'Continuous practice is essential for mastering new skills.',
        correctAnswer: 'True',
        explanation: 'Regular practice helps reinforce learning and build competency over time.'
      },
      {
        type: 'multi-select',
        question: 'Which of the following are important for effective learning? (Select all that apply)',
        options: [
          'Active participation',
          'Regular review',
          'Practical application',
          'Passive listening only'
        ],
        correctAnswers: ['Active participation', 'Regular review', 'Practical application'],
        explanation: 'Effective learning requires active engagement, regular review, and practical application of concepts.'
      }
    ]
  }

  const handleVideoComplete = () => {
    setVideoCompleted(true)
    if (quizData && quizData.length > 0) {
      setTimeout(() => {
        setShowQuiz(true)
      }, 1000)
    } else {
      markLessonComplete()
    }
  }

  const handleQuizComplete = async (score) => {
    await markLessonComplete()
    const nextLesson = getNextLesson()
    if (nextLesson) {
      setTimeout(() => {
        loadLesson(nextLesson)
      }, 2000)
    }
  }

  const markLessonComplete = async () => {
    if (!profile?.id || !currentLesson?.id) return

    try {
      await supabase
        .from('lesson_progress')
        .upsert({
          user_id: profile.id,
          lesson_id: currentLesson.id,
          is_completed: true,
          completed_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,lesson_id'
        })

      setProgress({
        ...progress,
        [currentLesson.id]: { completed: true }
      })
    } catch (error) {
      console.error('Error marking lesson complete:', error)
    }
  }

  const getNextLesson = () => {
    let found = false
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (found) return lesson
        if (lesson.id === currentLesson?.id) found = true
      }
    }
    return null
  }

  const getPreviousLesson = () => {
    let previous = null
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (lesson.id === currentLesson?.id) return previous
        previous = lesson
      }
    }
    return null
  }

  const handleNextLesson = () => {
    const next = getNextLesson()
    if (next) loadLesson(next)
  }

  const handlePreviousLesson = () => {
    const previous = getPreviousLesson()
    if (previous) loadLesson(previous)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Course Not Found</h2>
          <button onClick={() => navigate('/courses')} className="btn-primary">
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const completedLessons = Object.values(progress).filter(p => p.completed).length
  const courseProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="min-h-screen bg-neutral-gray py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-secondary hover:underline mb-4 flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">{course.title}</h1>
              <p className="text-gray-600">{course.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Course Progress</div>
              <div className="text-3xl font-bold text-primary">{courseProgress}%</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${courseProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="card mb-6">
              {currentLesson && (
                <>
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    {currentLesson.title}
                  </h2>

                  {!showQuiz ? (
                    <>
                      {currentLesson.video_url ? (
                        <AdvancedVideoPlayer
                          videoUrl={currentLesson.video_url}
                          videoType={currentLesson.video_type || 'video/mp4'}
                          title={currentLesson.title}
                          onComplete={handleVideoComplete}
                          className="mb-6"
                        />
                      ) : currentLesson.content_url?.includes('youtube') ? (
                        <AdvancedVideoPlayer
                          youtubeId={currentLesson.content_url.split('/').pop()}
                          title={currentLesson.title}
                          onComplete={handleVideoComplete}
                          className="mb-6"
                        />
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-6">
                          <div className="text-center">
                            <Book className="text-primary mx-auto mb-4" size={64} />
                            <p className="text-gray-600">Text-based lesson content</p>
                          </div>
                        </div>
                      )}

                      {currentLesson.content && (
                        <div className="prose max-w-none mb-6">
                          <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                        </div>
                      )}

                      {videoCompleted && quizData && quizData.length > 0 && (
                        <div className="bg-gradient-to-r from-accent-yellow/10 to-secondary/10 border-2 border-secondary/20 rounded-lg p-6 text-center">
                          <Award className="text-secondary mx-auto mb-4" size={48} />
                          <h3 className="text-2xl font-bold text-primary mb-2">
                            Ready for the Quiz?
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Test your knowledge and earn your completion badge!
                          </p>
                          <button
                            onClick={() => setShowQuiz(true)}
                            className="btn-primary text-lg"
                          >
                            Start Quiz
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <QuizSystem
                      lessonId={currentLesson.id}
                      questions={quizData}
                      passingScore={70}
                      onComplete={handleQuizComplete}
                      allowRetake={true}
                    />
                  )}
                </>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePreviousLesson}
                disabled={!getPreviousLesson()}
                className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="inline mr-2" size={20} />
                Previous Lesson
              </button>
              <button
                onClick={handleNextLesson}
                disabled={!getNextLesson()}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Lesson
                <ChevronRight className="inline ml-2" size={20} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-4">Course Content</h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {modules.map((module, moduleIndex) => (
                  <div key={module.id || moduleIndex}>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">
                        {moduleIndex + 1}
                      </span>
                      {module.title}
                    </h4>
                    <div className="space-y-2 ml-8">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isCompleted = progress[lesson.id]?.completed
                        const isCurrent = currentLesson?.id === lesson.id
                        return (
                          <button
                            key={lesson.id || lessonIndex}
                            onClick={() => loadLesson(lesson)}
                            className={`w-full text-left p-2 rounded-lg flex items-center gap-2 transition-all ${
                              isCurrent
                                ? 'bg-primary text-white'
                                : isCompleted
                                ? 'bg-accent-green/10 text-accent-green hover:bg-accent-green/20'
                                : 'hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle size={16} className="flex-shrink-0" />
                            ) : isCurrent ? (
                              <PlayCircle size={16} className="flex-shrink-0" />
                            ) : (
                              <Circle size={16} className="flex-shrink-0" />
                            )}
                            <span className="text-sm flex-1">{lesson.title}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
