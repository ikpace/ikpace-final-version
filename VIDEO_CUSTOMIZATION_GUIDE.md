# Video Customization Guide

## Overview

The iKPACE platform includes video sections on the dashboard for welcome and orientation videos. This guide shows you how to customize these videos with your own content.

---

## Current Videos

The platform currently displays:

1. **Welcome Video** - Educational content about online learning
2. **Orientation Video** - Platform navigation and usage tips

These are placeholder videos. You should replace them with your own iKPACE-specific content.

---

## How to Add Your Own Videos

### Step 1: Upload Videos to YouTube

1. Go to [YouTube Studio](https://studio.youtube.com)
2. Upload your welcome and orientation videos
3. Set them as **Public** or **Unlisted**
4. Note the video IDs from the URLs

**Example**: If your video URL is `https://www.youtube.com/watch?v=ABC123XYZ`, the video ID is `ABC123XYZ`

### Step 2: Update Video Configuration

Edit the file: `src/config/videos.js`

```javascript
export const videoConfig = {
  welcome: {
    title: 'Welcome to iKPACE',
    description: 'Watch this video to learn about iKPACE and how to get started with your courses!',
    youtubeId: 'ABC123XYZ',  // Replace with your welcome video ID
    fallbackUrl: null
  },
  orientation: {
    title: 'Platform Orientation',
    description: 'This video will guide you through the platform and help you unlock the full potential of your learning experience.',
    youtubeId: 'DEF456UVW',  // Replace with your orientation video ID
    fallbackUrl: null
  }
}
```

### Step 3: Restart Development Server

```bash
npm run dev
```

---

## Video Requirements

### Recommended Specifications

- **Format**: MP4, MOV, or AVI
- **Resolution**: 1080p (1920x1080) or higher
- **Aspect Ratio**: 16:9
- **Length**:
  - Welcome video: 2-5 minutes
  - Orientation video: 5-10 minutes

### Content Suggestions

#### Welcome Video Should Include:
- Brief introduction to iKPACE
- Platform mission and vision
- Overview of available courses
- Student success stories (optional)
- Call to action (start learning)

#### Orientation Video Should Include:
- Dashboard navigation
- How to browse courses
- How to enroll in a course
- How to access course materials
- How to track progress
- How to get certificates
- Community features
- Support resources

---

## Alternative: Use Vimeo or Other Platforms

If you prefer to use Vimeo or another video platform instead of YouTube:

### Step 1: Update VideoPlayer Component

Edit `src/components/VideoPlayer.jsx`:

```javascript
const embedUrl = videoId && videoId !== 'YOUR_WELCOME_VIDEO_ID'
  ? `https://player.vimeo.com/video/${videoId}`  // For Vimeo
  : `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
```

### Step 2: Update Video Config

Use the appropriate video IDs for your platform.

---

## Troubleshooting

### Videos Not Playing

**Issue**: Videos show "Unable to Load Video" message

**Solutions**:
1. Check that the YouTube video is set to Public or Unlisted (not Private)
2. Verify the video ID is correct
3. Check your internet connection
4. Try refreshing the page

### Wrong Video Displays

**Issue**: Different video plays than expected

**Solution**:
- Double-check the video ID in `src/config/videos.js`
- Ensure you copied the ID correctly from YouTube URL
- Restart the development server

### Video Shows "Video Coming Soon"

**Issue**: Placeholder message instead of video

**Solution**:
- This means the video ID is set to a placeholder value
- Update the `youtubeId` in `src/config/videos.js` with a real YouTube video ID
- The video ID should NOT be 'YOUR_WELCOME_VIDEO_ID' or 'YOUR_ORIENTATION_VIDEO_ID'

---

## Customizing Video Titles and Descriptions

You can also customize the titles and descriptions shown above the videos:

```javascript
export const videoConfig = {
  welcome: {
    title: 'Your Custom Title',                    // Change this
    description: 'Your custom description here',   // Change this
    youtubeId: 'ABC123XYZ',
    fallbackUrl: null
  },
  orientation: {
    title: 'Another Custom Title',                 // Change this
    description: 'Another custom description',     // Change this
    youtubeId: 'DEF456UVW',
    fallbackUrl: null
  }
}
```

---

## Advanced: Adding More Videos

To add additional video sections (e.g., for tutorials, testimonials):

### Step 1: Update Video Config

```javascript
export const videoConfig = {
  welcome: { /* ... */ },
  orientation: { /* ... */ },
  tutorial: {
    title: 'Platform Tutorial',
    description: 'Step-by-step guide to using iKPACE',
    youtubeId: 'GHI789RST',
    fallbackUrl: null
  }
}
```

### Step 2: Add Video Section to Dashboard

Edit `src/pages/Dashboard.jsx` and add a new video section:

```jsx
<div className="card">
  <h3 className="text-xl font-bold text-primary mb-4">
    {videoConfig.tutorial.title}
  </h3>
  <VideoPlayer
    videoId={videoConfig.tutorial.youtubeId}
    title={videoConfig.tutorial.title}
    className="mb-4"
  />
  <p className="text-sm text-gray-600">
    {videoConfig.tutorial.description}
  </p>
</div>
```

---

## Best Practices

### 1. Keep Videos Concise
- Welcome: 2-3 minutes max
- Orientation: 5-8 minutes max
- Users have short attention spans

### 2. Use Captions
- Add closed captions for accessibility
- Helps non-native speakers
- Improves engagement

### 3. Professional Quality
- Use good lighting
- Clear audio
- Minimize background noise
- Use screen recording software for demos

### 4. Update Regularly
- Refresh videos when platform changes
- Keep content current
- Show latest features

### 5. Test on Multiple Devices
- Check on desktop, tablet, mobile
- Verify audio levels
- Ensure videos load quickly

---

## Testing Your Videos

After adding your videos:

1. **Clear Browser Cache**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Log in to Dashboard**: Videos should auto-play or show play button
3. **Test Playback**: Click play and verify video loads
4. **Check Responsiveness**: View on different screen sizes
5. **Verify Audio**: Ensure sound is clear

---

## Current Status

✅ **Video Player Component**: Fully functional
✅ **YouTube Integration**: Working
✅ **Fallback Handling**: Shows message when videos unavailable
✅ **Responsive Design**: Works on all devices
⚠️ **Custom Videos**: Needs your iKPACE-specific content

---

## Support

If you need help:

1. Check YouTube video privacy settings
2. Verify video ID is correct
3. Test video directly on YouTube first
4. Check browser console for errors
5. Ensure internet connection is stable

---

## Quick Reference

**Video Config File**: `src/config/videos.js`
**Video Player Component**: `src/components/VideoPlayer.jsx`
**Dashboard (displays videos)**: `src/pages/Dashboard.jsx`

**YouTube Video ID Location**:
- From URL: `https://www.youtube.com/watch?v=**VIDEO_ID_HERE**`
- From Share button: `https://youtu.be/**VIDEO_ID_HERE**`

---

**Last Updated**: February 4, 2026
**Status**: ✅ Videos Working - Ready for Customization
