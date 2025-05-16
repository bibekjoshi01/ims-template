// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import { useAppSelector } from '@/libs/hooks';
import AuthLogin from './components/AuthLogin';
import AuthVerification from './components/AuthVerification';
import AuthWrapper from './components/AuthWrapper';
import { authState } from './redux/selector';

// ================================|| LOGIN ||================================ //

export default function Login() {
  const { underVerification } = useAppSelector(authState);

  return (
    <>
      {!underVerification ? (
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
        <AuthVerification />
      )}
    </>
  );
}
