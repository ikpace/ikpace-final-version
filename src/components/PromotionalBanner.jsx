import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function PromotionalBanner() {
  return (
    <div className="bg-gradient-to-r from-accent-yellow via-secondary to-primary text-white py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="text-white animate-pulse" size={28} />
            <div>
              <p className="text-lg font-bold">
                Upgrade to All Access Plus today and get 12 months for just $45
              </p>
              <p className="text-sm text-white/90">
                Save $11 on premium programs access!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              to="/pricing"
              className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              UNLOCK NOW
              <ArrowRight size={20} />
            </Link>
            <div className="hidden lg:flex items-center gap-3 text-sm">
              <Link to="/courses" className="hover:underline">
                Current Programs
              </Link>
              <span>•</span>
              <Link to="/courses" className="hover:underline">
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
