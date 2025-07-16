import './App.css'
import { ThemeProvider } from './components/theme/theme-provider'
import { LoginForm } from './components/ui/login-form'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex items-center justify-center min-h-screen bg-background">
        <LoginForm className="w-full max-w-md" />
      </div>
    </ThemeProvider>
  )
}

export default App
