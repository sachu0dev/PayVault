import { createContext, useContext, useEffect, useState } from "react";

// Create a context for the authentication token
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap your entire application
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Effect to retrieve token from local storage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to update token and store it in local storage
  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Function to remove token from state and local storage
  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Value object to provide to the context
  const value = {
    token,
    updateToken,
    removeToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
