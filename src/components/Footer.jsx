import { Link } from 'react-router-dom'
import { Mail, BookOpen, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={32} />
              <span className="text-2xl font-bold">iKPACE</span>
            </div>
            <p className="text-white/80 mb-4">
              Empowering learners with world-class digital skills education
            </p>
            <p className="text-2xl font-bold text-accent-yellow mb-2">
              #learn smarter
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-white/80 hover:text-white transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/80 hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/career-ready" className="text-white/80 hover:text-white transition-colors">
                  Career Ready
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-white/80 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="text-white/80 hover:text-white transition-colors">
                  Certificates
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-white/80 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <a href="mailto:info@ikpace.com" className="text-white/80 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="space-y-4">
              <a
                href="https://www.tiktok.com/@ikpace"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <span>@ikpace</span>
              </a>

              <a
                href="https://www.linkedin.com/company/ikpacelearning"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Linkedin size={20} />
                </div>
                <span>@ikpacelearning</span>
              </a>

              <a
                href="https://www.instagram.com/ikpacelearning"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Instagram size={20} />
                </div>
                <span>@ikpacelearning</span>
              </a>

              <a
                href="mailto:info@ikpace.com"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail size={20} />
                </div>
                <span>info@ikpace.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; 2026 iKPACE. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-white/60 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
