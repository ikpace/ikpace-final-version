# Video Setup Guide - Quick Reference

## How to Update Welcome and Orientation Videos

### Step 1: Get Your YouTube Video ID

From your YouTube video URL, extract the ID:

**Example URL:**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                 └─────────┘
                                  Video ID
```

The video ID is: `dQw4w9WgXcQ`

### Step 2: Update Configuration File

Open `/src/config/videos.js` and replace the placeholder IDs:

```javascript
export const videoConfig = {
  welcome: {
    title: 'Welcome to iKPACE',
    description: 'Watch this video to learn about iKPACE and how to get started with your courses!',
    youtubeId: 'YOUR_WELCOME_VIDEO_ID',  // ← Replace this
    fallbackUrl: null
  },
  orientation: {
    title: 'Platform Orientation',
    description: 'This video will guide you through the platform and help you unlock the full potential of your learning experience.',
    youtubeId: 'YOUR_ORIENTATION_VIDEO_ID',  // ← Replace this
    fallbackUrl: null
  }
}
```

**Example with actual IDs:**
```javascript
export const videoConfig = {
  welcome: {
    title: 'Welcome to iKPACE',
    description: 'Watch this video to learn about iKPACE and how to get started with your courses!',
    youtubeId: 'dQw4w9WgXcQ',  // Your actual video ID
    fallbackUrl: null
  },
  orientation: {
    title: 'Platform Orientation',
    description: 'This video will guide you through the platform and help you unlock the full potential of your learning experience.',
    youtubeId: 'abc123XYZ',  // Your actual video ID
    fallbackUrl: null
  }
}
```

### Step 3: Rebuild and Deploy

```bash
npm run build
```

That's it! Your videos will now display on the dashboard.

---

## Video Requirements

### YouTube Video Settings
- ✅ Video must be **Public** or **Unlisted** (not Private)
- ✅ Embedding must be **Enabled**
- ✅ HD quality recommended (720p or 1080p)

### To Check Embedding Settings:
1. Go to YouTube Studio
2. Select your video
3. Click "Details"
4. Scroll to "Advanced settings"
5. Under "Distribution options", ensure "Allow embedding" is checked

---

## Troubleshooting

### Videos Show "Coming Soon" Message
**Cause**: Video IDs not updated or still set to placeholder
**Fix**: Update the `youtubeId` values in `/src/config/videos.js`

### Videos Show Error Message
**Possible Causes**:
1. Video is set to Private on YouTube
2. Video ID is incorrect
3. Embedding is disabled
4. Video has been deleted

**Fix**:
1. Verify video exists on YouTube
2. Check video ID is correct (11 characters)
3. Ensure embedding is enabled
4. Make video Public or Unlisted

### Videos Won't Load
**Possible Causes**:
1. Internet connection issues
2. YouTube service outage
3. Browser blocking embedded content
4. Ad blockers interfering

**Fix**:
1. Check internet connection
2. Try different browser
3. Disable ad blockers temporarily
4. Check YouTube status page

---

## Testing Your Videos

After updating the configuration:

1. **Run the development server**:
   ```bash
   npm run dev
   ```

2. **Login to the dashboard**

3. **Verify both videos load**:
   - Welcome Video (left)
   - Orientation Video (right)

4. **Test playback**:
   - Click play button
   - Verify video plays smoothly
   - Check controls work (pause, volume, fullscreen)

5. **Test on mobile**:
   - Open on mobile device
   - Verify responsive layout
   - Test video playback

---

## Advanced: Using Custom Video Sources

If you want to use videos from sources other than YouTube:

### Step 1: Update the VideoPlayer Component

Edit `/src/components/VideoPlayer.jsx` to support your video source.

### Step 2: Update Config

```javascript
export const videoConfig = {
  welcome: {
    youtubeId: null,
    fallbackUrl: 'https://your-cdn.com/welcome.mp4',  // Direct video URL
  }
}
```

### Supported Formats:
- MP4 (recommended)
- WebM
- Ogg

---

## Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Support

For technical issues with video setup:
- Email: support@ikpace.com
- Check: IMPLEMENTATION_GUIDE.md for detailed documentation

---

**Last Updated**: February 2026
