// material-ui
import { Button, Grid, Typography } from '@mui/material';

import { useAppDispatch } from '@/libs/hooks';
import AuthWrapper from '../components/AuthWrapper';
import { setAuthVerificationEmailSent } from '../redux/auth.slice';

const AuthVerificationEmailSentSuccess = () => {
  const dispatch = useAppDispatch();

  return (
    <AuthWrapper>
      <Grid container spacing={2} sx={{ p: 1 }}>
        {/* Title */}
        <Grid item xs={12}>
          <Typography variant="h3">Hi, Check Your Mail</Typography>
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <Typography variant="body1" fontSize="14px" sx={{ marginBottom: '22px', opacity: 0.5 }}>
            We have sent account verification link to your email.
          </Typography>
          <Typography variant="body1" fontSize="14px" sx={{ marginBottom: '22px', opacity: 0.5 }}>
            Please click SignIn if you have verified your account.
          </Typography>

          {/* Button */}
          <Button
            disableElevation
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            onClick={() => dispatch(setAuthVerificationEmailSent())}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default AuthVerificationEmailSentSuccess;
