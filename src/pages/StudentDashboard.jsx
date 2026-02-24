import { useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsOverview } from "@/components/StatsOverview";
import { CourseCard } from "@/components/CourseCard";
import { AssignmentsList } from "@/components/AssignmentsList";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { CertificatesSection } from "@/components/CertificatesSection";
import { curriculumData, getEnrollments, getProgress, saveProgress } from "@/data/curriculumData";

const Index = () => {
  const location = useLocation();
  const coursesRef = useRef(null);
  const assignmentsRef = useRef(null);
  const certificatesRef = useRef(null);

  const enrolledCourses = useMemo(() => {
    const enrollments = getEnrollments();
    const ids = [...new Set(enrollments.map((e) => e.courseId))];

    const fromState = location.state?.course?.id;
    if (fromState && !ids.includes(fromState)) {
      ids.unshift(fromState);
    }

    return ids
      .map((courseId) => {
        const c = curriculumData[courseId];
        if (!c) return null;

        const totalLessons = c.weeks.reduce((sum, w) => sum + w.topics.length, 0);
        const progress = getProgress(courseId) || {};
        const completedLessons = (progress.completedLessonIds || []).length;
        const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        // When a course is fully completed for the first time, persist a completion timestamp.
        if (totalLessons > 0 && completedLessons === totalLessons && !progress.completedAt) {
          saveProgress(courseId, {
            ...progress,
            completedLessonIds: progress.completedLessonIds || [],
            completedAt: new Date().toISOString(),
          });
        }

        return {
          id: courseId,
          title: c.title,
          instructor: c.instructor || "iKPACE Expert",
          progress: progressPercent,
          totalLessons,
          completedLessons,
          thumbnail: c.image,
          category: c.category || "Professional",
          completedAt: progress.completedAt || null,
        };
      })
      .filter(Boolean);
  }, [location.state?.course?.id]);

  const completedCourses = useMemo(
    () => enrolledCourses.filter((course) => course.progress === 100),
    [enrolledCourses]
  );

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (!hash) return;

    const sectionMap = {
      courses: coursesRef,
      assignments: assignmentsRef,
      notifications: assignmentsRef,
      discussions: assignmentsRef,
      certificates: certificatesRef,
    };

    const targetRef = sectionMap[hash];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h1>
          <p className="text-gray-600 mt-1">Continue where you left off.</p>
        </div>
        <StatsOverview enrolledCourses={enrolledCourses} />
        <section ref={coursesRef}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
            <Link to="/courses" className="text-sm font-medium text-orange-600 hover:underline">
              Browse Courses
            </Link>
          </div>
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow p-12 text-center">
              <p className="text-gray-600 mb-4">You haven&apos;t enrolled in any courses yet.</p>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </section>
        <div ref={assignmentsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AssignmentsList />
          <NotificationsPanel />
        </div>
        <div ref={certificatesRef}>
          <CertificatesSection completedCourses={completedCourses} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
