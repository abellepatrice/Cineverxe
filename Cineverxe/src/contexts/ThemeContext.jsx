import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../theme/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [themeColors, setThemeColors] = useState(darkTheme);

  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  const loadThemeFromStorage = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      if (savedTheme) {
        setTheme(savedTheme);
        setThemeColors(savedTheme === 'light' ? lightTheme : darkTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const saveThemeToStorage = async (newTheme) => {
    try {
      await AsyncStorage.setItem('appTheme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const toggleTheme = (newTheme) => {
    const themeValue = newTheme.toLowerCase();
    setTheme(themeValue);
    setThemeColors(themeValue === 'light' ? lightTheme : darkTheme);
    saveThemeToStorage(themeValue);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      themeColors,
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
