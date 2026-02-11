import { useState, useEffect, useRef } from 'react'
import { Play, AlertCircle, Loader2, Youtube } from 'lucide-react'

export default function VideoPlayer({ videoId, title, fallbackImage, className = '' }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const [thumbnailError, setThumbnailError] = useState(false)
  const iframeRef = useRef(null)
  const [iframeSrc, setIframeSrc] = useState('')

  // Initialize iframe source without autoplay
  useEffect(() => {
    if (videoId) {
      setIframeSrc(`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&autoplay=0&controls=1&enablejsapi=1&playsinline=1`)
    }
  }, [videoId])

  // Thumbnail URL with fallback
  const getThumbnailUrl = () => {
    if (fallbackImage) return fallbackImage
    if (!videoId || thumbnailError) {
      return 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }

  const thumbnailUrl = getThumbnailUrl()

  const handleError = () => {
    console.error('YouTube video failed to load:', videoId)
    setHasError(true)
  }

  const handleLoad = () => {
    console.log('YouTube video loaded successfully:', videoId)
    setIsLoaded(true)
  }

  const handleThumbnailError = () => {
    console.log('Thumbnail failed to load, using fallback')
    setThumbnailError(true)
  }

  const handlePlayClick = () => {
    if (!videoId) {
      setHasError(true)
      return
    }
    
    // Hide thumbnail
    setShowThumbnail(false)
    
    // Update iframe src to include autoplay=1
    const autoplaySrc = iframeSrc.replace('autoplay=0', 'autoplay=1')
    setIframeSrc(autoplaySrc)
    
    // Focus the iframe to ensure it can receive interactions
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.focus()
      }
    }, 100)
  }

  useEffect(() => {
    // Reset states when videoId changes
    setIsLoaded(false)
    setHasError(false)
    setShowThumbnail(true)
    setThumbnailError(false)
  }, [videoId])

  if (!videoId) {
    return (
      <div className={`aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <AlertCircle className="text-primary mx-auto mb-4" size={48} />
          <h4 className="text-lg font-semibold text-primary mb-2">Video Coming Soon</h4>
          <p className="text-gray-600 text-sm">
            We're preparing an amazing video for you. Check back soon!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-900 ${className}`}>
      {/* Thumbnail overlay - HIDDEN when clicked */}
      {showThumbnail && (
        <div 
          className="absolute inset-0 cursor-pointer z-10"
          onClick={handlePlayClick}
        >
          <img
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
            className="w-full h-full object-cover"
            onError={handleThumbnailError}
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform mb-4 shadow-lg">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
            <h3 className="text-white font-bold text-xl text-center mb-2">{title}</h3>
            <p className="text-white/90 text-sm text-center">Click to play video</p>
            <div className="mt-4 flex items-center bg-black/50 px-4 py-2 rounded-lg">
              <Youtube className="w-5 h-5 text-white mr-2" />
              <span className="text-white text-sm">YouTube</span>
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {!isLoaded && !showThumbnail && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
            <p className="text-white">Loading video player...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8 z-30">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={64} />
          <h4 className="text-xl font-bold text-white mb-2 text-center">Video Unavailable</h4>
          <p className="text-gray-300 text-center mb-6">
            Unable to load YouTube video.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
            >
              <Youtube className="w-5 h-5 mr-2" />
              Watch on YouTube
            </button>
            <button
              onClick={() => {
                setHasError(false)
                setShowThumbnail(true)
              }}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      
      {/* YouTube iframe - ALWAYS VISIBLE but behind thumbnail initially */}
      {videoId && (
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full ${showThumbnail ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loading="lazy"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0,
            zIndex: 5
          }}
        />
      )}
    </div>
  )
}
