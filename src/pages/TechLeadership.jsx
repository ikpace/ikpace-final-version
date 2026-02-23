export default function TechLeadership() {
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
          Lead the <span style={{ color: colors.secondary }}>Future of Tech</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
          Executive skills development program designed for women ready to step into C-suite, director, and senior leadership roles in technology.
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
                The World Needs Women Leading Tech
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Only 28% of leadership roles in tech are held by women. We're changing that, one leader at a time.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">28%</p>
                  <p className="text-white/80 text-sm">Women in tech leadership</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">87%</p>
                  <p className="text-white/80 text-sm">Get promoted within 1 year</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-bold">3x</p>
                  <p className="text-white/80 text-sm">More likely to lead teams</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="px-10 py-5 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
                Apply for Leadership Program →
              </button>
              <p className="text-white/80 mt-4">Next cohort: May 2025 | Limited to 25 women</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Leadership Gap */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>
            The Leadership Gap in Tech
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Women leave tech leadership at twice the rate of men. The problem isn't capability — it's lack of sponsorship, mentorship, and leadership development designed for women.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.primary + '10' }}>
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">The Drop-off</h4>
                <p className="text-gray-600">Women represent 47% of entry-level tech roles but only 28% of executive positions.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '10' }}>
                <span className="text-2xl">🧠</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">The Confidence Factor</h4>
                <p className="text-gray-600">Women often wait until they meet 100% of qualifications before applying for leadership roles. Men apply at 60%.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '10' }}>
                <span className="text-2xl">🌟</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">The Business Case</h4>
                <p className="text-gray-600">Companies with women in leadership are 48% more profitable and 30% more innovative.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.primary + '05', border: `1px solid ${colors.primary}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>47%</div>
            <p className="text-sm text-gray-600">Entry-level tech roles</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.secondary + '05', border: `1px solid ${colors.secondary}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.secondary }}>28%</div>
            <p className="text-sm text-gray-600">Executive roles</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.accent + '05', border: `1px solid ${colors.accent}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.accent }}>48%</div>
            <p className="text-sm text-gray-600">Higher profitability</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: colors.green + '05', border: `1px solid ${colors.green}20` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.green }}>2x</div>
            <p className="text-sm text-gray-600">Attrition rate for women</p>
          </div>
        </div>
      </div>

      {/* Program Features */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>
            What You'll Master
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A 6-month intensive program covering every aspect of tech leadership
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.primary + '10' }}>
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Strategic Leadership</h3>
            <p className="text-gray-600 mb-4">Develop vision, set direction, and align teams toward organizational goals.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Strategic planning
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Decision-making frameworks
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Organizational design
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.secondary + '10' }}>
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Team Building & Management</h3>
            <p className="text-gray-600 mb-4">Build, motivate, and retain high-performing engineering teams.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Hiring & interviewing
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Performance management
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Career development for teams
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.green + '10' }}>
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Acumen</h3>
            <p className="text-gray-600 mb-4">Understand budgets, P&L, and make data-driven financial decisions.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Budgeting & forecasting
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> ROI analysis
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Resource allocation
              </li>
            </ul>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.accent + '10' }}>
              <span className="text-2xl">🗣️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Executive Communication</h3>
            <p className="text-gray-600 mb-4">Present to boards, influence stakeholders, and communicate with impact.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Board presentations
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Stakeholder management
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Negotiation skills
              </li>
            </ul>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.yellow + '10' }}>
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Change Management</h3>
            <p className="text-gray-600 mb-4">Lead organizational transformation and drive innovation.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Digital transformation
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Culture change
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Innovation management
              </li>
            </ul>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.orangeShade + '10' }}>
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Executive Presence</h3>
            <p className="text-gray-600 mb-4">Build personal brand, network, and influence at the highest levels.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Personal branding
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Board networking
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <span style={{ color: colors.green }}>✓</span> Media training
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
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.primary }}>6</div>
            <h4 className="font-bold text-gray-900">Months Duration</h4>
            <p className="text-sm text-gray-600">Immersive learning</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.secondary }}>2x</div>
            <h4 className="font-bold text-gray-900">Monthly Workshops</h4>
            <p className="text-sm text-gray-600">Full-day sessions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.accent }}>1:1</div>
            <h4 className="font-bold text-gray-900">Executive Coaching</h4>
            <p className="text-sm text-gray-600">Bi-weekly sessions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.green }}>∞</div>
            <h4 className="font-bold text-gray-900">Alumni Network</h4>
            <p className="text-sm text-gray-600">Lifetime access</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>Curriculum Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>1</span>
                <span className="text-gray-700">Month 1: Leadership Foundation & Self-Discovery</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>2</span>
                <span className="text-gray-700">Month 2: Strategic Thinking & Business Acumen</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>3</span>
                <span className="text-gray-700">Month 3: Building & Leading High-Performance Teams</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>4</span>
                <span className="text-gray-700">Month 4: Financial Leadership & Resource Management</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>5</span>
                <span className="text-gray-700">Month 5: Innovation & Change Management</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>6</span>
                <span className="text-gray-700">Month 6: Executive Presence & Board Readiness</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ color: colors.secondary }}>What's Included</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span>
                <span className="text-gray-700">12 full-day workshops with industry leaders</span>
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span>
                <span className="text-gray-700">12 bi-weekly 1:1 executive coaching sessions</span>
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span>
                <span className="text-gray-700">Peer learning circles with fellow leaders</span>
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span>
                <span className="text-gray-700">360-degree leadership assessment</span>
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span>
                <span className="text-gray-700">Executive presence photoshoot</span>
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span>
                <span className="text-gray-700">LinkedIn profile optimization</span>
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span>
                <span className="text-gray-700">Board placement assistance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Leadership Faculty */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Learn from Women Who Lead
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white" style={{ background: colors.primary }}>
              DA
            </div>
            <h4 className="font-bold text-gray-900 text-xl">Dr. Adaeze Nwosu</h4>
            <p className="text-sm text-gray-600 mb-2">Former CTO, Interswitch</p>
            <p className="text-sm text-gray-500">25+ years in tech leadership</p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white" style={{ background: colors.secondary }}>
              BM
            </div>
            <h4 className="font-bold text-gray-900 text-xl">Brenda Mwangi</h4>
            <p className="text-sm text-gray-600 mb-2">VP Engineering, Safaricom</p>
            <p className="text-sm text-gray-500">Led teams of 500+ engineers</p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white" style={{ background: colors.accent }}>
              FO
            </div>
            <h4 className="font-bold text-gray-900 text-xl">Folake Ogunleye</h4>
            <p className="text-sm text-gray-600 mb-2">Board Member, Tech Companies</p>
            <p className="text-sm text-gray-500">Harvard Business School alumna</p>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Women Who Advanced
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4" style={{ borderLeftColor: colors.primary }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.primary }}>
                TA
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Temi Adebayo</h4>
                <p className="text-sm text-gray-600">Before: Senior Engineer → After: Engineering Director</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-3">"I was stuck at the senior level for 5 years. This program gave me the confidence, network, and skills to finally break through to director level within 8 months of graduating."</p>
            <p className="text-sm font-medium" style={{ color: colors.green }}>Now leading 45 engineers at Flutterwave</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4" style={{ borderLeftColor: colors.secondary }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.secondary }}>
                KN
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Kemi Nelson</h4>
                <p className="text-sm text-gray-600">Before: Product Manager → After: CPO</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-3">"The executive coaching was transformative. My coach helped me navigate a difficult board situation and within months I was promoted to Chief Product Officer."</p>
            <p className="text-sm font-medium" style={{ color: colors.green }}>Now CPO at a fintech startup</p>
          </div>
        </div>
      </div>

      {/* Alumni Network */}
      <div className="mb-20 p-12 rounded-3xl text-center" style={{ background: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.secondary}05 100%)`, border: `1px solid ${colors.primary}20` }}>
        <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>
          Join an Exclusive Network
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Become part of Africa's most influential network of women in tech leadership.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div>
            <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>500+</div>
            <p className="text-gray-600">Alumni leaders</p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2" style={{ color: colors.secondary }}>45%</div>
            <p className="text-gray-600">Now in C-suite</p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2" style={{ color: colors.accent }}>12+</div>
            <p className="text-gray-600">Countries represented</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 rounded-full bg-white shadow-sm text-sm" style={{ color: colors.primary }}>Quarterly leadership summits</span>
          <span className="px-4 py-2 rounded-full bg-white shadow-sm text-sm" style={{ color: colors.primary }}>Private LinkedIn group</span>
          <span className="px-4 py-2 rounded-full bg-white shadow-sm text-sm" style={{ color: colors.primary }}>Mentor matching</span>
          <span className="px-4 py-2 rounded-full bg-white shadow-sm text-sm" style={{ color: colors.primary }}>Board placement</span>
        </div>
      </div>

      {/* Sponsorship Partners */}
      <div className="mb-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ color: colors.primary }}>
          Our Graduates Lead At
        </h2>
        <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
          <span className="text-xl font-bold text-gray-400">Google</span>
          <span className="text-xl font-bold text-gray-400">Microsoft</span>
          <span className="text-xl font-bold text-gray-400">Meta</span>
          <span className="text-xl font-bold text-gray-400">Amazon</span>
          <span className="text-xl font-bold text-gray-400">Flutterwave</span>
          <span className="text-xl font-bold text-gray-400">Paystack</span>
          <span className="text-xl font-bold text-gray-400">Andela</span>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Questions About Leadership
        </h2>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Am I ready for this program?</h3>
            <p className="text-gray-600">You're ready if you have 8+ years of tech experience and are currently managing teams or projects. We also welcome high-potential individual contributors ready for the next step.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">What's the time commitment?</h3>
            <p className="text-gray-600">Approximately 8-10 hours per week including workshops, coaching, peer learning, and assignments. Designed for working professionals.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Is this only for women in tech?</h3>
            <p className="text-gray-600">Yes, this program is specifically designed for women in technology roles. We create a safe space to address the unique challenges women face in tech leadership.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">What outcomes can I expect?</h3>
            <p className="text-gray-600">87% of our graduates receive a promotion within 12 months. You'll leave with a clear career plan, expanded network, and the skills to lead at the highest levels.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Is sponsorship available?</h3>
            <p className="text-gray-600">Yes! Many employers sponsor women for this program. We provide materials to make the case to your organization. Scholarships are also available for exceptional candidates.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">What's the application process?</h3>
            <p className="text-gray-600">Submit your application, complete a leadership assessment, and participate in an interview with our admissions team. We select women who are ready to make an impact.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center p-12 rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Lead?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          The tech industry needs your voice, your vision, and your leadership. Step into your power.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
            Apply for Leadership Program
          </button>
          <button className="px-10 py-5 rounded-full font-bold text-lg border-2 transition-all hover:bg-white/10" style={{ borderColor: colors.white, color: colors.white }}>
            Download Brochure
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-white/80">
          <div className="flex items-center gap-2">
            <span>📅</span> Applications close April 30
          </div>
          <div className="flex items-center gap-2">
            <span>👥</span> Only 25 spots per cohort
          </div>
          <div className="flex items-center gap-2">
            <span>💰</span> Corporate sponsorship available
          </div>
        </div>
      </div>
    </div>
  );
}