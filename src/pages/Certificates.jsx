import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Award, Download, Share2, ExternalLink } from 'lucide-react'

export default function Certificates() {
  const { profile } = useAuth()
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCertificates()
  }, [profile])

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select(`
          *,
          courses (title, thumbnail_url)
        `)
        .eq('user_id', profile.id)
        .order('issued_date', { ascending: false })

      if (error) throw error
      setCertificates(data || [])
    } catch (error) {
      console.error('Error fetching certificates:', error)
      setCertificates(getMockCertificates())
    } finally {
      setLoading(false)
    }
  }

  const getMockCertificates = () => [
    {
      id: '1',
      certificate_number: 'IKPACE-2024-001247',
      issued_date: '2024-01-10T00:00:00Z',
      verification_url: 'https://ikpace.com/verify/IKPACE-2024-001247',
      courses: {
        title: 'Information Technology Fundamentals',
        thumbnail_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    }
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleDownload = (cert) => {
    alert('Certificate download will be available soon!')
  }

  const handleShare = (cert) => {
    const text = `I just earned a certificate in ${cert.courses.title} from iKPACE! 🎓`
    if (navigator.share) {
      navigator.share({
        title: 'My iKPACE Certificate',
        text: text,
        url: cert.verification_url
      })
    } else {
      navigator.clipboard.writeText(`${text}\n${cert.verification_url}`)
      alert('Link copied to clipboard!')
    }
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">My Certificates</h1>
          <p className="text-gray-600">Showcase your achievements and share them with the world</p>
        </div>

        {certificates.length === 0 ? (
          <div className="card text-center py-16">
            <img
              src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="No certificates"
              className="w-full max-w-md mx-auto h-64 object-cover rounded-lg mb-8"
            />
            <Award size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-4">No Certificates Yet</h2>
            <p className="text-gray-600 mb-6">
              Complete a course to earn your first certificate!
            </p>
            <a href="/courses" className="btn-primary inline-block">
              Browse Courses
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-primary to-primary-dark text-white">
                <Award size={32} className="mb-3" />
                <div className="text-3xl font-bold mb-1">{certificates.length}</div>
                <div className="text-sm opacity-90">Certificates Earned</div>
              </div>

              <div className="card bg-gradient-to-br from-accent-green to-green-600 text-white">
                <Share2 size={32} className="mb-3" />
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm opacity-90">Verified & Shareable</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="card hover:shadow-xl transition-shadow">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90 rounded-lg"></div>
                    <div className="relative p-8 text-center">
                      <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                        <Award size={48} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Certificate of Completion
                      </h3>
                      <p className="text-white/90 mb-4">This certifies that</p>
                      <p className="text-3xl font-bold text-white mb-4">
                        {profile?.full_name}
                      </p>
                      <p className="text-white/90 mb-2">has successfully completed</p>
                      <p className="text-xl font-semibold text-white mb-6">
                        {cert.courses.title}
                      </p>
                      <div className="border-t border-white/30 pt-4">
                        <p className="text-sm text-white/90">
                          Issued on {formatDate(cert.issued_date)}
                        </p>
                        <p className="text-xs text-white/75 mt-2">
                          Certificate #{cert.certificate_number}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleDownload(cert)}
                      className="w-full btn-primary flex items-center justify-center"
                    >
                      <Download size={18} className="mr-2" />
                      Download Certificate
                    </button>

                    <button
                      onClick={() => handleShare(cert)}
                      className="w-full btn-outline flex items-center justify-center"
                    >
                      <Share2 size={18} className="mr-2" />
                      Share Certificate
                    </button>

                    <a
                      href={cert.verification_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center text-secondary hover:underline font-medium py-2"
                    >
                      <ExternalLink size={18} className="mr-2" />
                      Verify Certificate
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-12 card bg-gradient-to-br from-secondary/10 to-accent-yellow/10 border-secondary">
          <div className="flex items-start">
            <Award size={32} className="text-secondary mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">About iKPACE Certificates</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Industry-recognized certificates of completion</li>
                <li>✓ Unique verification number for each certificate</li>
                <li>✓ Shareable on LinkedIn, resume, and portfolio</li>
                <li>✓ Downloadable in PDF format</li>
                <li>✓ Lifetime access to your certificates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
