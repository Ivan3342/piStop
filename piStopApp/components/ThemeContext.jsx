import React, { createContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from './Colors';

export const ThemeContext = createContext({});

export default function ThemeProvider({ children }) {
  const system = useColorScheme();
  const [override, setOverride] = useState(null); // 'light' | 'dark' | null

  const colorScheme = override || system || 'light';
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const toggle = () => {
    setOverride(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'dark';
      // if no override, switch from system to opposite
      return colorScheme === 'dark' ? 'light' : 'dark';
    });
  };

  const clearOverride = () => setOverride(null);

  const value = useMemo(() => ({ theme, colorScheme, override, setOverride, toggle, clearOverride }), [theme, colorScheme, override]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
