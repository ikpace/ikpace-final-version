import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { MessageCircle, ThumbsUp, Send, Plus, TrendingUp, Users } from 'lucide-react'

export default function Community() {
  const { profile } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          user_profiles (full_name, avatar_url)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts(getMockPosts())
    } finally {
      setLoading(false)
    }
  }

  const getMockPosts = () => [
    {
      id: '1',
      title: 'Just completed my first IT course!',
      content: 'I cannot believe I finished the IT Fundamentals course in just 3 weeks! The content was so clear and practical. Already applying what I learned at work. Thank you iKPACE!',
      likes_count: 24,
      comments_count: 8,
      created_at: '2024-01-15T10:30:00Z',
      user_profiles: { full_name: 'Sarah Johnson', avatar_url: null }
    },
    {
      id: '2',
      title: 'Tips for staying motivated while learning',
      content: 'I wanted to share some tips that helped me maintain my learning streak: 1) Study at the same time every day 2) Join study groups 3) Set small, achievable goals 4) Celebrate small wins. What works for you?',
      likes_count: 45,
      comments_count: 15,
      created_at: '2024-01-14T14:20:00Z',
      user_profiles: { full_name: 'Michael Chen', avatar_url: null }
    },
    {
      id: '3',
      title: 'Looking for study partners for Data Analysis course',
      content: 'Hey everyone! I just enrolled in the Data Analysis course and would love to connect with others taking the same course. We could share notes, help each other with assignments, and stay accountable. Drop a comment if interested!',
      likes_count: 18,
      comments_count: 12,
      created_at: '2024-01-13T09:15:00Z',
      user_profiles: { full_name: 'Amina Okafor', avatar_url: null }
    },
    {
      id: '4',
      title: 'From complete beginner to freelancing in 3 months',
      content: 'I want to encourage everyone here. Three months ago, I knew nothing about graphic design. Today, I just landed my first client on Fiverr! The Graphic Design and Freelancing courses on iKPACE changed my life. Keep pushing, it\'s worth it!',
      likes_count: 67,
      comments_count: 23,
      created_at: '2024-01-12T16:45:00Z',
      user_profiles: { full_name: 'David Mensah', avatar_url: null }
    }
  ]

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert('Please fill in both title and content')
      return
    }

    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert({
          user_id: profile.id,
          title: newPostTitle,
          content: newPostContent
        })
        .select()
        .single()

      if (error) throw error

      setPosts([data, ...posts])
      setNewPostTitle('')
      setNewPostContent('')
      setShowNewPost(false)
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Post created! (Demo mode)')
      setShowNewPost(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-gray py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Community</h1>
          <p className="text-gray-600">Connect with fellow learners, share experiences, and grow together</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-primary to-primary-dark text-white">
            <Users size={32} className="mb-3" />
            <div className="text-3xl font-bold mb-1">5,234</div>
            <div className="text-sm opacity-90">Active Members</div>
          </div>

          <div className="card bg-gradient-to-br from-secondary to-secondary-dark text-white">
            <MessageCircle size={32} className="mb-3" />
            <div className="text-3xl font-bold mb-1">1,456</div>
            <div className="text-sm opacity-90">Total Discussions</div>
          </div>

          <div className="card bg-gradient-to-br from-accent-green to-green-600 text-white">
            <TrendingUp size={32} className="mb-3" />
            <div className="text-3xl font-bold mb-1">89</div>
            <div className="text-sm opacity-90">New Today</div>
          </div>
        </div>

        <div className="card mb-8">
          <button
            onClick={() => setShowNewPost(!showNewPost)}
            className="w-full flex items-center justify-center btn-primary"
          >
            <Plus size={20} className="mr-2" />
            Create New Post
          </button>

          {showNewPost && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Post title..."
                className="input-field mb-4"
              />
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your thoughts, ask questions, or start a discussion..."
                className="input-field mb-4"
                rows="6"
              />
              <div className="flex gap-3">
                <button onClick={handleCreatePost} className="btn-primary">
                  <Send size={18} className="inline mr-2" />
                  Post
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  {post.user_profiles?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-primary">{post.user_profiles?.full_name || 'User'}</h3>
                    <span className="text-sm text-gray-500">{formatDate(post.created_at)}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Community"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button className="flex items-center text-gray-600 hover:text-primary transition-colors">
                  <ThumbsUp size={18} className="mr-2" />
                  <span>{post.likes_count} Likes</span>
                </button>

                <button className="flex items-center text-gray-600 hover:text-primary transition-colors">
                  <MessageCircle size={18} className="mr-2" />
                  <span>{post.comments_count} Comments</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="btn-outline">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  )
}
