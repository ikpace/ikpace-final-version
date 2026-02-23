import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { 
  Mail, Lock, User, AlertCircle, Eye, EyeOff, 
  CheckCircle, XCircle, ArrowRight, Shield, Award,
  BookOpen, Users, Sparkles, ChevronRight, Github,
  Twitter, Linkedin, Globe, Heart, Target, Rocket
} from "lucide-react"

export default function Register() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    number: false,
    uppercase: false,
    lowercase: false,
    special: false
  })

  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    warning: "#E6B800",
    dark: "#1F2937",
    lightGray: "#F3F4F6",
    blueShade: "#4A6FA5",
    orangeShade: "#FF9A3C",
    white: "#FFFFFF"
  }

  const { signUp, logout } = useAuth()
  const navigate = useNavigate()

  // Password strength checker
  useEffect(() => {
    const checks = {
      length: password.length >= 8,
      number: /\d/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
    setPasswordChecks(checks)
    
    const strength = Object.values(checks).filter(Boolean).length
    setPasswordStrength(strength)
  }, [password])

  const getPasswordStrengthText = () => {
    if (password.length === 0) return ""
    if (passwordStrength <= 2) return "Weak"
    if (passwordStrength <= 4) return "Medium"
    return "Strong"
  }

  const getPasswordStrengthColor = () => {
    if (password.length === 0) return colors.lightGray
    if (passwordStrength <= 2) return "#EF4444" // Red
    if (passwordStrength <= 4) return colors.warning
    return colors.success
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions.")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    if (passwordStrength < 3) {
      setError("Please choose a stronger password.")
      setLoading(false)
      return
    }

    try {
      await signUp(
        email.trim(),
        password.trim(),
        fullName.trim()
      )

      await logout()
      navigate("/login", { 
        state: { 
          message: "Registration successful! Please check your email to verify your account." 
        },
        replace: true 
      })

    } catch (err) {
      console.error("SIGNUP ERROR:", err)
      setError(err.message || "Failed to sign up.")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignUp = (provider) => {
    // Implement social signup logic here
    console.log(`Sign up with ${provider}`)
  }

  return (
    <div className="min-h-screen flex items-stretch bg-white">
      {/* Left Side - Brand/Testimonials */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`
        }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ 
              background: 'radial-gradient(circle at 30% 50%, white 0%, transparent 50%)',
              animation: 'pulse 4s ease-in-out infinite'
            }}></div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-16 text-white">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-16 group">
              
            </Link>

            <h1 className="text-5xl font-bold mb-6">
              Start Your <span style={{ color: colors.secondary }}>Learning Journey</span>
            </h1>
            
            <p className="text-xl opacity-90 mb-12 max-w-md">
              Join 50,000+ students already learning on iKPACE. Get access to expert-led courses, community support, and career opportunities.
            </p>

            {/* Benefits List */}
            <div className="space-y-6 mb-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">15+ Expert-Led Courses</h3>
                  <p className="text-sm opacity-80">Learn from industry professionals</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Active Community</h3>
                  <p className="text-sm opacity-80">Connect with 50k+ learners</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Certified Programs</h3>
                  <p className="text-sm opacity-80">Earn recognized certificates</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md">
              <p className="text-sm italic mb-4">
                "iKPACE gave me the skills and confidence to switch careers. Now I'm a software developer at a top tech company."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  MK
                </div>
                <div>
                  <p className="font-semibold">Michael K.</p>
                  <p className="text-xs opacity-80">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm opacity-60">
            © 2025 iKPACE. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img 
                src="/whatsapp_image_2026-01-31_at_7.16.31_am.jpeg" 
                alt="iKPACE" 
                className="h-12 w-12"
              />
              <div className="text-left">
                <div className="font-bold text-xl" style={{ color: colors.primary }}>iKPACE</div>
                <div className="text-xs" style={{ color: colors.secondary }}>LEARN SMARTER</div>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Start your learning journey today</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl animate-shake" style={{ 
              background: '#FEE2E2',
              border: '1px solid #FCA5A5'
            }}>
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-red-700 font-medium">Registration Failed</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Social Sign Up */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <button
              onClick={() => handleSocialSignUp('google')}
              className="p-3 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <Globe size={20} className="mx-auto text-gray-600 group-hover:text-orange-500" />
            </button>
            <button
              onClick={() => handleSocialSignUp('github')}
              className="p-3 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <Github size={20} className="mx-auto text-gray-600 group-hover:text-orange-500" />
            </button>
            <button
              onClick={() => handleSocialSignUp('linkedin')}
              className="p-3 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <Linkedin size={20} className="mx-auto text-gray-600 group-hover:text-orange-500" />
            </button>
            <button
              onClick={() => handleSocialSignUp('twitter')}
              className="p-3 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <Twitter size={20} className="mx-auto text-gray-600 group-hover:text-orange-500" />
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <User size={20} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail size={20} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock size={20} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {password.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300"
                        style={{ 
                          width: `${(passwordStrength / 5) * 100}%`,
                          background: getPasswordStrengthColor()
                        }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium ml-3" style={{ color: getPasswordStrengthColor() }}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      {passwordChecks.length ? 
                        <CheckCircle size={12} style={{ color: colors.success }} /> : 
                        <XCircle size={12} className="text-gray-300" />
                      }
                      <span className={passwordChecks.length ? "text-gray-700" : "text-gray-400"}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {passwordChecks.number ? 
                        <CheckCircle size={12} style={{ color: colors.success }} /> : 
                        <XCircle size={12} className="text-gray-300" />
                      }
                      <span className={passwordChecks.number ? "text-gray-700" : "text-gray-400"}>
                        Contains number
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {passwordChecks.uppercase ? 
                        <CheckCircle size={12} style={{ color: colors.success }} /> : 
                        <XCircle size={12} className="text-gray-300" />
                      }
                      <span className={passwordChecks.uppercase ? "text-gray-700" : "text-gray-400"}>
                        Uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {passwordChecks.lowercase ? 
                        <CheckCircle size={12} style={{ color: colors.success }} /> : 
                        <XCircle size={12} className="text-gray-300" />
                      }
                      <span className={passwordChecks.lowercase ? "text-gray-700" : "text-gray-400"}>
                        Lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {passwordChecks.special ? 
                        <CheckCircle size={12} style={{ color: colors.success }} /> : 
                        <XCircle size={12} className="text-gray-300" />
                      }
                      <span className={passwordChecks.special ? "text-gray-700" : "text-gray-400"}>
                        Special character
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock size={20} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {confirmPassword.length > 0 && (
                <div className="mt-2 flex items-center gap-1 text-xs">
                  {password === confirmPassword ? (
                    <>
                      <CheckCircle size={12} style={{ color: colors.success }} />
                      <span style={{ color: colors.success }}>Passwords match</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={12} className="text-red-500" />
                      <span className="text-red-500">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                style={{ accentColor: colors.secondary }}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="/terms" className="font-medium hover:underline" style={{ color: colors.primary }}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="font-medium hover:underline" style={{ color: colors.primary }}>
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden group rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent transition-transform group-hover:scale-105" style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
              }}></div>
              <div className="relative flex items-center justify-center gap-2 py-4 text-white font-semibold">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-semibold hover:underline inline-flex items-center gap-1"
                style={{ color: colors.secondary }}
              >
                Sign in
                <ChevronRight size={16} />
              </Link>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500">
              <div className="flex flex-col items-center gap-1">
                <Shield size={16} style={{ color: colors.success }} />
                <span>Secure Registration</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Heart size={16} style={{ color: colors.secondary }} />
                <span>Free Access</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Target size={16} style={{ color: colors.primary }} />
                <span>Career Focused</span>
              </div>
            </div>
          </div>

          {/* Already Learning Stats */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              <span className="font-bold" style={{ color: colors.primary }}>50,000+</span> students already learning
            </p>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}