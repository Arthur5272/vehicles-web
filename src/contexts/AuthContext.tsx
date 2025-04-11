"use client";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

interface JwtPayload {
  exp: number;
  iat: number;
  sub: string;
  name: string;
  email?: string;
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

  // Função para decodificar e atualizar o estado
  const updateAuthState = (newToken: string | null) => {
    if (!newToken) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(newToken);

      // Verificação de claims essenciais
      if (!decoded.sub || !decoded.name) {
        throw new Error("Token inválido: claims essenciais faltando");
      }

      setUser({
        id: decoded.sub, // Usando sub como ID (padrão JWT)
        name: decoded.name,
      });
    } catch (error) {
      console.error("Falha na decodificação do token:", error);
      logout(); // Força logout em caso de token inválido
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      updateAuthState(savedToken);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    updateAuthState(newToken); // Usa a função centralizada
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
