import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import { useAppDispatch } from '@/libs/hooks';
import AuthWrapper from '../components/AuthWrapper';
import { setForgetPasswordEmailSent } from '../redux/auth.slice';

const ForgetPasswordEmailSentSuccess = ({ message }: { message: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickSignIn = () => {
    dispatch(setForgetPasswordEmailSent());
    navigate('/');
  };

  return (
    <AuthWrapper>
      <Grid container spacing={2} sx={{ p: 1 }}>
        {/* Title */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h3">Hi, Check Your Mail</Typography>
        </Grid>

        {/* Description */}
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: '14px',
              marginBottom: '22px',
              opacity: 0.5
            }}
          >
            {message}
          </Typography>

          {/* Button */}
          <Button disableElevation fullWidth size="large" variant="contained" color="primary" onClick={handleClickSignIn}>
            Sign In
          </Button>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgetPasswordEmailSentSuccess;
