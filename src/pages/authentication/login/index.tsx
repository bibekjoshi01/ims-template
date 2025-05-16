import React from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import { useAppSelector } from '@/libs/hooks';
import AuthWrapper from '../components/AuthWrapper';
import { authState } from '../redux/selector';
import AuthLogin from './AuthLogin';
import AuthVerificationEmailSentSuccess from './VerificationEmailSent';

// ================================|| LOGIN ||================================ //

export default function Login() {
  const { authVerificationEmailSent } = useAppSelector(authState);

  return (
    <React.Fragment>
      {!authVerificationEmailSent ? (
        <AuthWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                <Typography variant="h3">Login</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <AuthLogin />
            </Grid>
          </Grid>
        </AuthWrapper>
      ) : (
        <AuthVerificationEmailSentSuccess />
      )}
    </React.Fragment>
  );
}
