import { React } from 'react'
import { ThemeProvider } from 'styled-components'
import SnackbarManager from './components/SnackbarManager'
import AppDrawer from './components/AppDrawer'
import AppRoutes from './routes'
import './App.css'
import theme from './theme/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarManager />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
