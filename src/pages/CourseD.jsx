import { useParams, Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { curriculumData, getProgress, saveProgress } from "@/data/curriculumData";
import { ChevronLeft, Play, FileText, BookOpen, HelpCircle, CheckCircle2, Circle, MessageSquare } from "lucide-react";
import { useState, useMemo } from "react";

const typeIcons = {
  video: Play,
  text: FileText,
  pdf: BookOpen,
  quiz: HelpCircle,
};

function transformCurriculumToCourse(curriculumCourse, progressData) {
  const completedIds = new Set(progressData.completedLessonIds || []);
  const modules = curriculumCourse.weeks.map((week, wi) => ({
    id: `m${wi + 1}`,
    title: week.title,
    lessons: week.topics.map((topic, ti) => {
      const lid = `l${wi}-${ti}`;
      return {
        id: lid,
        title: topic,
        type: "video",
        duration: "15 min",
        completed: completedIds.has(lid),
      };
    }),
  }));

  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);
  const completedLessons = modules.reduce((a, m) => a + m.lessons.filter((l) => l.completed).length, 0);
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return {
    id: curriculumCourse.id,
    title: curriculumCourse.title,
    description: curriculumCourse.description,
    instructor: curriculumCourse.instructor || "iKPACE Expert",
    category: curriculumCourse.category || "Professional",
    thumbnail: curriculumCourse.image,
    totalLessons,
    completedLessons,
    progress,
    modules,
  };
}

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const curriculumCourse = curriculumData[courseId];
  const [progressVersion, setProgressVersion] = useState(0);
  const progressData = getProgress(courseId);
  const [activeLesson, setActiveLesson] = useState(null);

  const course = useMemo(() => {
    if (!curriculumCourse) return null;
    return transformCurriculumToCourse(curriculumCourse, progressData);
  }, [curriculumCourse, progressData, progressVersion]);

  const toggleLessonComplete = (lessonId) => {
    const ids = progressData.completedLessonIds || [];
    const set = new Set(ids);
    if (set.has(lessonId)) {
      set.delete(lessonId);
    } else {
      set.add(lessonId);
    }
    saveProgress(courseId, { completedLessonIds: [...set] });
    setProgressVersion((v) => v + 1);
  };

  if (!course) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-gray-600">Course not found.</p>
          <Link to="/student-dashboard" className="text-orange-600 hover:underline font-medium">
            ← Back to Dashboard
          </Link>
          <button onClick={() => navigate("/courses")} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Browse Courses
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const currentLesson = course.modules.flatMap((m) => m.lessons).find((l) => l.id === activeLesson);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/student-dashboard" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" /> Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow">
              {activeLesson && currentLesson ? (
                <div>
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-3">
                        <Play className="h-7 w-7 text-white ml-1" />
                      </div>
                      <p className="text-gray-600 text-sm">Video: {currentLesson.title}</p>
                      <button
                        onClick={() => toggleLessonComplete(currentLesson.id)}
                        className="mt-4 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600"
                      >
                        {currentLesson.completed ? "✓ Marked Complete" : "Mark as Complete"}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900">{currentLesson.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{currentLesson.duration} · {currentLesson.type}</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video relative">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-3 cursor-pointer hover:scale-105 transition-transform">
                        <Play className="h-7 w-7 text-white ml-1" />
                      </div>
                      <p className="text-white font-medium">Select a lesson to begin</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{course.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">Instructor: <strong className="text-gray-900">{course.instructor}</strong></span>
                <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 text-xs font-medium">{course.category}</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">{course.completedLessons}/{course.totalLessons} lessons completed</span>
                  <span className="font-semibold text-orange-600">{course.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-orange-500" />
                Discussion Board
              </h3>
              <div className="space-y-3">
                {[
                  { user: "Student A", message: "Great course! Very helpful content.", time: "3h ago", replies: 2 },
                  { user: "Student B", message: "Looking forward to the next lesson.", time: "1d ago", replies: 1 },
                ].map((d, i) => (
                  <div key={i} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{d.user}</span>
                      <span className="text-xs text-gray-500">{d.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{d.message}</p>
                    <button className="text-xs text-orange-600 mt-2 hover:underline">{d.replies} replies</button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Add to the discussion..."
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                />
                <button className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors">
                  Post
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Course Content</h3>
                <p className="text-xs text-gray-500 mt-0.5">{course.totalLessons} lessons</p>
              </div>
              <div className="divide-y divide-gray-200">
                {course.modules.map((module) => (
                  <div key={module.id}>
                    <div className="px-4 py-3 bg-gray-50">
                      <h4 className="text-sm font-semibold text-gray-900">{module.title}</h4>
                    </div>
                    <div>
                      {module.lessons.map((lesson) => {
                        const Icon = typeIcons[lesson.type];
                        const isActive = activeLesson === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson.id)}
                            className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm transition-colors ${
                              isActive ? "bg-orange-50 border-l-2 border-orange-500" : "hover:bg-gray-50"
                            }`}
                          >
                            {lesson.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-gray-400 shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`truncate ${isActive ? "text-orange-600 font-medium" : "text-gray-900"}`}>
                                {lesson.title}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Icon className="h-3 w-3" /> {lesson.duration}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
