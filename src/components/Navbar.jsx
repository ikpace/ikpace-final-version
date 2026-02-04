import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { BookOpen, User, LogOut, LayoutDashboard, Users, Award } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/whatsapp_image_2026-01-31_at_7.16.31_am.jpeg"
              alt="iKPACE Logo"
              className="h-14 w-auto transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg leading-tight">iKPACE</div>
              <div className="text-secondary text-xs font-semibold tracking-wide">LEARN SMARTER</div>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/courses" className="text-white hover:text-secondary transition-colors">
              Courses
            </Link>

            <Link to="/pricing" className="text-white hover:text-secondary transition-colors">
              Pricing
            </Link>

            {user && (
              <>
                <Link to="/dashboard" className="text-white hover:text-secondary transition-colors">
                  Dashboard
                </Link>
                <Link to="/career-ready" className="text-white hover:text-secondary transition-colors">
                  Career Ready
                </Link>
                <Link to="/community" className="text-white hover:text-secondary transition-colors">
                  Community
                </Link>
              </>
            )}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-white hover:text-secondary transition-colors"
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <span className="font-medium">{profile?.full_name || 'User'}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User size={18} className="mr-3" />
                      Profile
                    </Link>
                    <Link
                      to="/certificates"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Award size={18} className="mr-3" />
                      Certificates
                    </Link>
                    {profile?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <LayoutDashboard size={18} className="mr-3" />
                        Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white hover:text-secondary transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-secondary text-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
