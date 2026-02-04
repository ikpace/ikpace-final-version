import { Link } from 'react-router-dom'
import { BookOpen, TrendingUp, Award, Users, Zap, Target, CheckCircle, MessageCircle, Video, Shield, Globe, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Landing() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('enrollment_count', { ascending: false })
      .limit(8)

    if (data) {
      setCourses(data)
    }
  }

  const features = [
    {
      icon: <Zap className="text-secondary" size={32} />,
      title: 'AI-Powered Learning',
      description: 'Get personalized recommendations and adaptive learning paths tailored to your progress'
    },
    {
      icon: <TrendingUp className="text-accent-green" size={32} />,
      title: 'Track Your Progress',
      description: 'Advanced analytics show your learning streaks, time invested, and skill mastery levels'
    },
    {
      icon: <Award className="text-accent-yellow" size={32} />,
      title: 'Earn Certificates',
      description: 'Receive verified certificates upon course completion to showcase your skills'
    },
    {
      icon: <Users className="text-primary" size={32} />,
      title: 'Community Support',
      description: 'Connect with fellow learners, ask questions, and share knowledge in our vibrant community'
    },
    {
      icon: <BookOpen className="text-secondary" size={32} />,
      title: 'Practical Skills',
      description: 'Learn job-ready digital skills with real-world projects and hands-on exercises'
    },
    {
      icon: <Target className="text-accent-green" size={32} />,
      title: 'Career Growth',
      description: 'Build the skills needed for remote work, freelancing, and digital entrepreneurship'
    },
  ]

  const benefits = [
    {
      icon: <Clock className="text-primary" size={28} />,
      title: 'Flexible Learning',
      description: 'Study at your own pace, anytime and anywhere. Perfect for busy professionals.'
    },
    {
      icon: <Video className="text-secondary" size={28} />,
      title: 'HD Video Lessons',
      description: 'High-quality video content with lifetime access to all course materials.'
    },
    {
      icon: <MessageCircle className="text-accent-green" size={28} />,
      title: 'Live Support',
      description: '24/7 chat support and active community forum for all your questions.'
    },
    {
      icon: <Shield className="text-accent-yellow" size={28} />,
      title: 'Verified Certificates',
      description: 'Industry-recognized certificates to boost your resume and LinkedIn profile.'
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Data Analyst',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'iKPACE transformed my career. Within 6 months of completing the Data Analysis course, I landed my dream job!'
    },
    {
      name: 'Michael Chen',
      role: 'Freelance Developer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'The IT Fundamentals course gave me the foundation I needed. Now I am earning $5,000+ monthly as a freelancer.'
    },
    {
      name: 'Amara Okafor',
      role: 'Virtual Assistant',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'The Virtual Assistant course was exactly what I needed. I now work remotely for clients across 3 countries!'
    },
  ]

  const faqs = [
    {
      question: 'How much does each course cost?',
      answer: 'All our courses are priced at just $7 per course, making quality digital education accessible to everyone.'
    },
    {
      question: 'Do I get lifetime access to the courses?',
      answer: 'Yes! Once you enroll in a course, you get lifetime access to all video lessons, materials, and future updates.'
    },
    {
      question: 'Are the courses suitable for beginners?',
      answer: 'Absolutely! All our courses are designed to be beginner-friendly with step-by-step instruction from the ground up.'
    },
    {
      question: 'Will I receive a certificate after completion?',
      answer: 'Yes, you will receive a verified certificate upon successfully completing each course, which you can share on LinkedIn and your resume.'
    },
    {
      question: 'What if I need help during the course?',
      answer: 'We offer 24/7 live chat support, an active community forum, and instructor assistance to help you succeed.'
    },
    {
      question: 'Can I enroll in multiple courses?',
      answer: 'Yes! You can enroll in as many courses as you like. We also offer learning tracks that combine multiple courses for a comprehensive skill development path.'
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="gradient-hero py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Master Digital Skills,<br />
            <span className="text-secondary">Transform Your Career</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join thousands of learners building practical digital skills with AI-powered learning paths,
            expert instruction, and a supportive global community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-secondary text-lg px-8 py-4">
              Start Learning Now - $7/course
            </Link>
            <Link to="/courses" className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              Explore Courses
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold text-secondary">9</div>
              <div className="text-lg">Beginner-Friendly Courses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold text-secondary">$7</div>
              <div className="text-lg">Per Course Per Month</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold text-secondary">4-6</div>
              <div className="text-lg">Weeks Per Course</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Why Choose iKPACE?</h2>
            <p className="text-xl text-gray-600">Next-generation learning platform designed for your success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:scale-105 transition-transform">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-neutral-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-secondary to-accent-yellow text-white px-6 py-2 rounded-full font-bold mb-4">
              MOST POPULAR PROGRAMS
            </div>
            <h2 className="text-4xl font-bold text-primary mb-4">Top-Rated Courses</h2>
            <p className="text-xl text-gray-600">Start with any course - they're all beginner-friendly</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Link key={course.id} to={`/courses/${course.slug}`} className="card group hover:scale-105 transition-all p-0 overflow-hidden">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{course.duration_weeks} weeks</span>
                    <span className="text-secondary font-bold">${course.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/courses" className="btn-primary text-lg">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">About iKPACE</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              iKPACE is a next-generation online learning platform dedicated to empowering individuals with
              practical digital skills. Our mission is to make quality education accessible and affordable for everyone,
              enabling career transformation through technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how our students transformed their careers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent-green/10">
        <div className="max-w-6xl mx-auto">
          <div className="card bg-gradient-to-r from-primary to-secondary text-white text-center py-16 px-8">
            <Users className="mx-auto mb-6 animate-pulse" size={80} />
            <h2 className="text-5xl font-bold mb-6">
              Join a Community that Has Your Back
            </h2>
            <p className="text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Experience the power of a community that walks with you throughout your career. Our supportive environments are designed for you to connect, collaborate, and build lasting relationships with peers and mentors, fostering collective growth and shared success.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold text-accent-yellow mb-2">5,000+</div>
                <div className="text-lg">Active Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold text-accent-yellow mb-2">24/7</div>
                <div className="text-lg">Community Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold text-accent-yellow mb-2">100+</div>
                <div className="text-lg">Events Per Month</div>
              </div>
            </div>
            <Link to="/community" className="btn-secondary text-lg px-8 py-4 inline-block">
              Join Our Community
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about iKPACE</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-bold text-primary mb-3 flex items-start">
                  <CheckCircle className="text-secondary mr-2 flex-shrink-0 mt-1" size={20} />
                  {faq.question}
                </h3>
                <p className="text-gray-700 pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-neutral-gray">
        <div className="max-w-4xl mx-auto text-center">
          <Globe className="text-secondary mx-auto mb-6" size={64} />
          <h2 className="text-4xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions? We're here to help you on your learning journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <MessageCircle className="text-primary mx-auto mb-3" size={32} />
              <h3 className="font-bold text-primary mb-2">24/7 Live Chat</h3>
              <p className="text-gray-600">Click the chat icon to speak with our support team</p>
            </div>
            <div className="card">
              <Users className="text-secondary mx-auto mb-3" size={32} />
              <h3 className="font-bold text-primary mb-2">Community Forum</h3>
              <p className="text-gray-600">Join thousands of learners in our active community</p>
            </div>
          </div>
          <p className="text-gray-600">
            Email us at: <a href="mailto:support@ikpace.com" className="text-secondary font-semibold hover:underline">support@ikpace.com</a>
          </p>
        </div>
      </section>

      <section className="gradient-hero py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Join iKPACE today and gain access to world-class digital skills training for just $7 per course
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-secondary text-lg px-8 py-4">
              Create Free Account
            </Link>
            <Link to="/courses" className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              Browse All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
