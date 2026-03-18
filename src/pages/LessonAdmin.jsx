// src/pages/LessonAdmin.jsx
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function LessonAdmin() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // Form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [assignment, setAssignment] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [orderIndex, setOrderIndex] = useState("1");

  // Load courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Load lessons when course is selected
  useEffect(() => {
    if (selectedCourseId) {
      fetchLessons(selectedCourseId);
    } else {
      setLessons([]);
    }
  }, [selectedCourseId]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .order('title');

      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setLessons(data || []);
    } catch (err) {
      console.error("Error fetching lessons:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    
    if (!selectedCourseId) {
      setMessage("Please select a course first");
      return;
    }

    try {
      const { error } = await supabase
        .from('lessons')
        .insert([{
          course_id: selectedCourseId,
          title: title,
          lesson_content: content,
          assignment: assignment,
          video_url: videoUrl,
          order_index: parseInt(orderIndex)
        }]);

      if (error) throw error;

      setMessage("Lesson added successfully!");
      // Clear form
      setTitle("");
      setContent("");
      setAssignment("");
      setVideoUrl("");
      setOrderIndex("1");
      
      // Refresh lessons
      fetchLessons(selectedCourseId);
    } catch (err) {
      console.error("Error adding lesson:", err);
      setMessage("Error adding lesson: " + err.message);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;

    try {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId);

      if (error) throw error;

      setMessage("Lesson deleted successfully");
      fetchLessons(selectedCourseId);
    } catch (err) {
      console.error("Error deleting lesson:", err);
      setMessage("Error deleting lesson: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Lesson Admin</h1>

        {/* Course Selection */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Course
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">-- Choose a course --</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {selectedCourseId && (
          <>
            {/* Add Lesson Form */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Lesson</h2>
              
              {message && (
                <div className={`p-3 rounded-lg mb-4 ${
                  message.includes("success") 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleAddLesson} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lesson Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows="4"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assignment
                  </label>
                  <textarea
                    value={assignment}
                    onChange={(e) => setAssignment(e.target.value)}
                    required
                    rows="3"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video URL
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Index (Week Number)
                  </label>
                  <input
                    type="number"
                    value={orderIndex}
                    onChange={(e) => setOrderIndex(e.target.value)}
                    required
                    min="1"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Lesson
                </button>
              </form>
            </div>

            {/* Existing Lessons for Selected Course */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Lessons for {courses.find(c => c.id === selectedCourseId)?.title}
              </h2>
              
              {loading ? (
                <p>Loading lessons...</p>
              ) : lessons.length === 0 ? (
                <p className="text-gray-500">No lessons for this course yet.</p>
              ) : (
                <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <div key={lesson.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold">
                            Week {lesson.order_index}: {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {lesson.lesson_content}
                          </p>
                          {lesson.assignment && (
                            <div className="mt-2 p-2 bg-yellow-50 rounded">
                              <span className="font-medium">Assignment:</span> {lesson.assignment}
                            </div>
                          )}
                          {lesson.video_url && (
                            <div className="mt-2">
                              <a 
                                href={lesson.video_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Watch Video
                              </a>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}