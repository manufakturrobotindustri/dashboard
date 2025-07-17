import './App.css'
import { ThemeProvider } from './theme/theme-provider'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex items-center justify-center min-h-screen bg-background">
        <h1 className="text-2xl font-bold text-primary-foreground">
          Welcome to the Vite UI Theme Example
        </h1> 
      </div>
    </ThemeProvider>
  )
}

export default App
