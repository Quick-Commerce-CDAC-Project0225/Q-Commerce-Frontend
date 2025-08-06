// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import { API_ENDPOINTS } from '../../config';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = unknown, false = not logged in

  const fetchUser = async () => {
  try {
    const res = await axios.post(API_ENDPOINTS.USER_PROFILE, {
      withCredentials: true,
    });
    setUser(res.data.data); // store user info
  } catch (err) {
    console.error("Failed to fetch user:", err);
    setUser(false); // not logged in
  }
};



  const logout = async () => {
    try {
      await axios.post(API_ENDPOINTS.LOGOUT);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(false);
      Navigate('/login'); // redirect to login after logout
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
