import { Link } from 'react-router-dom'
import { BookOpen, TrendingUp, Award, Users, Zap, Target } from 'lucide-react'

export default function Landing() {
  const courses = [
    { name: 'Information Technology', duration: '4 weeks', image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Data Analysis', duration: '6 weeks', image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Cybersecurity', duration: '6 weeks', image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Virtual Assistant', duration: '4 weeks', image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Content Creation', duration: '4 weeks', image: 'https://images.pexels.com/photos/3153204/pexels-photo-3153204.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Graphic Design', duration: '6 weeks', image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'AI Animation', duration: '4 weeks', image: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Freelancing', duration: '4 weeks', image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ]

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
            <h2 className="text-4xl font-bold text-primary mb-4">Popular Courses</h2>
            <p className="text-xl text-gray-600">Start with any course - they're all beginner-friendly</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="card group hover:scale-105 transition-all p-0 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-2">{course.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{course.duration}</span>
                    <span className="text-secondary font-bold">$7</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/courses" className="btn-primary text-lg">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="gradient-hero py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Join iKPACE today and gain access to world-class digital skills training
          </p>
          <Link to="/register" className="btn-secondary text-lg px-8 py-4">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  )
}
