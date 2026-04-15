import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const LoginPage = () => {
  const { user, login, loading, error } = useAuthContext()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/explorer')
    }
  }, [user, navigate])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await login(email, password)
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Correo
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="usuario@correo.com"
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="********"
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Ingresar'}
          </button>
          {error && <p className="form-error">{error}</p>}
        </form>
        <p>
          <Link to="/register">Regístrate</Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
