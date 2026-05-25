// MUI imports
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

// Project imports
import { useThemeMode } from '@/contexts/theme-context';

export default function ThemeModeChanger() {
  const { mode, toggleThemeMode } = useThemeMode();

  return (
    <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          fontWeight: 500
        }}
      >
        Theme Mode
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
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
        <Grid size={{ xs: 6 }}>
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
