import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Upload, Award, Users, Share2, CheckCircle, Star, TrendingUp, Gift } from 'lucide-react'

export default function CareerReady() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [cvFile, setCvFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [successStory, setSuccessStory] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleCvUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!user) {
      navigate('/register')
      return
    }

    setCvFile(file)
  }

  const handleSubmit = async () => {
    if (!user) {
      navigate('/register')
      return
    }

    setUploading(true)

    try {
      let cvUrl = null

      if (cvFile) {
        const fileExt = cvFile.name.split('.').pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('cvs')
          .upload(fileName, cvFile)

        if (!uploadError) {
          const { data } = supabase.storage.from('cvs').getPublicUrl(fileName)
          cvUrl = data.publicUrl
        }
      }

      await supabase
        .from('user_profiles')
        .update({
          cv_url: cvUrl || profile?.cv_url,
          career_ready: true
        })
        .eq('id', user.id)

      if (successStory) {
        await supabase
          .from('community_posts')
          .insert({
            user_id: user.id,
            title: 'My Success Story',
            content: successStory
          })
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting:', error)
      alert('There was an error. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-green/10 to-primary/10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center py-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-accent-green rounded-full mb-6">
              <Award className="text-white" size={64} />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              Congratulations! You've Earned 250 Legacy Points!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              You're now officially Career Ready! Your profile has been updated and you're one step closer to your dream career.
            </p>
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mb-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Your Rewards:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <Star className="text-accent-yellow mx-auto mb-2" size={32} />
                  <p className="font-bold text-primary">250 Legacy Points</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <Gift className="text-secondary mx-auto mb-2" size={32} />
                  <p className="font-bold text-primary">Career Ready Badge</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary text-lg"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-gray py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-4">
            <Award className="text-white" size={48} />
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">
            Be Career Ready & Earn 250 Legacy Points!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete your professional profile, upload your CV, and share your success story to unlock exclusive rewards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="text-primary" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-primary">Upload Your CV</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Keep your CV up to date to showcase your skills and experience to potential employers and collaborators.
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCvUpload}
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="text-primary mb-4" size={48} />
                <p className="font-semibold text-primary mb-2">
                  {cvFile ? cvFile.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-600">
                  PDF, DOC, or DOCX (max. 5MB)
                </p>
              </label>
            </div>
            {cvFile && (
              <div className="mt-4 p-4 bg-accent-green/10 border border-accent-green/20 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-accent-green" size={24} />
                <span className="text-accent-green font-semibold">CV ready to upload!</span>
              </div>
            )}
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Share2 className="text-secondary" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-primary">Share Your Success</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Inspire others by sharing your journey, achievements, and the impact iKPACE has had on your career.
            </p>
            <textarea
              value={successStory}
              onChange={(e) => setSuccessStory(e.target.value)}
              placeholder="Tell us about your success story... What have you achieved? How has your learning journey transformed your career?"
              className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none resize-none"
            />
            <p className="text-sm text-gray-600 mt-2">
              Your story will be shared in our community to inspire other learners
            </p>
          </div>
        </div>

        <div className="card mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">What You'll Get</h2>
            <p className="text-gray-600">Complete your Career Ready profile and unlock these rewards</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-yellow/10 rounded-full mb-3">
                <Star className="text-accent-yellow" size={32} />
              </div>
              <h3 className="font-bold text-primary mb-2">250 Points</h3>
              <p className="text-sm text-gray-600">Legacy Points added to your account</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
                <Award className="text-primary" size={32} />
              </div>
              <h3 className="font-bold text-primary mb-2">Badge</h3>
              <p className="text-sm text-gray-600">Career Ready achievement badge</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-3">
                <TrendingUp className="text-secondary" size={32} />
              </div>
              <h3 className="font-bold text-primary mb-2">Visibility</h3>
              <p className="text-sm text-gray-600">Enhanced profile visibility</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-green/10 rounded-full mb-3">
                <Gift className="text-accent-green" size={32} />
              </div>
              <h3 className="font-bold text-primary mb-2">Perks</h3>
              <p className="text-sm text-gray-600">Exclusive career opportunities</p>
            </div>
          </div>
        </div>

        <div className="card mb-12 bg-gradient-to-br from-secondary/10 to-accent-yellow/10 border-2 border-secondary/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-secondary to-accent-yellow rounded-full flex items-center justify-center">
                <Users className="text-white" size={64} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Become an iKPACE Ambassador
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Invite your friends and family to join iKPACE and earn rewards for every successful referral.
                Help others discover quality tech education while building your legacy points!
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white p-4 rounded-lg flex items-center gap-3 flex-1 min-w-[200px]">
                  <CheckCircle className="text-accent-green flex-shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-primary">Earn Points</p>
                    <p className="text-sm text-gray-600">100 points per referral</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg flex items-center gap-3 flex-1 min-w-[200px]">
                  <CheckCircle className="text-accent-green flex-shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-primary">Exclusive Rewards</p>
                    <p className="text-sm text-gray-600">Unlock special perks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={uploading || (!cvFile && !successStory)}
            className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Submitting...' : 'Complete Career Ready Profile'}
          </button>
          {!cvFile && !successStory && (
            <p className="text-sm text-gray-600 mt-4">
              Upload your CV or share your success story to continue
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
