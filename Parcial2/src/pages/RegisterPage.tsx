import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const RegisterPage = () => {
  const { user, register, loading, error } = useAuthContext()
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
    await register(email, password)
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Registro</h1>
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
            {loading ? 'Cargando...' : 'Crear cuenta'}
          </button>
          {error && <p className="form-error">{error}</p>}
        </form>
        <p>
          <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage
