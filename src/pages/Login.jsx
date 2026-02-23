import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff, 
  Shield, Sparkles, BookOpen, Users, Award, ChevronRight,
  Github, Twitter, Linkedin, Facebook, Globe
} from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get where user was trying to go
  const from = location.state?.from?.pathname || '/'

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

  useEffect(() => {
    // Pre-fill email if coming from registration
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email.trim(), password.trim())
      
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email.trim())
      } else {
        localStorage.removeItem('rememberedEmail')
      }
      
      navigate(from, { replace: true })
    } catch (err) {
      console.error("LOGIN ERROR:", err)
      setError(err.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Login with ${provider}`)
  }

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left Side - Image/Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`
        }}>
          {/* Animated Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ 
              background: 'radial-gradient(circle at 30% 50%, white 0%, transparent 50%)',
              animation: 'pulse 4s ease-in-out infinite'
            }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-16 text-white">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-16 group">
              <img 
                
                
              />
              
             
            </Link>

            <h1 className="text-5xl font-bold mb-6">
              Welcome Back to{' '}
              <span style={{ color: colors.secondary }}>iKPACE</span>
            </h1>
            
            <p className="text-xl opacity-90 mb-12 max-w-md">
              Continue your learning journey. Access your courses, track progress, and connect with peers.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-16">
              <div>
                <div className="text-3xl font-bold mb-1">50k+</div>
                <div className="text-sm opacity-80">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">15+</div>
                <div className="text-sm opacity-80">Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">94%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md">
              <p className="text-sm italic mb-4">
                "iKPACE transformed my career. The structured learning path and community support made all the difference."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  SA
                </div>
                <div>
                  <p className="font-semibold">Sarah Adebayo</p>
                  <p className="text-xs opacity-80">Software Engineer at Google</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm opacity-60">
            © 2025 iKPACE. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Access your account to continue learning</p>
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
                  <p className="text-red-700 font-medium">Login Failed</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Social Login */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              className="p-3 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <Globe size={20} className="mx-auto text-gray-600 group-hover:text-orange-500" />
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              className="p-3 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <Github size={20} className="mx-auto text-gray-600 group-hover:text-orange-500" />
            </button>
            <button
              onClick={() => handleSocialLogin('linkedin')}
              className="p-3 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <Linkedin size={20} className="mx-auto text-gray-600 group-hover:text-orange-500" />
            </button>
            <button
              onClick={() => handleSocialLogin('twitter')}
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
              <span className="px-4 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm hover:underline"
                  style={{ color: colors.primary }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock size={20} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="••••••••"
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
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  style={{ accentColor: colors.secondary }}
                />
                <span className="text-sm text-gray-600">Remember me</span>
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
              <div className="relative flex items-center justify-center gap-2 py-3.5 text-white font-semibold">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="font-semibold hover:underline inline-flex items-center gap-1"
                style={{ color: colors.secondary }}
              >
                Sign up now
                <ChevronRight size={16} />
              </Link>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500">
              <div className="flex flex-col items-center gap-1">
                <Shield size={16} style={{ color: colors.success }} />
                <span>Secure Login</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Users size={16} style={{ color: colors.primary }} />
                <span>50k+ Students</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Award size={16} style={{ color: colors.secondary }} />
                <span>Certified</span>
              </div>
            </div>
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