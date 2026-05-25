import { ReactNode } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project import
import AuthFooter from '@/components/cards/AuthFooter';
import Logo from '@/components/logo';
import AuthCard from './AuthCard';

// assets
import AuthBackground from '@/assets/images/auth/AuthBackground';

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AuthBackground />
      <Grid
        container
        sx={{
          justifyContent: 'flex-end',
          minHeight: '100vh',
          flexDirection: 'column'
        }}
      >
        <Grid sx={{ ml: 3, mt: 3 }} size={{ xs: 12 }}>
          <Logo />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Grid
            container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' }
            }}
            size={{ xs: 12 }}
          >
            <Grid>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ m: 3, mt: 1 }} size={{ xs: 12 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </Box>
  );
}
