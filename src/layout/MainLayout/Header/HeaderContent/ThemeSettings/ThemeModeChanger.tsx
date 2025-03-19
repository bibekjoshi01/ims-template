// MUI imports
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';

// Project imports
import { useThemeMode } from '@/contexts/theme-context';

export default function ThemeModeChanger() {
  const { mode, toggleThemeMode } = useThemeMode();

  return (
    <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Typography variant="subtitle1" fontWeight={500} gutterBottom>
        Theme Mode
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant={mode === 'light' ? 'contained' : 'outlined'}
            startIcon={<LightModeOutlined />}
            onClick={toggleThemeMode}
            sx={{
              textTransform: 'none',
              py: 1,
              backgroundColor: mode === 'light' ? 'primary.main' : 'transparent'
            }}
          >
            Light
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant={mode === 'dark' ? 'contained' : 'outlined'}
            startIcon={<DarkModeOutlined />}
            onClick={toggleThemeMode}
            sx={{
              textTransform: 'none',
              py: 1,
              backgroundColor: mode === 'dark' ? 'primary.main' : 'transparent'
            }}
          >
            Dark
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
