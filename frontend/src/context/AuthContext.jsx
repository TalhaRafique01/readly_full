import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a token in URL (Google OAuth Redirect)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email }));
      setUser({ token, name, email });

      // Remove token from URL and redirect to dashboard
      navigate("/user", { replace: true });
    } else {
      // Check local storage for token
      const storedToken = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedToken) {
        setUser({ token: storedToken, ...storedUser });
      }
    }
    setLoading(false);
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser({ token: data.token, ...data.user });
        navigate("/dashboard");
      } else {
        throw new Error(data.error || "Invalid login credentials.");
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
