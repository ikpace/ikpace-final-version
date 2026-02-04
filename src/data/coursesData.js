// Comprehensive course data for iKPACE platform
export const coursesData = {
  'it-fundamentals': {
    id: '1',
    slug: 'it-fundamentals',
    title: 'Information Technology Fundamentals',
    description: 'Master the basics of IT including hardware, software, networking, and troubleshooting. Perfect for beginners looking to start a career in technology.',
    price: 7.00,
    duration_weeks: 4,
    level: 'beginner',
    thumbnail_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    enrollment_count: 1247,
    is_published: true,
    full_description: 'This comprehensive course covers everything you need to know to start your IT career. You will learn about computer hardware, operating systems, networking basics, cybersecurity fundamentals, and troubleshooting techniques. By the end of this course, you will have the confidence to pursue IT certifications and entry-level IT positions.',
    what_you_learn: [
      'Understanding computer hardware and components',
      'Operating system fundamentals (Windows, Linux basics)',
      'Networking concepts and protocols',
      'Basic troubleshooting and problem-solving',
      'Introduction to cybersecurity',
      'IT career paths and certifications'
    ],
    modules: [
      { title: 'Introduction to IT', lessons: 5 },
      { title: 'Computer Hardware', lessons: 6 },
      { title: 'Operating Systems', lessons: 7 },
      { title: 'Networking Basics', lessons: 8 },
      { title: 'Security Fundamentals', lessons: 5 },
      { title: 'Career Development', lessons: 4 }
    ]
  },
  'data-analysis': {
    id: '2',
    slug: 'data-analysis',
    title: 'Data Analysis with Excel & Python',
    description: 'Learn data analysis from scratch with Excel, Power BI intro, and Python basics. Transform raw data into actionable insights.',
    price: 7.00,
    duration_weeks: 6,
    level: 'beginner',
    thumbnail_url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    enrollment_count: 2134,
    is_published: true,
    full_description: 'Become a data analyst and unlock the power of data. This course teaches you how to collect, clean, analyze, and visualize data using industry-standard tools. You will work with real datasets and create professional reports that drive business decisions.',
    what_you_learn: [
      'Excel formulas and functions for data analysis',
      'Creating charts and visualizations',
      'Introduction to Power BI',
      'Python basics for data analysis',
      'Data cleaning and preparation',
      'Statistical analysis fundamentals'
    ],
    modules: [
      { title: 'Excel Fundamentals', lessons: 8 },
      { title: 'Advanced Excel Techniques', lessons: 7 },
      { title: 'Data Visualization', lessons: 6 },
      { title: 'Introduction to Power BI', lessons: 5 },
      { title: 'Python for Data Analysis', lessons: 9 },
      { title: 'Real-World Projects', lessons: 6 }
    ]
  },
  'cybersecurity': {
    id: '3',
    slug: 'cybersecurity',
    title: 'Cybersecurity Fundamentals',
    description: 'Understand cyber threats, security principles, and how to protect systems. Start your journey in the high-demand cybersecurity field.',
    price: 7.00,
    duration_weeks: 6,
    level: 'beginner',
    thumbnail_url: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    enrollment_count: 986,
    is_published: true,
    full_description: 'Dive into the world of cybersecurity and learn how to protect digital assets. This course covers fundamental security concepts, common threats, security tools, and best practices for keeping systems and data safe.',
    what_you_learn: [
      'Understanding cyber threats and vulnerabilities',
      'Network security fundamentals',
      'Security tools and technologies',
      'Incident response basics',
      'Ethical hacking concepts',
      'Security certifications path (CompTIA Security+, CEH)'
    ],
    modules: [
      { title: 'Introduction to Cybersecurity', lessons: 6 },
      { title: 'Network Security', lessons: 8 },
      { title: 'Application Security', lessons: 7 },
      { title: 'Security Tools', lessons: 6 },
      { title: 'Incident Response', lessons: 5 },
      { title: 'Career in Cybersecurity', lessons: 4 }
    ]
  },
  'virtual-assistant': {
    id: '4',
    slug: 'virtual-assistant',
    title: 'Virtual Assistant Mastery',
    description: 'Learn administrative skills, time management, and tools to become a successful virtual assistant. Work from anywhere!',
    price: 7.00,
    duration_weeks: 4,
    level: 'beginner',
    thumbnail_url: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
    enrollment_count: 1532,
    is_published: true,
    full_description: 'Become a highly sought-after virtual assistant. Learn essential administrative skills, master productivity tools, and discover how to attract and retain clients in the booming remote work market.',
    what_you_learn: [
      'Administrative task management',
      'Email and calendar management',
      'Project management tools (Asana, Trello)',
      'Communication best practices',
      'Time management and productivity',
      'Finding clients and building your VA business'
    ],
    modules: [
      { title: 'Introduction to Virtual Assistance', lessons: 5 },
      { title: 'Administrative Skills', lessons: 7 },
      { title: 'Essential Tools & Software', lessons: 6 },
      { title: 'Client Management', lessons: 5 },
      { title: 'Building Your VA Business', lessons: 6 }
    ]
  },
  'content-creation': {
    id: '5',
    slug: 'content-creation',
    title: 'Content Creation & Marketing',
    description: 'Master content creation for social media, blogs, and digital platforms. Build your personal brand and grow your audience.',
    price: 7.00,
    duration_weeks: 4,
    level: 'beginner',
    thumbnail_url: 'https://images.pexels.com/photos/3153204/pexels-photo-3153204.jpeg?auto=compress&cs=tinysrgb&w=800',
    enrollment_count: 1876,
    is_published: true,
    full_description: 'Learn to create engaging content that captivates audiences across all platforms. From writing compelling copy to producing videos and graphics, this course covers everything you need to become a content creator.',
    what_you_learn: [
      'Content strategy and planning',
      'Copywriting for different platforms',
      'Video creation and editing basics',
      'Social media marketing',
      'Building and growing your audience',
      'Monetization strategies'
    ],
    modules: [
      { title: 'Content Strategy', lessons: 5 },
      { title: 'Writing for Digital Platforms', lessons: 7 },
      { title: 'Visual Content Creation', lessons: 6 },
      { title: 'Social Media Marketing', lessons: 8 },
      { title: 'Audience Growth', lessons: 5 }
    ]
  },
  'graphic-design': {
    id: '6',
    slug: 'graphic-design',
    title: 'Graphic Design Essentials',
    description: 'Learn design principles, tools like Canva and Photoshop basics, and create stunning visuals for any project.',
    price: 7.00,
    duration_weeks: 6,
    level: 'beginner',
    thumbnail_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    enrollment_count: 2341,
    is_published: true,
    full_description: 'Master the art of graphic design from scratch. Learn fundamental design principles, color theory, typography, and how to use professional tools to create eye-catching designs for print and digital media.',
    what_you_learn: [
      'Design principles and theory',
      'Color theory and typography',
      'Adobe Photoshop basics',
      'Canva for quick designs',
      'Logo design fundamentals',
      'Building your design portfolio'
    ],
    modules: [
      { title: 'Design Fundamentals', lessons: 6 },
      { title: 'Color & Typography', lessons: 5 },
      { title: 'Adobe Photoshop Basics', lessons: 8 },
      { title: 'Canva Mastery', lessons: 6 },
      { title: 'Logo Design', lessons: 7 },
      { title: 'Portfolio Development', lessons: 5 }
    ]
  },
  'ai-animation': {
    id: '7',
    slug: 'ai-animation',
    title: 'AI Animation & Video Creation',
    description: 'Create animations and videos using AI tools. Perfect for content creators and marketers looking to level up.',
    price: 7.00,
    duration_weeks: 4,
    level: 'beginner',
    thumbnail_url: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800',
    enrollment_count: 1654,
    is_published: true,
    full_description: 'Harness the power of AI to create stunning animations and videos. Learn to use cutting-edge AI tools for video editing, animation, and content production without extensive technical skills.',
    what_you_learn: [
      'AI video generation tools',
      'Animation fundamentals',
      'AI-powered video editing',
      'Text-to-video creation',
      'Motion graphics with AI',
      'Creating viral video content'
    ],
    modules: [
      { title: 'Introduction to AI Video Tools', lessons: 5 },
      { title: 'Animation Basics', lessons: 6 },
      { title: 'AI Video Editing', lessons: 7 },
      { title: 'Motion Graphics', lessons: 6 },
      { title: 'Creating Viral Content', lessons: 5 }
    ]
  },
  'freelancing': {
    id: '8',
    slug: 'freelancing',
    title: 'Freelancing Success Blueprint',
    description: 'Learn how to find clients on Upwork, Fiverr, and succeed as a freelancer. Build a thriving remote career.',
    price: 7.00,
    duration_weeks: 4,
    level: 'beginner',
    thumbnail_url: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
    enrollment_count: 1923,
    is_published: true,
    full_description: 'Launch and grow your freelancing career. This course teaches you how to find clients, set competitive rates, deliver exceptional work, and build a sustainable freelance business on platforms like Upwork and Fiverr.',
    what_you_learn: [
      'Setting up winning profiles on Upwork & Fiverr',
      'Writing proposals that get responses',
      'Pricing your services correctly',
      'Managing client relationships',
      'Scaling your freelance business',
      'Financial management for freelancers'
    ],
    modules: [
      { title: 'Getting Started with Freelancing', lessons: 6 },
      { title: 'Platform Mastery (Upwork/Fiverr)', lessons: 8 },
      { title: 'Winning Clients', lessons: 7 },
      { title: 'Delivering Excellence', lessons: 5 },
      { title: 'Scaling Your Business', lessons: 6 }
    ]
  },
  'digital-entrepreneurship': {
    id: '9',
    slug: 'digital-entrepreneurship',
    title: 'Digital Entrepreneurship',
    description: 'Start and grow your online business. Learn digital marketing, e-commerce, and strategies for success.',
    price: 7.00,
    duration_weeks: 4,
    level: 'beginner',
    thumbnail_url: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    enrollment_count: 1445,
    is_published: true,
    full_description: 'Transform your business idea into reality. Learn how to start, launch, and grow a successful online business. Cover digital marketing, e-commerce, social media strategy, and building sustainable revenue streams.',
    what_you_learn: [
      'Identifying profitable business ideas',
      'Building an online presence',
      'Digital marketing strategies',
      'E-commerce fundamentals',
      'Social media for business',
      'Scaling and automation'
    ],
    modules: [
      { title: 'Entrepreneurship Mindset', lessons: 5 },
      { title: 'Business Planning', lessons: 6 },
      { title: 'Digital Marketing', lessons: 8 },
      { title: 'E-commerce Setup', lessons: 7 },
      { title: 'Growth & Scaling', lessons: 6 }
    ]
  }
}

export const getAllCourses = () => Object.values(coursesData)

export const getCourseBySlug = (slug) => coursesData[slug] || null
