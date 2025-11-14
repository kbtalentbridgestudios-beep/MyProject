// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email"); // optional
    const name = localStorage.getItem("name");   // optional

    if (token && role) {
      setUser({ token, role, email, name });
    }
  }, []);

  const login = (userData) => {
    // userData must contain: token, role, email, name (if needed)
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("role", userData.role);
    if (userData.email) localStorage.setItem("email", userData.email);
    if (userData.name) localStorage.setItem("name", userData.name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
