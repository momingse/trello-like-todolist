import { Router, Route } from 'electron-router-dom'
import TodoState from './pages/todoState'
import { Navigate } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Router
      main={
        <>
          <Route path="/todo-state" element={<TodoState />} />
          <Route path="/" element={<Navigate to="/todo-state" />} />
        </>
      }
    />
  )
}

export default AppRoutes
