export default function ReturnToWork() {
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
        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
          
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Your Career Break Is <span style={{ color: colors.secondary }}>Not a Gap</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
          For professionals returning after career breaks — refresh your skills, rebuild confidence, and relaunch your career with iKPACE.
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
                Your Experience + Updated Skills = Unstoppable
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Whether you took time off for family, education, or personal growth — we're here to help you come back stronger.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">85%</p>
                  <p className="text-white/80 text-sm">Return-to-work success rate</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">3-6 months</p>
                  <p className="text-white/80 text-sm">Program duration</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">500+</p>
                  <p className="text-white/80 text-sm">Professionals placed</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="px-10 py-5 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
                Start Your Return →
              </button>
              <p className="text-white/80 mt-4">Free career consultation available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Understanding the Challenge */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>
            We Understand the Challenge
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Returning to work after a career break shouldn't feel like starting over. Your experience matters. Your skills matter. You matter.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.primary + '10' }}>
                <span className="text-2xl">🤔</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">The Confidence Gap</h4>
                <p className="text-gray-600">Many professionals worry their skills are outdated. We'll help you update and validate what you know.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '10' }}>
                <span className="text-2xl">🔄</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">The Skills Refresh</h4>
                <p className="text-gray-600">Technology evolves fast. We'll bring you up to speed with the latest tools and practices.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '10' }}>
                <span className="text-2xl">🤝</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">The Network Rebuild</h4>
                <p className="text-gray-600">Reconnect with industry professionals and build new relationships that open doors.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.primary + '05', border: `1px solid ${colors.primary}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>62%</div>
            <p className="text-sm text-gray-600">of women face career breaks for caregiving</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.secondary + '05', border: `1px solid ${colors.secondary}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.secondary }}>2-5 yrs</div>
            <p className="text-sm text-gray-600">average break duration</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.accent + '05', border: `1px solid ${colors.accent}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.accent }}>73%</div>
            <p className="text-sm text-gray-600">want to return to same industry</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.green + '05', border: `1px solid ${colors.green}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.green }}>40%</div>
            <p className="text-sm text-gray-600">higher retention with support programs</p>
          </div>
        </div>
      </div>

      {/* Program Features */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>
            How We Support Your Return
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive program designed specifically for professionals returning to work
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.primary + '10' }}>
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Skills Refresh</h3>
            <p className="text-gray-600 mb-4">Update your technical and professional skills to match current industry standards.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Latest tools & technologies
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Industry best practices
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Hands-on projects
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.secondary + '10' }}>
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Confidence Building</h3>
            <p className="text-gray-600 mb-4">Overcome imposter syndrome and rebuild your professional confidence.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> 1-on-1 coaching sessions
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Peer support groups
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Mindset workshops
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.green + '10' }}>
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Resume & LinkedIn</h3>
            <p className="text-gray-600 mb-4">Learn to frame your career break as an asset, not a gap.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Resume makeover
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> LinkedIn optimization
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Portfolio development
              </li>
            </ul>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.accent + '10' }}>
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Networking Opportunities</h3>
            <p className="text-gray-600 mb-4">Reconnect with your industry and build new professional relationships.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Industry events
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Alumni connections
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Mentor matching
              </li>
            </ul>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.yellow + '10' }}>
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Interview Preparation</h3>
            <p className="text-gray-600 mb-4">Practice and prepare to confidently answer questions about your career break.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Mock interviews
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Common questions
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Salary negotiation
              </li>
            </ul>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.orangeShade + '10' }}>
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Job Placement Support</h3>
            <p className="text-gray-600 mb-4">Connect with employers who value experienced professionals.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Partner companies
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Job matching
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Application support
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Program Tracks */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Choose Your Path
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4" style={{ borderTopColor: colors.primary }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Tech Track</h3>
            <p className="text-gray-600 mb-6">For professionals returning to technology roles</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Full-stack development
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Cloud computing
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Data analysis
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Cybersecurity basics
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Agile methodologies
              </li>
            </ul>
            <p className="text-2xl font-bold" style={{ color: colors.primary }}>12 weeks</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 scale-105 relative z-10" style={{ borderTopColor: colors.secondary }}>
            <div className="absolute -top-4 right-8 px-4 py-1 rounded-full text-sm font-bold text-white" style={{ background: colors.secondary }}>
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Business Track</h3>
            <p className="text-gray-600 mb-6">For operations, management, and administration</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Project management
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Digital transformation
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Business analytics
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Leadership skills
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Change management
              </li>
            </ul>
            <p className="text-2xl font-bold" style={{ color: colors.primary }}>10 weeks</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4" style={{ borderTopColor: colors.accent }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Creative Track</h3>
            <p className="text-gray-600 mb-6">For design, marketing, and creative roles</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> UX/UI design
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Digital marketing
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Content strategy
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Brand management
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: colors.green }}>✓</span> Social media
              </li>
            </ul>
            <p className="text-2xl font-bold" style={{ color: colors.primary }}>8 weeks</p>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-20 p-12 rounded-3xl" style={{ background: colors.lightGray }}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Professionals Who Returned Stronger
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.primary }}>
                MA
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Mercy Akinwale</h4>
                <p className="text-sm text-gray-600">Product Manager at Paystack</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-3">"After 4 years as a stay-at-home mom, I thought my career was over. iKPACE showed me my experience still mattered. Today, I lead product teams."</p>
            <p className="text-sm font-medium" style={{ color: colors.green }}>Returned after 4-year break</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.secondary }}>
                TO
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Tunde Okafor</h4>
                <p className="text-sm text-gray-600">Senior Developer at Andela</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-3">"Took 2 years off to care for my parents. The skills refresh program brought me up to speed with modern frameworks in just 12 weeks."</p>
            <p className="text-sm font-medium" style={{ color: colors.green }}>Returned after 2-year break</p>
          </div>
        </div>
      </div>

      {/* Employer Partners */}
      <div className="mb-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ color: colors.primary }}>
          Companies Hiring Our Graduates
        </h2>
        <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
          <span className="text-xl font-bold text-gray-400">Google</span>
          <span className="text-xl font-bold text-gray-400">Microsoft</span>
          <span className="text-xl font-bold text-gray-400">Andela</span>
          <span className="text-xl font-bold text-gray-400">Paystack</span>
          <span className="text-xl font-bold text-gray-400">Flutterwave</span>
          <span className="text-xl font-bold text-gray-400">Interswitch</span>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Common Questions
        </h2>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">How do I explain my career break to employers?</h3>
            <p className="text-gray-600">We'll teach you how to frame your break positively and focus on the valuable skills you gained during that time.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Is the program flexible with my schedule?</h3>
            <p className="text-gray-600">Yes! All sessions are recorded, and you can learn at your own pace. Perfect for those balancing family responsibilities.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Do I need to pay upfront?</h3>
            <p className="text-gray-600">We offer income share agreements and payment plans. You only pay when you're employed.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">What if my skills are completely outdated?</h3>
            <p className="text-gray-600">That's exactly why we're here! We start from the basics and build up to current industry standards.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">How long until I'm job-ready?</h3>
            <p className="text-gray-600">Most professionals are ready for interviews within 3-6 months, depending on your track and pace.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center p-12 rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Return Stronger?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Your career break prepared you for this moment. Let's take the next step together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
            Start Your Application
          </button>
          <button className="px-10 py-5 rounded-full font-bold text-lg border-2 transition-all hover:bg-white/10" style={{ borderColor: colors.white, color: colors.white }}>
            Talk to an Advisor
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-white/80">
          <div className="flex items-center gap-2">
            <span>📅</span> Next cohort: April 15
          </div>
          <div className="flex items-center gap-2">
            <span>👥</span> Limited to 30 participants
          </div>
          <div className="flex items-center gap-2">
            <span>💰</span> Scholarships available
          </div>
        </div>
      </div>
    </div>
  );
}