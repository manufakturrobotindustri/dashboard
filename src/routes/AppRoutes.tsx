import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes } from '../pages/auth/routes/auth'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      {authRoutes}
      {/* Route lain bisa ditambahkan di sini */}
    </Routes>
  )
}
