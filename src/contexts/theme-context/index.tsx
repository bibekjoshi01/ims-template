// MUI IMPORTS
import { PaletteMode } from '@mui/material';

// REACT IMPORTS
import { createContext, useContext, useEffect, useState } from 'react';

// PROJECT IMPORTS
import { ColorValues, ThemeContextType } from './types';
import { THEME_PRESETS } from '@/utils/constants/colors';

// Create Theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
export const ThemeProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load settings from localStorage safely
  const storedSettings: { mode?: PaletteMode; selectedTheme?: number } = JSON.parse(localStorage.getItem('themeSettings') || '{}');
  const storedCustomColors: { [key: number]: { light?: ColorValues; dark?: ColorValues } } = JSON.parse(
    localStorage.getItem('customThemeColors') || '{}'
  );

  const selectedThemeIndex = storedSettings.selectedTheme ?? 0;
  const selectedMode = (storedSettings.mode as PaletteMode) ?? 'light';

  const [themeSettings, setThemeSettings] = useState({
    mode: selectedMode,
    selectedTheme: selectedThemeIndex,
    colorValues:
      storedCustomColors[selectedThemeIndex]?.[selectedMode] || (THEME_PRESETS[selectedThemeIndex]?.[selectedMode] as ColorValues)
  });

  // Store user-modified colors per theme & mode
  const [customThemeColors, setCustomThemeColors] = useState<{
    [themeIndex: number]: {
      light?: ColorValues;
      dark?: ColorValues;
    };
  }>(storedCustomColors);

  // Function to update a specific color(main color) for primary, secondary etc.. (handles light & dark separately)
  const updateColorValue = (type: keyof ColorValues, value: string) => {
    setThemeSettings((prev) => {
      const updatedColors = {
        ...prev.colorValues,
        [type]: { ...prev.colorValues[type], main: value }
      };

      // Save modified colors per theme and mode
      const updatedCustomThemes = {
        ...customThemeColors,
        [prev.selectedTheme]: {
          ...customThemeColors[prev.selectedTheme],
          [prev.mode]: updatedColors
        }
      };

      setCustomThemeColors(updatedCustomThemes);
      localStorage.setItem('customThemeColors', JSON.stringify(updatedCustomThemes));

      return { ...prev, colorValues: updatedColors };
    });
  };

  // Function to switch themes
  const selectTheme = (themeIndex: number) => {
    // Restore user-modified colors for the selected theme & current mode
    let themeColors =
      (customThemeColors[themeIndex]?.[themeSettings.mode] as ColorValues) ||
      ({ ...THEME_PRESETS[themeIndex][themeSettings.mode] } as ColorValues); // Use default

    setThemeSettings({
      mode: themeSettings.mode,
      selectedTheme: themeIndex,
      colorValues: themeColors
    });
  };

  // Function to toggle between light and dark mode
  const toggleThemeMode = () => {
    setThemeSettings((prev) => {
      const newMode = prev.mode === 'light' ? 'dark' : 'light';

      // Restore user-modified colors for the selected theme & current mode
      const newThemeColors =
        customThemeColors[prev.selectedTheme]?.[newMode] || ({ ...THEME_PRESETS[prev.selectedTheme][newMode] } as ColorValues);

      return {
        ...prev,
        mode: newMode,
        colorValues: newThemeColors
      };
    });
  };

  // Save settings to localStorage whenever themeSettings changes
  useEffect(() => {
    localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
    localStorage.setItem('customThemeColors', JSON.stringify(customThemeColors));
  }, [themeSettings, customThemeColors]);

  return (
    <ThemeContext.Provider
      value={{
        mode: themeSettings.mode,
        selectedTheme: themeSettings.selectedTheme,
        colorValues: themeSettings.colorValues,
        setThemeSettings,
        toggleThemeMode,
        selectTheme,
        updateColorValue
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use the theme context
export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};
