import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/ContextoAuth'

const RegisterPage = () => {
  const { user, register, loading, error } = useAuthContext()
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/explorer')
    }
  }, [user, navigate])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await register(correo, contrasena)
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
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              required
              placeholder="usuario@correo.com"
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={contrasena}
              onChange={(event) => setContrasena(event.target.value)}
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
