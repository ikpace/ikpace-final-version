import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUser();

    // Simple auth listener without complex logic
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);
        if (session?.user) {
          setUser(session.user);
          // Check if user is admin
          checkAdminStatus(session.user);
        } else {
          setUser(null);
          setProfile(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkAdminStatus = async (user) => {
    try {
      // Check if email is test@ikpace.com (super admin)
      if (user.email === "test@ikpace.com") {
        setIsAdmin(true);
        return;
      }

      // Check profile for admin flag
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (profile?.is_admin === true) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Admin check error:", error);
      setIsAdmin(false);
    }
  };

  const checkUser = async () => {
    try {
      const { data: { user: currentUser }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Auth error:", error);
        return;
      }

      if (currentUser) {
        setUser(currentUser);
        checkAdminStatus(currentUser);
      }
    } catch (error) {
      console.error("Check user error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        return { success: false, error };
      }

      if (data.user) {
        setUser(data.user);
        checkAdminStatus(data.user);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Sign in exception:", error);
      return { success: false, error };
    }
  };

  const signUp = async (email, password, fullName) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        console.error("Sign up error:", error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Sign up error:", error);
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    profile,
    loading,
    isAdmin,
    signIn,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

