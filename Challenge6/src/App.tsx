import { useState } from "react";
import type { FormEvent } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import Challenge4App from "./Challenge4/App";
import Challenge5App from "./Challenge5/App";
import { useAuth } from "./context/AuthContext";

import "./App.css";
import "./Challenge4/App.css";
import "./Challenge5/App.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    const onLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (auth.login(email, password)) {
            setError("");
            navigate("/menu", { replace: true });
            return;
        }

        setError("Email o contraseña incorrecta. Usa user@mail.com / 123");
    };

    return (
        <div className="login-card">
            <h1>Login</h1>
            <form onSubmit={onLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Iniciar sesión</button>
            </form>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

function UserInfo() {
  const auth = useAuth();
  if (!auth.userEmail) return null;

  return <div className="user-tag">Usuario: {auth.userEmail}</div>;
}

function MenuPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="menu-panel">
      <UserInfo />
      <h1>Bienvenido</h1>
      <p>Selecciona un desafío</p>
      <div>
        <button onClick={() => navigate("/challenge4")} style={{ marginRight: 10 }}>
          Challenge 4
        </button>
        <button onClick={() => navigate("/challenge5")}>Challenge 5</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => {
            auth.logout();
            navigate("/login", { replace: true });
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

function ChallengeWrapper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, position: "relative" }}>
      <UserInfo />
      <button onClick={() => navigate("/menu")} style={{ marginBottom: 12 }}>
        Volver
      </button>
      {children}
    </div>
  );

    return (
        <div style={{ padding: 20 }}>
            <button onClick={() => navigate("/menu")}>Volver</button>
            {children}
        </div>
    );
}

function Challenge4Page() {
    return (
        <ChallengeWrapper>
            <Challenge4App />
        </ChallengeWrapper>
    );
}

function Challenge5Page() {
    return (
        <ChallengeWrapper>
            <Challenge5App />
        </ChallengeWrapper>
    );
}

function PrivateRoute() {
    const auth = useAuth();

    if (!auth.userEmail) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/challenge4" element={<Challenge4Page />} />
                <Route path="/challenge5" element={<Challenge5Page />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
