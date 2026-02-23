export default function WomenEntrepreneurs() {
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
        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.secondary + '20', color: colors.secondary }}>
          
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Build Your <span style={{ color: colors.secondary }}>Startup</span> With iKPACE
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
          From idea to launch a workshop program designed specifically for women founders across Africa.
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
                Africa's Next Generation of Women Founders
              </h2>
              <p className="text-xl text-white/90 mb-6">
                You have the vision. We have the roadmap. Together, we build.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">85%</p>
                  <p className="text-white/80 text-sm">Female founders rate</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">200+</p>
                  <p className="text-white/80 text-sm">Startups launched</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">$5M+</p>
                  <p className="text-white/80 text-sm">Funding raised</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="px-10 py-5 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
                Join the Program →
              </button>
              <p className="text-white/80 mt-4">Next cohort starts in 2 weeks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Entrepreneurship */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>
            Why Women Entrepreneurs?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Women-led startups in Africa are growing 3x faster than the global average. Yet funding and support remain uneven. We're changing that.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.primary + '10' }}>
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Fastest Growing Segment</h4>
                <p className="text-gray-600">Women entrepreneurs are the fastest-growing group of business owners in Africa.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '10' }}>
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Untapped Potential</h4>
                <p className="text-gray-600">Studies show women reinvest 90% of their income back into their families and communities.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '10' }}>
                <span className="text-2xl">🌍</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Solving Real Problems</h4>
                <p className="text-gray-600">Women founders build solutions for challenges they understand firsthand.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.primary + '05', border: `1px solid ${colors.primary}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>58%</div>
            <p className="text-sm text-gray-600">of African SMEs are women-owned</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.secondary + '05', border: `1px solid ${colors.secondary}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.secondary }}>$42B</div>
            <p className="text-sm text-gray-600">funding gap for women founders</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.accent + '05', border: `1px solid ${colors.accent}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.accent }}>2.5x</div>
            <p className="text-sm text-gray-600">more jobs created by women-led businesses</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.green + '05', border: `1px solid ${colors.green}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.green }}>90%</div>
            <p className="text-sm text-gray-600">reinvest in community</p>
          </div>
        </div>
      </div>

      {/* Program Features */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>
            What You'll Learn
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            8-week intensive workshop program designed for early-stage founders
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.primary + '10' }}>
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Idea Validation</h3>
            <p className="text-gray-600 mb-4">Test your business idea before building. Learn customer discovery and market research.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Customer interviews
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Problem-solution fit
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Competitor analysis
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.secondary + '10' }}>
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Business Modeling</h3>
            <p className="text-gray-600 mb-4">Build a sustainable business model that attracts customers and investors.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Revenue streams
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Pricing strategy
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Unit economics
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.green + '10' }}>
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Funding Readiness</h3>
            <p className="text-gray-600 mb-4">Prepare to raise capital from angels, VCs, and grants.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Pitch deck creation
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Financial projections
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Investor networking
              </li>
            </ul>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.accent + '10' }}>
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Marketing</h3>
            <p className="text-gray-600 mb-4">Acquire and retain customers with modern marketing strategies.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Social media strategy
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Content marketing
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Growth tactics
              </li>
            </ul>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.yellow + '10' }}>
              <span className="text-2xl">⚖️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Legal & Compliance</h3>
            <p className="text-gray-600 mb-4">Navigate regulations and protect your business.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Business registration
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Intellectual property
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Contracts & agreements
              </li>
            </ul>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.orangeShade + '10' }}>
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Community & Network</h3>
            <p className="text-gray-600 mb-4">Connect with fellow founders and industry experts.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Peer mentorship
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Founder events
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Alumni network
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Program Structure */}
      <div className="mb-20 p-12 rounded-3xl" style={{ background: colors.lightGray }}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Program Structure
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.primary }}>8</div>
            <h4 className="font-bold text-gray-900">Weeks Duration</h4>
            <p className="text-sm text-gray-600">Intensive learning</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.secondary }}>2x</div>
            <h4 className="font-bold text-gray-900">Weekly Sessions</h4>
            <p className="text-sm text-gray-600">Live workshops</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.accent }}>1:1</div>
            <h4 className="font-bold text-gray-900">Mentorship</h4>
            <p className="text-sm text-gray-600">Personal coaching</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.green }}>∞</div>
            <h4 className="font-bold text-gray-900">Lifetime Access</h4>
            <p className="text-sm text-gray-600">To materials</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Breakdown</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>1</span>
              <span className="text-gray-700">Idea validation & customer discovery</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>2</span>
              <span className="text-gray-700">Market research & competitor analysis</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>3</span>
              <span className="text-gray-700">Business model canvas & revenue streams</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>4</span>
              <span className="text-gray-700">Product development & MVP</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>5</span>
              <span className="text-gray-700">Marketing & customer acquisition</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>6</span>
              <span className="text-gray-700">Financial planning & projections</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>7</span>
              <span className="text-gray-700">Pitch deck & investor preparation</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>8</span>
              <span className="text-gray-700">Demo day & networking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Founders Who Built With Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.primary }}>
                CN
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Chioma Nwosu</h4>
                <p className="text-sm text-gray-600">Founder, FarmKonnect</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-3">"From an idea to 10,000 farmers connected. iKPACE gave me the framework to scale."</p>
            <p className="text-sm font-medium" style={{ color: colors.green }}>Raised $500K in seed funding</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.secondary }}>
                AM
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Aisha Mohammed</h4>
                <p className="text-sm text-gray-600">CEO, EduTech Africa</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-3">"The mentorship changed everything. I finally understood what investors wanted to see."</p>
            <p className="text-sm font-medium" style={{ color: colors.green }}>Winner, Women in Tech Prize 2024</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.accent }}>
                PO
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Priscilla Osei</h4>
                <p className="text-sm text-gray-600">Founder, BeautyDirect</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-3">"I started with just WhatsApp. Now we're an app with 50,000 users across Ghana."</p>
            <p className="text-sm font-medium" style={{ color: colors.green }}>Revenue grew 300% in 1 year</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Who is this program for?</h3>
            <p className="text-gray-600">Women founders with an early-stage idea or existing business looking to scale. No prior business education required.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Is this program free?</h3>
            <p className="text-gray-600">We offer need-based scholarships and flexible payment options. Contact us to learn about funding opportunities for women entrepreneurs.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">What's the time commitment?</h3>
            <p className="text-gray-600">4-6 hours per week including live sessions, workshops, and independent work. Flexible schedule for working founders.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Will I get investor access?</h3>
            <p className="text-gray-600">Yes! The program ends with a Demo Day where you pitch to our network of angel investors and venture capitalists.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center p-12 rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Build Your Dream?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Join a community of women founders building Africa's future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
            Apply for the Program
          </button>
          <button className="px-10 py-5 rounded-full font-bold text-lg border-2 transition-all hover:bg-white/10" style={{ borderColor: colors.white, color: colors.white }}>
            Download Syllabus
          </button>
        </div>
        <p className="text-white/80 mt-6">Limited to 25 founders per cohort. Applications close soon.</p>
      </div>
    </div>
  );
}