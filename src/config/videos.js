// YouTube Video Configuration for iKPace Platform
// Using valid YouTube video IDs for testing

export const videoConfig = {
  welcome: {
    title: 'Welcome to iKPACE',
    description: 'Watch this video to learn about iKPACE and how to get started with your courses!',
    youtubeId: 'dQw4w9WgXcQ', // Popular test video
    fallbackUrl: null
  },
  orientation: {
    title: 'Platform Orientation',
    description: 'This video will guide you through the platform and help you unlock the full potential of your learning experience.',
    youtubeId: 'jNQXAC9IVRw', // First YouTube video
    fallbackUrl: null
  }
};

export const getYouTubeEmbedUrl = (videoId) => {
  if (!videoId) {
    return null
  }
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&controls=1`
}

export const getYouTubeThumbnail = (videoId) => {
  if (!videoId) {
    return 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

export default videoConfig;
