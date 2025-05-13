import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek apakah user sudah login sebelumnya (dari localStorage)
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login user
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulasi login logic
        if (email === 'demo@example.com' && password === 'password') {
          const user = {
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            avatar: 'https://i.imgur.com/m10Kpvv.png',
            level: 1,
            xp: 0,
            progress: {
              science: {
                level1: { completed: false, stars: 0 },
                level2: { completed: false, stars: 0 },
                level3: { completed: false, stars: 0 },
                level4: { completed: false, stars: 0 },
                level5: { completed: false, stars: 0 },
              },
              math: {
                level1: { completed: false, stars: 0 },
                level2: { completed: false, stars: 0 },
                level3: { completed: false, stars: 0 },
                level4: { completed: false, stars: 0 },
                level5: { completed: false, stars: 0 },
              },
            },
            badges: []
          };
          localStorage.setItem('user', JSON.stringify(user));
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Email atau kata sandi salah'));
        }
      }, 1000); // Simulate network delay
    });
  };

  // Register user
  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulasi register logic
        const user = {
          id: Date.now().toString(),
          name,
          email,
          avatar: 'https://i.imgur.com/m10Kpvv.png',
          level: 1,
          xp: 0,
          progress: {
            science: {
              level1: { completed: false, stars: 0 },
              level2: { completed: false, stars: 0 },
              level3: { completed: false, stars: 0 },
              level4: { completed: false, stars: 0 },
              level5: { completed: false, stars: 0 },
            },
            math: {
              level1: { completed: false, stars: 0 },
              level2: { completed: false, stars: 0 },
              level3: { completed: false, stars: 0 },
              level4: { completed: false, stars: 0 },
              level5: { completed: false, stars: 0 },
            },
          },
          badges: []
        };
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      }, 1000); // Simulate network delay
    });
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Update user progress
  const updateProgress = (subject, level, stars) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser };
    updatedUser.progress[subject][`level${level}`] = { 
      completed: true, 
      stars 
    };
    
    // Update XP
    updatedUser.xp += stars * 10;
    
    // Check if user level up (every 100 XP)
    if (Math.floor(updatedUser.xp / 100) > Math.floor(currentUser.xp / 100)) {
      updatedUser.level = Math.floor(updatedUser.xp / 100) + 1;
    }
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProgress,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};