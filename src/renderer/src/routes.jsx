import { Router, Route } from 'electron-router-dom'
import TodoState from './pages/todoState'
import Setting from './pages/setting'
import { Navigate } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <>
      <Router
        main={
          <>
            <Route path="/" element={<Navigate to="/todo-state" />} />
            <Route path="/todo-state" element={<TodoState />} />
            <Route path="/setting" element={<Setting />} />
          </>
        }
      />
    </>
  )
}

export default AppRoutes
