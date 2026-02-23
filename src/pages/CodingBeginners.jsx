export default function CodingBeginners() {
  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    green: "#008F4C",
    yellow: "#E6B800",
    darkGray: "#1F2937",
    lightGray: "#F3F4F6",
    blueShade: "#4A6FA5",
    orangeShade: "#FF9A3C",
    white: "#FFFFFF"
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.green + '20', color: colors.green }}>
          
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Coding for <span style={{ color: colors.secondary }}>Beginners</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
          Start your coding journey today — no experience needed, completely free, and built for absolute beginners.
        </p>
        <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-20">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
          <div className="absolute inset-0 opacity-10" style={{ background: 'url("/api/placeholder/1200/400") center/cover' }}></div>
        </div>
        <div className="relative p-12 md:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                From Zero to Your First Code in Weeks
              </h2>
              <p className="text-xl text-white/90 mb-6">
                No prior experience? Perfect. We start from the very beginning and walk with you every step of the way.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">100%</p>
                  <p className="text-white/80 text-sm">Free forever</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">0</p>
                  <p className="text-white/80 text-sm">Experience needed</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">50,000+</p>
                  <p className="text-white/80 text-sm">Beginners started</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="px-10 py-5 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
                Start Coding Free →
              </button>
              <p className="text-white/80 mt-4">No credit card required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Learn to Code */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>
            Why Learn to Code in 2025?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Coding is no longer just for computer scientists. It's for creators, problem-solvers, and anyone who wants to build the future.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.primary + '10' }}>
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">High-Demand Skills</h4>
                <p className="text-gray-600">Tech jobs are growing 2x faster than other industries. Start your path to a rewarding career.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '10' }}>
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Earning Potential</h4>
                <p className="text-gray-600">Entry-level developers earn 40-60% more than average local salaries.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '10' }}>
                <span className="text-2xl">🌍</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Work From Anywhere</h4>
                <p className="text-gray-600">Remote work, freelance, or global opportunities — coding opens doors worldwide.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.primary + '05', border: `1px solid ${colors.primary}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>$45k+</div>
            <p className="text-sm text-gray-600">Avg entry-level salary</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.secondary + '05', border: `1px solid ${colors.secondary}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.secondary }}>22%</div>
            <p className="text-sm text-gray-600">Job growth by 2030</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.accent + '05', border: `1px solid ${colors.accent}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.accent }}>1M+</div>
            <p className="text-sm text-gray-600">Open tech jobs in Africa</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.green + '05', border: `1px solid ${colors.green}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.green }}>70%</div>
            <p className="text-sm text-gray-600">Can be learned in 6 months</p>
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>
            Your Learning Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            8 modules designed to take you from absolute beginner to confident coder
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Module 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-xl font-bold text-white" style={{ background: colors.primary }}>1</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">How Computers Work</h3>
            <p className="text-gray-600 text-sm">Understand the basics of computing, files, and the command line.</p>
          </div>

          {/* Module 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-xl font-bold text-white" style={{ background: colors.secondary }}>2</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">HTML & CSS</h3>
            <p className="text-gray-600 text-sm">Build your first web pages and style them like a pro.</p>
          </div>

          {/* Module 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-xl font-bold text-white" style={{ background: colors.accent }}>3</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">JavaScript Basics</h3>
            <p className="text-gray-600 text-sm">Make your websites interactive and dynamic.</p>
          </div>

          {/* Module 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-xl font-bold text-white" style={{ background: colors.green }}>4</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Version Control</h3>
            <p className="text-gray-600 text-sm">Learn Git and GitHub to collaborate and track your code.</p>
          </div>

          {/* Module 5 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-xl font-bold text-white" style={{ background: colors.blueShade }}>5</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Problem Solving</h3>
            <p className="text-gray-600 text-sm">Think like a programmer and break down complex problems.</p>
          </div>

          {/* Module 6 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-xl font-bold text-white" style={{ background: colors.orangeShade }}>6</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Build Projects</h3>
            <p className="text-gray-600 text-sm">Create real projects for your portfolio as you learn.</p>
          </div>

          {/* Module 7 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-xl font-bold text-white" style={{ background: colors.yellow, color: colors.darkGray }}>7</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Debugging</h3>
            <p className="text-gray-600 text-sm">Find and fix errors like a professional developer.</p>
          </div>

          {/* Module 8 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-xl font-bold text-white" style={{ background: colors.primary }}>8</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Next Steps</h3>
            <p className="text-gray-600 text-sm">Choose your path: web dev, data, or mobile development.</p>
          </div>
        </div>
      </div>

      {/* Program Features */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Everything You Get for Free
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '20' }}>
              <span className="text-2xl">📹</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">100+ Video Lessons</h4>
              <p className="text-gray-600 text-sm">Bite-sized videos that make complex topics easy to understand.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '20' }}>
              <span className="text-2xl">💻</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">50+ Coding Exercises</h4>
              <p className="text-gray-600 text-sm">Practice what you learn with hands-on coding challenges.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.accent + '20' }}>
              <span className="text-2xl">🏗️</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">5 Real Projects</h4>
              <p className="text-gray-600 text-sm">Build a portfolio that shows employers what you can do.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '20' }}>
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Community Support</h4>
              <p className="text-gray-600 text-sm">Join thousands of beginners learning together.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '20' }}>
              <span className="text-2xl">🎓</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Certificate of Completion</h4>
              <p className="text-gray-600 text-sm">Showcase your achievement on LinkedIn and resumes.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.accent + '20' }}>
              <span className="text-2xl">📱</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Mobile Friendly</h4>
              <p className="text-gray-600 text-sm">Learn on your phone, anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path Comparison */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Choose Your Learning Style
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2" style={{ borderColor: colors.primary + '20' }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>Self-Paced</h3>
            <p className="text-gray-600 mb-6">Learn at your own speed, completely free</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> All video lessons
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Coding exercises
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Community forum
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Certificate
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>✗</span> Live mentorship
              </li>
            </ul>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: colors.green }}>Free</div>
              <button className="w-full py-3 rounded-xl font-bold transition-all hover:bg-gray-100" style={{ border: `2px solid ${colors.primary}`, color: colors.primary }}>
                Start Free
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 scale-105 relative z-10" style={{ borderColor: colors.secondary }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap" style={{ background: colors.secondary }}>
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: colors.secondary }}>Guided Path</h3>
            <p className="text-gray-600 mb-6">Structured learning with mentor support</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Everything in Self-Paced
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Weekly live sessions
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> 1-on-1 mentorship
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Project reviews
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Career guidance
              </li>
            </ul>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>$49<span className="text-lg text-gray-500">/mo</span></div>
              <button className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-105" style={{ background: colors.secondary }}>
                Start Guided Path
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-2" style={{ borderColor: colors.accent + '20' }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: colors.accent }}>Bootcamp Prep</h3>
            <p className="text-gray-600 mb-6">Intensive preparation for coding bootcamps</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Everything in Guided
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Algorithm mastery
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Technical interviews
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Portfolio building
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Job placement support
              </li>
            </ul>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>$99<span className="text-lg text-gray-500">/mo</span></div>
              <button className="w-full py-3 rounded-xl font-bold transition-all hover:bg-gray-100" style={{ border: `2px solid ${colors.accent}`, color: colors.accent }}>
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-20 p-12 rounded-3xl" style={{ background: colors.lightGray }}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          From Beginner to Developer
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.primary }}>
                CE
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Chidi Eze</h4>
                <p className="text-sm text-gray-600">Frontend Developer</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-3">"I had never written a line of code before. Six months later, I got my first developer job. The free course changed my life."</p>
            <p className="text-sm font-medium" style={{ color: colors.green }}>Now at: Terragon Group</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.secondary }}>
                FA
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Funke Akinyemi</h4>
                <p className="text-sm text-gray-600">Software Engineer</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-3">"As a mom of three, I needed flexibility. The self-paced format meant I could learn during nap times. Now I work remotely for a US company."</p>
            <p className="text-sm font-medium" style={{ color: colors.green }}>Now at: Andela</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.accent }}>
                KO
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Kevin Omondi</h4>
                <p className="text-sm text-gray-600">Full-Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-3">"Dropped out of university thinking I wasn't smart enough. Turns out I just needed the right teacher. Now I build apps used by thousands."</p>
            <p className="text-sm font-medium" style={{ color: colors.green }}>Now at: Safaricom</p>
          </div>
        </div>
      </div>

      {/* Tools You'll Learn */}
      <div className="mb-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12" style={{ color: colors.primary }}>
          Technologies You'll Master
        </h2>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl font-bold" style={{ color: colors.primary }}>HTML5</div>
          <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl font-bold" style={{ color: colors.primary }}>CSS3</div>
          <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl font-bold" style={{ color: colors.secondary }}>JavaScript</div>
          <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl font-bold" style={{ color: colors.accent }}>Git</div>
          <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl font-bold" style={{ color: colors.green }}>GitHub</div>
          <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl font-bold" style={{ color: colors.blueShade }}>VS Code</div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Questions from Beginners
        </h2>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">I've never coded before. Is this really for me?</h3>
            <p className="text-gray-600">Absolutely! That's exactly who this course is designed for. We start from "what is code?" and build up step by step.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">How long will it take to complete?</h3>
            <p className="text-gray-600">At 3-5 hours per week, you can complete the core curriculum in 8-10 weeks. But you can go at your own pace — there's no deadline.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Do I need a powerful computer?</h3>
            <p className="text-gray-600">Any computer made in the last 5 years will work fine. You can even use a tablet for the video lessons and theory parts.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Will I be job-ready after this course?</h3>
            <p className="text-gray-600">This course builds your foundation. Most students continue to our advanced tracks or bootcamps, but you'll have a solid portfolio to start applying for internships.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Is it really free forever?</h3>
            <p className="text-gray-600">Yes! The self-paced track is completely free, always. No credit card, no hidden fees, no time limits.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">What if I get stuck?</h3>
            <p className="text-gray-600">Our community forum is active 24/7. Thousands of beginners help each other, and mentors check in daily to answer questions.</p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Your Journey After This Course
        </h2>

        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.primary }}>1</div>
            <h4 className="font-bold text-gray-900">Frontend Development</h4>
            <p className="text-sm text-gray-600">Build websites and web apps</p>
          </div>
          <div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.secondary }}>2</div>
            <h4 className="font-bold text-gray-900">Backend Development</h4>
            <p className="text-sm text-gray-600">Work with servers and databases</p>
          </div>
          <div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.accent }}>3</div>
            <h4 className="font-bold text-gray-900">Mobile Development</h4>
            <p className="text-sm text-gray-600">Build Android and iOS apps</p>
          </div>
          <div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.green }}>4</div>
            <h4 className="font-bold text-gray-900">Data Science</h4>
            <p className="text-sm text-gray-600">Analyze data and build AI models</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center p-12 rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Start Your Coding Journey Today
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Join 50,000+ beginners who took their first step with us. No experience needed. No cost. Just your curiosity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
            Start Learning Free
          </button>
          <button className="px-10 py-5 rounded-full font-bold text-lg border-2 transition-all hover:bg-white/10" style={{ borderColor: colors.white, color: colors.white }}>
            View Curriculum
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-white/80">
          <div className="flex items-center gap-2">
            <span>⏱️</span> Start in 5 minutes
          </div>
          <div className="flex items-center gap-2">
            <span>📱</span> Learn anywhere
          </div>
          <div className="flex items-center gap-2">
            <span>🎯</span> No commitment
          </div>
        </div>
      </div>
    </div>
  );
}