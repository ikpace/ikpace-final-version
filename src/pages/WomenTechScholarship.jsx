import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.secondary + '20', color: colors.secondary }}>
            Women in Tech Initiative
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Women in Tech <span style={{ color: colors.secondary }}>Scholarship</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-4 px-4">
            50% tuition support for women pursuing careers in technology.
          </p>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Hero Card */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-12 sm:mb-16">
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1200")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </div>
            <div className="relative p-8 sm:p-12 md:p-16 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                  We Believe Women Can Build More
                </h2>
                <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 px-4">
                  Africa women are rising in tech — and we're here to support every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Link 
                    to="/contact" 
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all hover:scale-105 shadow-xl text-center"
                    style={{ background: colors.secondary, color: colors.white }}
                  >
                    Apply Now for 50% Scholarship
                  </Link>
                  <Link 
                    to="/about/mission" 
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg border-2 transition-all hover:bg-white/10 text-center"
                    style={{ borderColor: colors.white, color: colors.white }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Why This Scholarship */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
            <div className="px-4 sm:px-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ color: colors.primary }}>
                Why This Scholarship?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                At iKPACE, we're committed to bridging the gender gap in technology. Women are shaping the future of Africa's tech industry, and we're here to accelerate that transformation.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.green + '20' }}>
                    <span className="text-xs sm:text-sm font-bold" style={{ color: colors.green }}>✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">Only 30% of tech roles are held by women</h4>
                    <p className="text-xs sm:text-sm text-gray-600">We're changing that statistic, one scholarship at a time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.secondary + '20' }}>
                    <span className="text-xs sm:text-sm font-bold" style={{ color: colors.secondary }}>✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">Africa has the fastest-growing tech ecosystem</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Women deserve to lead this digital revolution.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.accent + '20' }}>
                    <span className="text-xs sm:text-sm font-bold" style={{ color: colors.accent }}>✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">Diverse teams build better solutions</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Your perspective matters. The tech world needs you.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative px-4 sm:px-0">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl aspect-square">
                <img 
                  src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop" 
                  alt="Women in tech collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl" style={{ background: colors.white }}>
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Join the movement</p>
                <p className="text-lg sm:text-2xl font-bold" style={{ color: colors.secondary }}>500+ Scholars</p>
              </div>
            </div>
          </div>

          {/* Scholarship Benefits */}
          <div className="mb-16 sm:mb-20 px-4 sm:px-0">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4" style={{ color: colors.primary }}>
                What You Get
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
                More than just a scholarship — it's your launchpad into tech
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Benefit 1 */}
              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-4 sm:mb-6 flex items-center justify-center" style={{ background: colors.primary + '10' }}>
                  <span className="text-2xl sm:text-3xl">💰</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">50% Tuition Support</h3>
                <p className="text-sm sm:text-base text-gray-600">Half of your course fees covered. Quality tech education at half the cost.</p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-4 sm:mb-6 flex items-center justify-center" style={{ background: colors.secondary + '10' }}>
                  <span className="text-2xl sm:text-3xl">👥</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Women-Led Mentorship</h3>
                <p className="text-sm sm:text-base text-gray-600">Connect with successful women in tech who guide your journey.</p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-4 sm:mb-6 flex items-center justify-center" style={{ background: colors.green + '10' }}>
                  <span className="text-2xl sm:text-3xl">🌍</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Community Support</h3>
                <p className="text-sm sm:text-base text-gray-600">Join a network of women scholars across Africa. You're not alone.</p>
              </div>

              {/* Benefit 4 */}
              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-4 sm:mb-6 flex items-center justify-center" style={{ background: colors.accent + '10' }}>
                  <span className="text-2xl sm:text-3xl">💼</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Career Preparation</h3>
                <p className="text-sm sm:text-base text-gray-600">Resume workshops, interview prep, and job placement support.</p>
              </div>

              {/* Benefit 5 */}
              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-4 sm:mb-6 flex items-center justify-center" style={{ background: colors.yellow + '10' }}>
                  <span className="text-2xl sm:text-3xl">🎓</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Certificate Included</h3>
                <p className="text-sm sm:text-base text-gray-600">Earn a recognized certification to boost your resume.</p>
              </div>

              {/* Benefit 6 */}
              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-4 sm:mb-6 flex items-center justify-center" style={{ background: colors.orangeShade + '10' }}>
                  <span className="text-2xl sm:text-3xl">🚀</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Lifetime Access</h3>
                <p className="text-sm sm:text-base text-gray-600">Course materials forever. Learn at your own pace.</p>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-16 sm:mb-20 p-6 sm:p-12 rounded-2xl sm:rounded-3xl" style={{ background: colors.lightGray }}>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4" style={{ color: colors.primary }}>
                Scholars Who Made It
              </h2>
              <p className="text-base sm:text-xl text-gray-600">Real women. Real success stories.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold text-white" style={{ background: colors.primary }}>
                    AA
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">Amina Abubakar</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Software Engineer at Google</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 italic">"The scholarship didn't just teach me to code — it gave me confidence. Today, I lead projects that impact millions."</p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold text-white" style={{ background: colors.secondary }}>
                    FO
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">Fatima Okonkwo</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Tech Lead at Flutterwave</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 italic">"From scholarship recipient to leading engineering teams. iKPACE believed in me when it mattered most."</p>
              </div>
            </div>
          </div>

          {/* How to Apply */}
          <div className="mb-16 sm:mb-20 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12" style={{ color: colors.primary }}>
              How to Apply
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-base sm:text-xl font-bold text-white" style={{ background: colors.primary }}>1</div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Fill Application</h4>
                <p className="text-xs sm:text-sm text-gray-600">5-minute form about your goals</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-base sm:text-xl font-bold text-white" style={{ background: colors.primary }}>2</div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Tell Your Story</h4>
                <p className="text-xs sm:text-sm text-gray-600">Short video or essay about your journey</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-base sm:text-xl font-bold text-white" style={{ background: colors.primary }}>3</div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Review Period</h4>
                <p className="text-xs sm:text-sm text-gray-600">We review within 7 days</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-base sm:text-xl font-bold text-white" style={{ background: colors.primary }}>4</div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Start Learning</h4>
                <p className="text-xs sm:text-sm text-gray-600">Begin your tech journey</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center p-6 sm:p-12 rounded-2xl sm:rounded-3xl mx-4 sm:mx-0" style={{ background: `linear-gradient(135deg, ${colors.primary}08 0%, ${colors.secondary}08 100%)`, border: `1px solid ${colors.primary}20` }}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ready to <span style={{ color: colors.secondary }}>Build More?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-10 max-w-2xl mx-auto px-4">
              Applications are now open. Don't let anything hold you back.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link 
                to="/contact" 
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all hover:scale-105 shadow-xl text-white"
                style={{ background: colors.primary }}
              >
                Apply for Scholarship
              </Link>
              <Link 
                to="/courses" 
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                Download Brochure
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">Limited spots available. Next cohort starts soon.</p>
          </div>

          {/* Back Link */}
          <div className="mt-8 sm:mt-12 px-4">
            <Link 
              to="/women-in-tech" 
              className="inline-flex items-center gap-2 text-sm hover:underline"
              style={{ color: colors.primary }}
            >
              ← Back to Women in Tech
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}