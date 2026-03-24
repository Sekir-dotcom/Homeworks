import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthContextValue = {
  userEmail: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const VALID_EMAIL = "user@mail.com";
const VALID_PASSWORD = "123";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setUserEmail(email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
