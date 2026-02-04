import { useState } from 'react'
import { Play, AlertCircle } from 'lucide-react'

export default function VideoPlayer({ videoId, title, fallbackImage, className = '' }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const embedUrl = videoId && videoId !== 'YOUR_WELCOME_VIDEO_ID' && videoId !== 'YOUR_ORIENTATION_VIDEO_ID'
    ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`
    : null

  const thumbnailUrl = fallbackImage || (videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800')

  const handleError = () => {
    setHasError(true)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  if (!embedUrl) {
    return (
      <div className={`aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <AlertCircle className="text-primary mx-auto mb-4" size={48} />
          <h4 className="text-lg font-semibold text-primary mb-2">Video Coming Soon</h4>
          <p className="text-gray-600 text-sm">
            This video will be available shortly. Check back later!
          </p>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className={`aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <AlertCircle className="text-gray-400 mx-auto mb-4" size={48} />
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Unable to Load Video</h4>
          <p className="text-gray-600 text-sm">
            Please check your internet connection and try refreshing the page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`aspect-video bg-gray-100 rounded-lg overflow-hidden relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
              <Play className="text-primary ml-1" size={32} fill="currentColor" />
            </div>
          </div>
        </div>
      )}
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
        className="w-full h-full"
      />
    </div>
  )
}
