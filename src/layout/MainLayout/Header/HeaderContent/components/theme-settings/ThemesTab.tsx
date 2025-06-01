// MUI Imports
import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';

// Project Imports
import { useThemeMode } from '@/contexts/theme-context';
import { THEME_PRESETS } from '@/utils/constants/colors';
import ThemeModeChanger from './ThemeModeChanger';

// ==============================|| Themes TAB ||============================== //

export default function ThemesTab() {
  const { mode, selectedTheme, selectTheme } = useThemeMode();

  const handleThemeSelect = (themeIndex: number) => {
    selectTheme(themeIndex);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Theme mode changer(Dark/Light) */}
      <ThemeModeChanger />
      <Typography variant="subtitle1" fontWeight={500} gutterBottom>
        Theme Presets
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Select a predefined theme with harmonized colors
      </Typography>

      <Grid container spacing={2}>
        {THEME_PRESETS.map((preset, index) => (
          <Grid item xs={6} key={preset.name}>
            <Button
              fullWidth
              variant={selectedTheme === index ? 'contained' : 'outlined'}
              onClick={() => handleThemeSelect(index)}
              sx={{
                textTransform: 'none',
                py: 1,
                mb: 1,
                height: '38px',
                justifyContent: 'flex-start',
                backgroundColor: selectedTheme === index ? 'primary.main' : 'transparent'
              }}
            >
              {preset.name}
            </Button>

            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                mb: 2,
                p: 0.5,
                border: selectedTheme === index ? `1px solid primary.main` : '1px solid transparent',
                borderRadius: 1
              }}
            >
              {Object.values(preset[mode]).map((colorValues, i) => (
                <Tooltip title={colorValues.main} key={colorValues.main + i}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: colorValues.main,
                      borderRadius: '4px',
                      flexShrink: 0
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
