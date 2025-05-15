import { useThemeMode } from '@/contexts/theme-context';
import { ColorValues } from '@/contexts/theme-context/types';
import { COLOR_SCHEMES } from '@/utils/constants/colors';
import { getFirstLetterCapital } from '@/utils/functions/getFirstLetterCapital';
import { CheckOutlined, PaletteOutlined } from '@mui/icons-material';
import { Box, FormControlLabel, Grid, List, ListItem, ListItemText, Popover, Switch, Tooltip, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { ChromePicker } from 'react-color';
import ThemeModeChanger from './ThemeModeChanger';

// Define available color types
const COLOR_TYPES = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];

export default function ColorsTab() {
  // Access theme mode and color customization functions from context
  const { mode, colorValues, updateColorValue } = useThemeMode();
  const theme = useTheme();

  // State to manage color picker popover
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLElement | null>(null);
  const [colorPickerType, setColorPickerType] = useState<keyof ColorValues>('primary');
  const [customizeAllColors, setCustomizeAllColors] = useState(false);

  // Function to update color value when a new color is picked
  const handleColorChange = (color: { hex: string }) => updateColorValue(colorPickerType, color.hex);

  // Interface for color picker event
  interface ShowColorPickerEvent {
    currentTarget: HTMLElement;
  }

  // Function to show color picker when a color box is clicked
  const showColorPicker = (event: ShowColorPickerEvent, type: keyof ColorValues) => {
    setColorPickerAnchor(event.currentTarget);
    setColorPickerType(type);
  };

  // Function to close color picker popover
  const closeColorPicker = () => setColorPickerAnchor(null);

  return (
    <Box sx={{ mt: 2 }}>
      {/* Theme mode changer(Dark/Light) */}
      <ThemeModeChanger />

      {/* Toggle switch for advanced color customization */}
      <FormControlLabel
        control={<Switch checked={customizeAllColors} onChange={(e) => setCustomizeAllColors(e.target.checked)} color="primary" />}
        label={<Typography variant="body2">Advanced color customization</Typography>}
        sx={{ mb: 2 }}
      />
      {!customizeAllColors ? (
        <>
          {/* Simple primary color selection */}
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Primary Color
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Choose your primary theme color
          </Typography>
          <Grid container spacing={1.5} sx={{ mb: 3 }}>
            {COLOR_SCHEMES.map(({ name, [mode]: { main } }) => (
              <Grid item key={name}>
                <Tooltip title={name}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      bgcolor: main,
                      cursor: 'pointer',
                      border: colorValues.primary.main === main ? `2px solid ${theme.palette.grey[300]}` : '2px solid transparent',
                      '&:hover': { boxShadow: '0 0 8px rgba(0,0,0,0.2)' },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => updateColorValue('primary', main)}
                  >
                    {colorValues.primary.main === main && <CheckOutlined sx={{ color: '#fff', fontSize: 18 }} />}
                  </Box>
                </Tooltip>
              </Grid>
            ))}
            <Grid item>
              {/* Custom color picker button */}
              <Tooltip title="Custom Color">
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    bgcolor: 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.primary',
                    border: `1px solid ${theme.palette.grey[300]}`,
                    '&:hover': { boxShadow: '0 0 8px rgba(0,0,0,0.2)' }
                  }}
                  onClick={(e) => showColorPicker(e, 'primary')}
                >
                  <PaletteOutlined fontSize="small" />
                </Box>
              </Tooltip>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          {/* Advanced color customization section */}
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Advanced Color Customization
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Customize each color individually
          </Typography>
          <List dense>
            {COLOR_TYPES.map((type) => (
              <ListItem key={type}>
                <ListItemText primary={getFirstLetterCapital(type)} primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }} />
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: colorValues[type as keyof ColorValues].main,
                    display: 'inline-block',
                    cursor: 'pointer',
                    ml: 1,
                    border: `1px solid ${theme.palette.grey[300]}`,
                    '&:hover': { boxShadow: '0 0 8px rgba(0,0,0,0.2)' }
                  }}
                  onClick={(e) => showColorPicker(e, type as keyof ColorValues)}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* Popover containing ChromePicker for custom color selection */}
      <Popover
        open={Boolean(colorPickerAnchor)}
        anchorEl={colorPickerAnchor}
        onClose={closeColorPicker}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={{ p: 1.5 }}>
          <ChromePicker color={colorValues[colorPickerType].main} onChange={handleColorChange} disableAlpha />
        </Box>
      </Popover>
    </Box>
  );
}
