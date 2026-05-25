// MUI Imports
import { Box, Button, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

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
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          fontWeight: 500
        }}
      >
        Theme Presets
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          mb: 2
        }}
      >
        Select a predefined theme with harmonized colors
      </Typography>
      <Grid container spacing={2}>
        {THEME_PRESETS.map((preset, index) => (
          <Grid key={preset.name} size={{ xs: 6 }}>
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
