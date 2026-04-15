import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { TreeProvider } from './context/TreeContext'
import ExplorerPage from './pages/ExplorerPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.scss'

const App = () => {
  return (
    <AuthProvider>
      <TreeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/explorer" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/explorer"
              element={
                <ProtectedRoute>
                  <ExplorerPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </TreeProvider>
    </AuthProvider>
  )
}

export default App
