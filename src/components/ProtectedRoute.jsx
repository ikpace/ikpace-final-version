import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  console.log("ProtectedRoute ->", { user, loading })

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
