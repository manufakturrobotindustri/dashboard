import { Route } from 'react-router-dom'
import LoginPage from '@/pages/auth/pages/login'

export const authRoutes = [
  <Route key="login" path="/login" element={<LoginPage />} />
]
