// src/contexts/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  // Reba niba hari username yabitswe mbere muri localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const saveUsername = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  return (
    <UserContext.Provider value={{ username, setUsername: saveUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
