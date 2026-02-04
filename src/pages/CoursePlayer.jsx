import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { ChevronLeft, ChevronRight, CheckCircle, Circle, PlayCircle, FileText, Award, Sparkles } from 'lucide-react'

export default function CoursePlayer() {
  const { courseId } = useParams()
  const { profile } = useAuth()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [currentLesson, setCurrentLesson] = useState(null)
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  useEffect(() => {
    fetchCourseData()
  }, [courseId])

  const fetchCourseData = async () => {
    try {
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single()

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
          setModules(modulesData)
          if (modulesData[0]?.lessons?.[0]) {
            setCurrentLesson(modulesData[0].lessons[0])
          }
        }

        const { data: progressData } = await supabase
          .from('lesson_progress')
          .select('lesson_id, is_completed')
          .eq('user_id', profile.id)

        const progressMap = {}
        progressData?.forEach(p => {
          progressMap[p.lesson_id] = p.is_completed
        })
        setProgress(progressMap)
      } else {
        const mockData = createMockCourseData()
        setCourse(mockData.course)
        setModules(mockData.modules)
        if (mockData.modules[0]?.lessons?.[0]) {
          setCurrentLesson(mockData.modules[0].lessons[0])
        }
      }
    } catch (error) {
      console.error('Error fetching course:', error)
      const mockData = createMockCourseData()
      setCourse(mockData.course)
      setModules(mockData.modules)
      if (mockData.modules[0]?.lessons?.[0]) {
        setCurrentLesson(mockData.modules[0].lessons[0])
      }
    } finally {
      setLoading(false)
    }
  }

  const createMockCourseData = () => ({
    course: {
      id: courseId,
      title: 'Information Technology Fundamentals',
      description: 'Master the basics of IT'
    },
    modules: [
      {
        id: '1',
        title: 'Introduction to IT',
        order_index: 0,
        lessons: [
          {
            id: '1',
            title: 'Welcome to IT Fundamentals',
            content_type: 'video',
            content_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content_text: null,
            order_index: 0
          },
          {
            id: '2',
            title: 'What is Information Technology?',
            content_type: 'text',
            content_url: null,
            content_text: `
# What is Information Technology?

Information Technology (IT) is the use of computers, storage, networking, and other physical devices to create, process, store, secure, and exchange electronic data.

## Key Areas of IT:

1. **Hardware**: Physical components like computers, servers, and networking equipment
2. **Software**: Programs and applications that run on hardware
3. **Networks**: Systems that connect computers and allow communication
4. **Data Management**: Storing, organizing, and securing information
5. **Cybersecurity**: Protecting systems and data from threats

## Why Learn IT?

- High demand for IT professionals
- Excellent career opportunities
- Work from anywhere
- Continuous learning and growth
- Make a real impact

In this course, you'll learn all these fundamentals and more!
            `,
            order_index: 1
          },
          {
            id: '3',
            title: 'Career Paths in IT',
            content_type: 'text',
            content_url: null,
            content_text: `
# Career Paths in Information Technology

The IT field offers diverse career opportunities for all skill levels.

## Popular IT Career Paths:

### 1. Help Desk Support
- Entry-level position
- Assist users with technical issues
- Average salary: $40,000 - $55,000

### 2. Network Administrator
- Manage computer networks
- Ensure network security
- Average salary: $60,000 - $85,000

### 3. Systems Administrator
- Maintain servers and systems
- Handle backups and updates
- Average salary: $65,000 - $95,000

### 4. Cybersecurity Analyst
- Protect against cyber threats
- Monitor security systems
- Average salary: $75,000 - $110,000

### 5. Cloud Engineer
- Manage cloud infrastructure
- Work with AWS, Azure, Google Cloud
- Average salary: $90,000 - $140,000

Start your journey today!
            `,
            order_index: 2
          }
        ]
      },
      {
        id: '2',
        title: 'Computer Hardware',
        order_index: 1,
        lessons: [
          {
            id: '4',
            title: 'Understanding Computer Components',
            content_type: 'text',
            content_url: null,
            content_text: `
# Computer Hardware Components

Learn about the physical parts that make up a computer.

## Main Components:

1. **CPU (Central Processing Unit)**: The brain of the computer
2. **RAM (Random Access Memory)**: Temporary storage for running programs
3. **Storage (HDD/SSD)**: Permanent data storage
4. **Motherboard**: Connects all components
5. **Power Supply**: Provides electricity
6. **Graphics Card**: Handles visual output

Understanding these components is essential for IT professionals!
            `,
            order_index: 0
          }
        ]
      }
    ]
  })

  const markLessonComplete = async (lessonId) => {
    try {
      await supabase
        .from('lesson_progress')
        .upsert({
          user_id: profile.id,
          lesson_id: lessonId,
          is_completed: true,
          completed_at: new Date().toISOString()
        })

      setProgress(prev => ({ ...prev, [lessonId]: true }))

      const allLessons = modules.flatMap(m => m.lessons)
      const completedCount = Object.values({ ...progress, [lessonId]: true }).filter(Boolean).length
      const progressPercentage = (completedCount / allLessons.length) * 100

      await supabase
        .from('enrollments')
        .update({ progress_percentage: progressPercentage })
        .eq('user_id', profile.id)
        .eq('course_id', courseId)

    } catch (error) {
      console.error('Error marking lesson complete:', error)
      setProgress(prev => ({ ...prev, [lessonId]: true }))
    }
  }

  const getNextLesson = () => {
    const allLessons = modules.flatMap(m => m.lessons)
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id)
    return allLessons[currentIndex + 1] || null
  }

  const getPreviousLesson = () => {
    const allLessons = modules.flatMap(m => m.lessons)
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id)
    return allLessons[currentIndex - 1] || null
  }

  const calculateProgress = () => {
    const allLessons = modules.flatMap(m => m.lessons)
    const completed = Object.values(progress).filter(Boolean).length
    return allLessons.length > 0 ? (completed / allLessons.length) * 100 : 0
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-gray flex">
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary mb-2">{course?.title}</h2>
          <div className="mb-2">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>Course Progress</span>
              <span className="font-semibold">{Math.round(calculateProgress())}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${calculateProgress()}%` }}></div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {modules.map((module) => (
            <div key={module.id} className="mb-4">
              <h3 className="font-semibold text-primary mb-2 px-2">{module.title}</h3>
              <div className="space-y-1">
                {module.lessons?.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLesson(lesson)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                      currentLesson?.id === lesson.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="mr-3">
                      {progress[lesson.id] ? (
                        <CheckCircle size={18} className="text-accent-green" />
                      ) : (
                        <Circle size={18} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{lesson.title}</div>
                      <div className="flex items-center text-xs opacity-75 mt-1">
                        {lesson.content_type === 'video' ? (
                          <PlayCircle size={12} className="mr-1" />
                        ) : (
                          <FileText size={12} className="mr-1" />
                        )}
                        <span className="capitalize">{lesson.content_type}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          {currentLesson && (
            <>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-primary mb-2">{currentLesson.title}</h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    {currentLesson.content_type === 'video' ? (
                      <PlayCircle size={20} className="mr-2" />
                    ) : (
                      <FileText size={20} className="mr-2" />
                    )}
                    <span className="capitalize">{currentLesson.content_type} Lesson</span>
                  </div>
                  <button
                    onClick={() => setShowAIAssistant(!showAIAssistant)}
                    className="flex items-center text-secondary hover:underline"
                  >
                    <Sparkles size={20} className="mr-2" />
                    AI Assistant
                  </button>
                </div>
              </div>

              <div className="card mb-8">
                {currentLesson.content_type === 'video' && currentLesson.content_url && (
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                    <iframe
                      src={currentLesson.content_url}
                      className="w-full h-full"
                      allowFullScreen
                      title={currentLesson.title}
                    />
                  </div>
                )}

                {currentLesson.content_type === 'text' && currentLesson.content_text && (
                  <div className="prose max-w-none">
                    <div
                      className="text-gray-700 leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: currentLesson.content_text.replace(/\n/g, '<br />') }}
                    />
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  {!progress[currentLesson.id] && (
                    <button
                      onClick={() => markLessonComplete(currentLesson.id)}
                      className="btn-primary mb-4"
                    >
                      <CheckCircle size={20} className="inline mr-2" />
                      Mark as Complete
                    </button>
                  )}

                  {progress[currentLesson.id] && (
                    <div className="flex items-center text-accent-green mb-4">
                      <CheckCircle size={24} className="mr-2" />
                      <span className="font-semibold">Lesson Completed!</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        const prev = getPreviousLesson()
                        if (prev) setCurrentLesson(prev)
                      }}
                      disabled={!getPreviousLesson()}
                      className="flex items-center text-primary hover:underline disabled:text-gray-400 disabled:no-underline"
                    >
                      <ChevronLeft size={20} className="mr-1" />
                      Previous Lesson
                    </button>

                    <button
                      onClick={() => {
                        const next = getNextLesson()
                        if (next) setCurrentLesson(next)
                      }}
                      disabled={!getNextLesson()}
                      className="flex items-center text-primary hover:underline disabled:text-gray-400 disabled:no-underline"
                    >
                      Next Lesson
                      <ChevronRight size={20} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {calculateProgress() === 100 && (
                <div className="card bg-gradient-to-br from-accent-green/10 to-accent-yellow/10 border-accent-green text-center">
                  <Award size={48} className="mx-auto text-accent-green mb-4" />
                  <h3 className="text-2xl font-bold text-primary mb-2">Course Completed!</h3>
                  <p className="text-gray-600 mb-4">
                    Congratulations! You've completed all lessons in this course.
                  </p>
                  <button className="btn-primary">
                    Get Your Certificate
                  </button>
                </div>
              )}
            </>
          )}

          {showAIAssistant && (
            <div className="card mt-8 bg-secondary/5 border-secondary">
              <div className="flex items-center mb-4">
                <Sparkles className="text-secondary mr-2" size={24} />
                <h3 className="text-xl font-bold text-primary">AI Learning Assistant</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Ask me anything about this lesson, request practice questions, or get explanations!
              </p>
              <textarea
                className="input-field mb-4"
                rows="4"
                placeholder="E.g., 'Explain this topic in simpler terms' or 'Generate practice questions'"
              />
              <button className="btn-secondary">
                Ask AI
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
