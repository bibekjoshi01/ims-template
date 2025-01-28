// material-ui
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import AuthWrapper from './components/AuthWrapper';

const ForgotPassword = () => {
  const navigate = useNavigate();

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
            We have sent password recovery instructions to your email.
          </Typography>

          {/* Button */}
          <Button disableElevation fullWidth size="large" variant="contained" color="primary" onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgotPassword;
