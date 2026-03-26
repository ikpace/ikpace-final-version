// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react"
import { supabase } from "../supabaseClient"

const AuthContext = createContext()

const captureAffiliateRef = () => {
  const params = new URLSearchParams(window.location.search)
  const ref = params.get('ref')
  if (ref) {
    localStorage.setItem('affiliate_ref', ref)
    console.log("🟢 Affiliate ref captured:", ref)
  }
}

const getStoredAffiliateRef = () => localStorage.getItem('affiliate_ref')
const clearAffiliateRef = () => localStorage.removeItem('affiliate_ref')

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const initRef = useRef(false)
  const mountedRef = useRef(true)
  const authTimeoutRef = useRef(null)

  useEffect(() => {
    captureAffiliateRef()
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (authTimeoutRef.current) clearTimeout(authTimeoutRef.current)
    }
  }, [])

  const fetchProfile = useCallback(async (userId) => {
    if (!userId) return null
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()
      if (error) {
        console.error("🔴 Error fetching profile:", error)
        return null
      }
      if (mountedRef.current) setProfile(data)
      return data
    } catch (error) {
      console.error("🔴 Error in fetchProfile:", error)
      return null
    }
  }, [])

  const generateReferralCode = (fullName) => {
    const prefix = (fullName || 'USR').substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '') || 'USR'
    const random = Math.floor(Math.random() * 9000 + 1000)
    let code = `${prefix}${random}`
    return code.replace(/[^A-Z0-9]/g, '').slice(0, 8)
  }

  // ✅ Uses upsert to avoid 409 duplicate errors from trigger
  const createOrUpdateProfile = useCallback(async (userId, userMeta) => {
    const fullName = userMeta?.full_name || userMeta?.email?.split('@')[0] || 'User'
    const email = userMeta?.email || null
    const newReferralCode = generateReferralCode(fullName)

    // Use upsert — if trigger already created the row, this updates it
    // If row doesn't exist, this creates it
    const { error: upsertError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        email: email,
        full_name: fullName,
        referral_code: newReferralCode,
        referral_points: 0
      }, {
        onConflict: 'id',
        ignoreDuplicates: false   // update if exists
      })

    if (upsertError) {
      console.error("🔴 Error upserting profile:", upsertError)
      // Even if upsert fails, try to fetch whatever exists
      return fetchProfile(userId)
    }

    // ✅ Link referral if ref stored in localStorage
    const affiliateRef = getStoredAffiliateRef()
    if (affiliateRef) {
      console.log("🔵 Auto-linking affiliate ref:", affiliateRef)
      try {
        const { error: rpcError } = await supabase.rpc('link_referral', {
          p_code: affiliateRef,
          p_email: email,
          p_user_id: userId
        })
        if (rpcError) {
          // Fallback: direct insert if RPC fails
          const { data: referrer } = await supabase
            .from('profiles').select('id').eq('referral_code', affiliateRef).maybeSingle()
          if (referrer && referrer.id !== userId) {
            await supabase.from('referrals').insert({
              referrer_id: referrer.id,
              referred_user_id: userId,
              referred_email: email,
              status: 'pending'
            })
          }
        } else {
          console.log("🟢 Affiliate ref linked via RPC!")
        }
        clearAffiliateRef()
      } catch (err) {
        console.error("🔴 Referral link error:", err)
      }
    }

    return fetchProfile(userId)
  }, [fetchProfile])

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    const initSession = async (retryCount = 0) => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          if (error.message?.includes('Invalid Refresh Token') || error.message?.includes('Refresh Token Not Found')) {
            console.log("🟡 No valid session")
          } else if (error.message?.includes('lock') && retryCount < 3) {
            await new Promise(r => setTimeout(r, 1000 * (retryCount + 1)))
            return initSession(retryCount + 1)
          } else {
            console.error("🔴 Session error:", error)
          }
        }

        console.log("🟢 Initial session:", session?.user?.email || "No session")

        if (mountedRef.current) {
          setUser(session?.user ?? null)
          if (session?.user) {
            let userProfile = await fetchProfile(session.user.id)
            if (!userProfile) {
              userProfile = await createOrUpdateProfile(session.user.id, {
                full_name: session.user.user_metadata?.full_name,
                email: session.user.email
              })
            }
          }
        }
      } catch (err) {
        console.error("🔴 Error in initSession:", err)
      } finally {
        if (mountedRef.current) setLoading(false)
      }
    }

    initSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (authTimeoutRef.current) clearTimeout(authTimeoutRef.current)
        authTimeoutRef.current = setTimeout(async () => {
          console.log("🟡 Auth state changed:", _event, session?.user?.email || "No user")
          if (!mountedRef.current) return

          setUser(session?.user ?? null)

          if (session?.user) {
            let userProfile = await fetchProfile(session.user.id)
            if (!userProfile) {
              userProfile = await createOrUpdateProfile(session.user.id, {
                full_name: session.user.user_metadata?.full_name,
                email: session.user.email
              })
            }
          } else {
            setProfile(null)
          }

          setLoading(false)
        }, 100)
      }
    )

    return () => {
      subscription?.unsubscribe()
      if (authTimeoutRef.current) clearTimeout(authTimeoutRef.current)
    }
  }, [fetchProfile, createOrUpdateProfile])

  // ============================================
  // GET USER PROFILE (for payment component)
  // ============================================
  const getUserProfile = async (userId) => {
    if (!userId) return null
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()
      if (error) throw error
      return data
    } catch (error) {
      console.error("Error fetching profile:", error)
      return null
    }
  }

  // ============================================
  // CHECK ENROLLMENT (for course player)
  // ============================================
  const checkEnrollment = async (userId, courseId) => {
    if (!userId || !courseId) return null
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('id, status')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .maybeSingle()
      if (error) throw error
      return data
    } catch (error) {
      console.error("Error checking enrollment:", error)
      return null
    }
  }

  // ============================================
  // GET USER ENROLLMENTS (for dashboard)
  // ============================================
  const getUserEnrollments = async (userId) => {
    if (!userId) return []
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('enrolled_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching enrollments:", error)
      return []
    }
  }

  // ============================================
  // GET USER PAYMENTS
  // ============================================
  const getUserPayments = async (userId) => {
    if (!userId) return []
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching payments:", error)
      return []
    }
  }

  // ============================================
  // SIGN UP — auto signs in after registration
  // ============================================
  const signUp = async (email, password, fullName, extraData = {}) => {
    console.log("🔵 Signing up:", email)
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      })

      if (signUpError) throw signUpError
      if (!authData.user) throw new Error("User creation failed")

      console.log("🟢 User created:", authData.user.id)

      // Profile is created by DB trigger — we update it with extra fields
      await supabase.from('profiles').update({
        full_name: fullName,
        phone: extraData.phone || null,
        phone_number: extraData.phoneDigits || null,
        phone_dial_code: extraData.phoneDialCode || null,
      }).eq('id', authData.user.id)

      // ✅ Link referral using RPC
      const affiliateRef = getStoredAffiliateRef()
      if (affiliateRef) {
        try {
          const { error: rpcError } = await supabase.rpc('link_referral', {
            p_code: affiliateRef,
            p_email: email,
            p_user_id: authData.user.id
          })
          if (!rpcError) {
            console.log("🟢 Referral linked!")
            clearAffiliateRef()
          } else {
            // Fallback direct insert
            const { data: referrer } = await supabase
              .from('profiles').select('id').eq('referral_code', affiliateRef).maybeSingle()
            if (referrer && referrer.id !== authData.user.id) {
              await supabase.from('referrals').insert({
                referrer_id: referrer.id,
                referred_user_id: authData.user.id,
                referred_email: email,
                status: 'pending'
              })
              clearAffiliateRef()
            }
          }
        } catch (err) {
          console.error("🔴 Referral error:", err)
        }
      }

      // ✅ Auto sign in immediately after signup
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) {
        console.warn("🟡 Auto sign-in failed:", signInError.message)
        // Don't throw — user was created, just needs to log in manually
        return { user: authData.user, session: null }
      }

      console.log("🟢 Auto sign-in successful after signup")

      if (mountedRef.current && signInData.user) {
        setUser(signInData.user)
        const prof = await fetchProfile(signInData.user.id)
        if (prof) setProfile(prof)
      }

      return { user: signInData.user, session: signInData.session }
    } catch (error) {
      console.error("🔴 Sign up error:", error)
      throw error
    }
  }

  // ============================================
  // SIGN IN
  // ============================================
  const signIn = async (email, password) => {
    console.log("🔵 Signing in:", email)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        if (error.message.includes('Invalid login credentials')) throw new Error('Invalid email or password')
        throw error
      }
      console.log("🟢 Sign in successful:", data.user?.email)

      if (mountedRef.current && data.user) {
        setUser(data.user)
        let userProfile = await fetchProfile(data.user.id)
        if (!userProfile) {
          userProfile = await createOrUpdateProfile(data.user.id, {
            full_name: data.user.user_metadata?.full_name,
            email: data.user.email
          })
        }
        if (userProfile && mountedRef.current) setProfile(userProfile)
      }

      return data.user
    } catch (error) {
      console.error("🔴 Sign in error:", error)
      throw error
    }
  }

  // ============================================
  // LOGOUT
  // ============================================
  const logout = async () => {
    console.log("🔵 Logging out")
    try {
      await supabase.auth.signOut()
      if (mountedRef.current) { setUser(null); setProfile(null) }
      console.log("🟢 Logout successful")
    } catch (error) {
      console.error("🔴 Logout error:", error)
    }
  }

  // ============================================
  // LINK REFERRAL (manual call)
  // ============================================
  const linkReferral = async (referralCode, email, userId) => {
    console.log("🔵 Linking referral:", referralCode)
    try {
      const { error } = await supabase.rpc('link_referral', {
        p_code: referralCode, p_email: email, p_user_id: userId
      })
      if (error) { console.error("🔴 Error linking referral:", error); return false }
      console.log("🟢 Referral linked!")
      return true
    } catch (err) {
      console.error("🔴 Referral linking error:", err); return false
    }
  }

  // ============================================
  // GET REFERRAL DATA
  // ============================================
  const getReferralData = async () => {
    if (!user) return null
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('referral_code, referral_points')
        .eq('id', user.id)
        .maybeSingle()
      if (error) throw error
      return data
    } catch (error) {
      console.error("Error fetching referral data:", error)
      return null
    }
  }

  // ============================================
  // GET REFERRALS LIST — uses referrals table
  // ============================================
  const getReferralsList = async () => {
    if (!user) return []
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false })
      if (error) return []
      return data || []
    } catch (error) {
      console.error("Error fetching referrals list:", error)
      return []
    }
  }

  // ============================================
  // GET REFERRAL STATS — for dashboard counts
  // ============================================
  const getReferralStats = async () => {
    if (!user) return { total: 0, completed: 0, points: 0 }
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('status, points_awarded')
        .eq('referrer_id', user.id)

      if (error) throw error

      const total     = data?.length || 0
      const completed = data?.filter(r => r.status === 'completed').length || 0
      const points    = data?.reduce((sum, r) => sum + (r.points_awarded || 0), 0) || 0

      return { total, completed, points }
    } catch (error) {
      console.error("Error fetching referral stats:", error)
      return { total: 0, completed: 0, points: 0 }
    }
  }

  // ============================================
  // REDEEM REWARD
  // ============================================
  const redeemReward = async (rewardName, pointsCost) => {
    if (!user) return { success: false, error: "Not logged in" }
    try {
      const { data: profileData, error: fetchError } = await supabase
        .from('profiles').select('referral_points').eq('id', user.id).maybeSingle()
      if (fetchError) throw fetchError
      if (!profileData || profileData.referral_points < pointsCost)
        return { success: false, error: "Insufficient points" }
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ referral_points: profileData.referral_points - pointsCost })
        .eq('id', user.id)
      if (updateError) throw updateError
      await fetchProfile(user.id)
      return { success: true, error: null }
    } catch (error) {
      console.error("Error redeeming reward:", error)
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    profile,
    signUp,
    signIn,
    logout,
    loading,
    // New helper functions for payment and enrollment
    getUserProfile,
    checkEnrollment,
    getUserEnrollments,
    getUserPayments,
    // Referral functions
    linkReferral,
    getReferralData,
    getReferralsList,
    getReferralStats,
    redeemReward
  }

  console.log("🟡 AuthProvider state:", {
    user: user?.email || "No user",
    profile: profile?.full_name || "No profile",
    loading
  })

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}