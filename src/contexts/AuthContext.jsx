import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("🔵 AuthProvider initializing...")
    
    // Get current session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error("🔴 Error getting session:", error)
        }
        
        console.log("🟢 Initial session:", session?.user?.email || "No session")
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("🔴 Error in getInitialSession:", error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("🟡 Auth state changed:", _event, session?.user?.email || "No user")
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      console.log("🔴 Cleaning up auth subscription")
      subscription?.unsubscribe()
    }
  }, [])

  const signUp = async (email, password, fullName) => {
    console.log("🔵 Signing up:", email)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      })

      if (error) throw error
      console.log("🟢 Sign up successful:", data.user?.email)
      return data.user
    } catch (error) {
      console.error("🔴 Sign up error:", error)
      throw error
    }
  }

  const signIn = async (email, password) => {
    console.log("🔵 Signing in:", email)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      console.log("🟢 Sign in successful:", data.user?.email)
      return data.user
    } catch (error) {
      console.error("🔴 Sign in error:", error)
      throw error
    }
  }

  const logout = async () => {
    console.log("🔵 Logging out")
    try {
      await supabase.auth.signOut()
      setUser(null)
      console.log("🟢 Logout successful")
    } catch (error) {
      console.error("🔴 Logout error:", error)
    }
  }

  const value = {
    user,
    signUp,
    signIn,
    logout,
    loading
  }

  console.log("🟡 AuthProvider state:", { 
    user: user?.email || "No user", 
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}