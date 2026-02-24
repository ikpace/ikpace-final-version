// Shared curriculum data for CourseCurriculum, Index (Student Dashboard), and CourseD
// Course IDs must match Checkout's getSampleCourse and payment flow

export const curriculumData = {
  'virtual-assistant-pro': {
    id: 'virtual-assistant-pro',
    title: 'Virtual Assistant Professional',
    subtitle: 'Launch your remote VA career in 6 weeks',
    duration: '6 Weeks',
    format: '2–3 classes per week',
    students: 1845,
    rating: 4.8,
    color: 'from-[#7C4DFF] to-[#448AFF]',
    accentColor: '#7C4DFF',
    
    icon: '💼',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlydHVhbCUyMGFzc2lzdGFudHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'This comprehensive 6-week program covers everything you need to become a professional virtual assistant. From communication mastery to client acquisition strategies.',
    instructor: 'Amara Osei - VA Business Coach',
    category: 'Professional',
    weeks: [
      { title: 'Week 1: Introduction to Virtual Assistance', topics: ['What is a Virtual Assistant?', 'Types of VA services', 'Work ethics & professionalism'], icon: '📋' },
      { title: 'Week 2: Communication & Email Management', topics: ['Professional email writing', 'Calendar management', 'Scheduling tools (Google Calendar)'], icon: '📧' },
      { title: 'Week 3: Administrative Tools', topics: ['Google Workspace', 'Document organization', 'File management systems'], icon: '🛠️' },
      { title: 'Week 4: Social Media Assistance', topics: ['Content scheduling', 'Basic engagement management', 'Using scheduling tools'], icon: '📱' },
      { title: 'Week 5: Client Acquisition', topics: ['Creating a CV & portfolio', 'Freelance platforms overview', 'Pricing your services'], icon: '🤝' },
      { title: 'Week 6: Final Project', topics: ['Create VA portfolio', 'Mock client task', 'Certification'], icon: '🎓' },
    ],
  },
  'social-media-marketing': {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    subtitle: 'Master social media strategy, ads & analytics',
    duration: '6 Weeks',
    format: 'Self-paced with live sessions',
    students: 2156,
    rating: 4.9,
    color: 'from-[#E040FB] to-[#FF4081]',
    accentColor: '#E040FB',
    icon: '📱',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    description: 'This 6-week course takes you from understanding platforms to creating full campaign strategies with paid promotions and analytics.',
    instructor: 'Kofi Asante - Digital Marketing Expert',
    category: 'Marketing',
    weeks: [
      { title: 'Week 1: Social Media Basics', topics: ['Platforms overview', 'Understanding target audience'], icon: '🌐' },
      { title: 'Week 2: Content Creation Strategy', topics: ['Content planning', 'Writing captions', 'Hashtags & trends'], icon: '✍️' },
      { title: 'Week 3: Branding & Positioning', topics: ['Personal brand building', 'Visual consistency'], icon: '🏷️' },
      { title: 'Week 4: Ads & Promotions', topics: ['Introduction to paid ads', 'Boosting posts'], icon: '📣' },
      { title: 'Week 5: Analytics & Growth', topics: ['Insights & engagement tracking', 'Improving performance'], icon: '📊' },
      { title: 'Week 6: Campaign Project', topics: ['Create full campaign plan', 'Present strategy'], icon: '🚀' },
    ],
  },
  'canva-graphic-design': {
    id: 'canva-graphic-design',
    title: 'Canva & Graphic Design',
    subtitle: 'Create stunning visuals & build your design portfolio',
    duration: '4 Weeks',
    format: 'Hands-on design workshops',
    students: 2890,
    rating: 4.8,
    color: 'from-[#00BFA5] to-[#64FFDA]',
    accentColor: '#00BFA5',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
    description: 'Learn design fundamentals, master Canva, and build a professional portfolio with branding projects in just 4 weeks.',
    instructor: 'Esi Darkwah - Graphic Designer',
    category: 'Design',
    weeks: [
      { title: 'Week 1: Design Fundamentals', topics: ['Color theory', 'Fonts & layout'], icon: '🎨' },
      { title: 'Week 2: Canva Mastery', topics: ['Templates', 'Custom designs', 'Background removal'], icon: '✨' },
      { title: 'Week 3: Branding Design', topics: ['Logo basics', 'Flyer & poster design'], icon: '🏢' },
      { title: 'Week 4: Final Portfolio', topics: ['Design social media kit', 'Branding project'], icon: '📁' },
    ],
  },
  'smart-kids-coding': {
    id: 'smart-kids-coding',
    title: 'Smart Kids Coding',
    subtitle: 'Fun coding adventures for ages 6–12',
    duration: '4 Weeks',
    format: 'Interactive kids program',
    students: 1567,
    rating: 4.9,
    color: 'from-[#FF6D00] to-[#FFD600]',
    accentColor: '#FF6D00',
    icon: '👧',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    description: 'Introduce kids ages 6–12 to coding through Scratch! Build animations, stories, and their very own games in a fun 4-week program.',
    instructor: 'Ms. Akosua - Kids Coding Instructor',
    category: 'Kids',
    weeks: [
      { title: 'Week 1: Introduction to Coding', topics: ['What is coding?', 'Scratch basics'], icon: '💻' },
      { title: 'Week 2: Animations & Stories', topics: ['Loops & events', 'Build simple animation'], icon: '🎬' },
      { title: 'Week 3: Game Creation', topics: ['Adding characters', 'Simple scoring system'], icon: '🎮' },
      { title: 'Week 4: Final Game Project', topics: ['Build personal game', 'Presentation & certificate'], icon: '🏆' },
    ],
  },
  'freelancing-online-income': {
    id: 'freelancing-online-income',
    title: 'Freelancing & Online Income',
    subtitle: 'Start earning online in 4 weeks',
    duration: '4 Weeks',
    format: 'Practical business training',
    students: 3210,
    rating: 4.8,
    color: 'from-[#00C853] to-[#B2FF59]',
    accentColor: '#00C853',
    icon: '💰',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlydHVhbCUyMGFzc2lzdGFudHxlbnwwfHwwfHx8MA%3D%3D ',
    description: 'Learn to launch your freelancing career from scratch — create winning profiles, find clients, set pricing, and build a sustainable business.',
    instructor: 'Samuel Ofori - Freelance Business Coach',
    category: 'Business',
    weeks: [
      { title: 'Week 1: Introduction to Freelancing', topics: ['What is freelancing?', 'Popular skills'], icon: '🌟' },
      { title: 'Week 2: Setting Up Online Profile', topics: ['Creating portfolio', 'Writing proposals'], icon: '👤' },
      { title: 'Week 3: Getting Clients', topics: ['Finding jobs', 'Pricing strategy', 'Client communication'], icon: '🤝' },
      { title: 'Week 4: Freelance Business Setup', topics: ['Payment methods', 'Building long-term clients', 'Final profile review'], icon: '🏗️' },
    ],
  },
};

const ENROLLMENTS_KEY = 'ikpace_enrollments';

export function getEnrollments() {
  try {
    return JSON.parse(localStorage.getItem(ENROLLMENTS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addEnrollment(enrollment) {
  const current = getEnrollments();
  const exists = current.some(e => e.courseId === enrollment.courseId && e.enrollmentId === enrollment.enrollmentId);
  if (exists) return;
  const updated = [...current, { ...enrollment, enrolledAt: new Date().toISOString() }];
  localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(updated));
}

export function getProgress(courseId) {
  try {
    const key = `ikpace_progress_${courseId}`;
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

export function saveProgress(courseId, progress) {
  const key = `ikpace_progress_${courseId}`;
  localStorage.setItem(key, JSON.stringify(progress));
}
