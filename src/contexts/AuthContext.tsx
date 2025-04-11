// src/contexts/AuthContext.tsx
"use client";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

interface JwtPayload {
  exp: number;
  iat: number;
  userId: string;
  name: string;
}

type User = {
  id: string;
  name: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      try {
        const decoded = jwtDecode<JwtPayload>(savedToken);
        setUser({ id: decoded.userId, name: decoded.name });
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        setUser(null);
      }
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    try {
      const decoded = jwtDecode<JwtPayload>(newToken);
      setUser({ id: decoded.userId, name: decoded.name });
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
