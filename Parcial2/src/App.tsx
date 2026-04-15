import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/ContextoAuth'
import { ArbolProvider } from './context/ContextoArbol'
import Explorador from './pages/Explorador'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Registro'
import RutaProtegida from './components/RutaProtegida'
import './App.scss'

const App = () => {
  return (
    <AuthProvider>
      <ArbolProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/explorer" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/explorer"
              element={
                <RutaProtegida>
                  <Explorador />
                </RutaProtegida>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </ArbolProvider>
    </AuthProvider>
  )
}

export default App
