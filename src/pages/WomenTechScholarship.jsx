export default function WomenTechScholarship() {
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
          Women in Tech <span style={{ color: colors.secondary }}>Scholarship</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          50% tuition support for women pursuing careers in technology.
        </p>
        <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Hero Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
            <div className="absolute inset-0 opacity-10" style={{ background: 'url("/api/placeholder/1200/400") center/cover' }}></div>
          </div>
          <div className="relative p-12 md:p-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                We Believe Women Can Build More
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Africa women are rising in tech — and we're here to support every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
                  Apply Now for 50% Scholarship
                </button>
                <button className="px-8 py-4 rounded-full font-bold text-lg border-2 transition-all hover:bg-white/10" style={{ borderColor: colors.white, color: colors.white }}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Why This Scholarship */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>
              Why This Scholarship?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              At iKPACE, we're committed to bridging the gender gap in technology. Women are shaping the future of Africa's tech industry, and we're here to accelerate that transformation.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.green + '20' }}>
                  <span className="text-sm font-bold" style={{ color: colors.green }}>✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Only 30% of tech roles are held by women</h4>
                  <p className="text-gray-600">We're changing that statistic, one scholarship at a time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.secondary + '20' }}>
                  <span className="text-sm font-bold" style={{ color: colors.secondary }}>✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Africa has the fastest-growing tech ecosystem</h4>
                  <p className="text-gray-600">Women deserve to lead this digital revolution.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.accent + '20' }}>
                  <span className="text-sm font-bold" style={{ color: colors.accent }}>✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Diverse teams build better solutions</h4>
                  <p className="text-gray-600">Your perspective matters. The tech world needs you.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-square">
              <img 
                src="/api/placeholder/600/600" 
                alt="Women in tech collaborating" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl shadow-xl" style={{ background: colors.white }}>
              <p className="text-sm font-medium text-gray-600 mb-1">Join the movement</p>
              <p className="text-2xl font-bold" style={{ color: colors.secondary }}>500+ Scholars</p>
            </div>
          </div>
        </div>

        {/* Scholarship Benefits */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>
              What You Get
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              More than just a scholarship — it's your launchpad into tech
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.primary + '10' }}>
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">50% Tuition Support</h3>
              <p className="text-gray-600">Half of your course fees covered. Quality tech education at half the cost.</p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.secondary + '10' }}>
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Women-Led Mentorship</h3>
              <p className="text-gray-600">Connect with successful women in tech who guide your journey.</p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.green + '10' }}>
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-600">Join a network of women scholars across Africa. You're not alone.</p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.accent + '10' }}>
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Preparation</h3>
              <p className="text-gray-600">Resume workshops, interview prep, and job placement support.</p>
            </div>

            {/* Benefit 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.yellow + '10' }}>
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Certificate Included</h3>
              <p className="text-gray-600">Earn a recognized certification to boost your resume.</p>
            </div>

            {/* Benefit 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: colors.orangeShade + '10' }}>
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lifetime Access</h3>
              <p className="text-gray-600">Course materials forever. Learn at your own pace.</p>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-20 p-12 rounded-3xl" style={{ background: colors.lightGray }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>
              Scholars Who Made It
            </h2>
            <p className="text-xl text-gray-600">Real women. Real success stories.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.primary }}>
                  AA
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Amina Abubakar</h4>
                  <p className="text-sm text-gray-600">Software Engineer at Google</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The scholarship didn't just teach me to code — it gave me confidence. Today, I lead projects that impact millions."</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.secondary }}>
                  FO
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Fatima Okonkwo</h4>
                  <p className="text-sm text-gray-600">Tech Lead at Flutterwave</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"From scholarship recipient to leading engineering teams. iKPACE believed in me when it mattered most."</p>
            </div>
          </div>
        </div>

        {/* How to Apply */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
            How to Apply
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white" style={{ background: colors.primary }}>1</div>
              <h4 className="font-bold text-gray-900 mb-2">Fill Application</h4>
              <p className="text-gray-600 text-sm">5-minute form about your goals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white" style={{ background: colors.primary }}>2</div>
              <h4 className="font-bold text-gray-900 mb-2">Tell Your Story</h4>
              <p className="text-gray-600 text-sm">Short video or essay about your journey</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white" style={{ background: colors.primary }}>3</div>
              <h4 className="font-bold text-gray-900 mb-2">Review Period</h4>
              <p className="text-gray-600 text-sm">We review within 7 days</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white" style={{ background: colors.primary }}>4</div>
              <h4 className="font-bold text-gray-900 mb-2">Start Learning</h4>
              <p className="text-gray-600 text-sm">Begin your tech journey</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center p-12 rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary}08 0%, ${colors.secondary}08 100%)`, border: `1px solid ${colors.primary}20` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to <span style={{ color: colors.secondary }}>Build More?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Applications are now open. Don't let anything hold you back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl text-white" style={{ background: colors.primary }}>
              Apply for Scholarship
            </button>
            <button className="px-8 py-4 rounded-full font-bold text-lg border-2 transition-all hover:bg-gray-50" style={{ borderColor: colors.primary, color: colors.primary }}>
              Download Brochure
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-6">Limited spots available. Next cohort starts soon.</p>
        </div>
      </div>
    </div>
  );
}