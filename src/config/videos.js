export const videoConfig = {
  welcome: {
    title: 'Welcome to iKPACE',
    description: 'Watch this video to learn about iKPACE and how to get started with your courses!',
    youtubeId: 'YOUR_WELCOME_VIDEO_ID',
    fallbackUrl: null
  },
  orientation: {
    title: 'Platform Orientation',
    description: 'This video will guide you through the platform and help you unlock the full potential of your learning experience.',
    youtubeId: 'YOUR_ORIENTATION_VIDEO_ID',
    fallbackUrl: null
  }
}

export const getYouTubeEmbedUrl = (videoId) => {
  if (!videoId || videoId === 'YOUR_WELCOME_VIDEO_ID' || videoId === 'YOUR_ORIENTATION_VIDEO_ID') {
    return null
  }
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
}

export const getYouTubeThumbnail = (videoId) => {
  if (!videoId || videoId === 'YOUR_WELCOME_VIDEO_ID' || videoId === 'YOUR_ORIENTATION_VIDEO_ID') {
    return 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}
