import { React } from 'react'
import { ThemeProvider } from 'styled-components'
import TodoManager from './components/TodoManager'
import './App.css'
import theme from './theme/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodoManager />
    </ThemeProvider>
  )
}

export default App
