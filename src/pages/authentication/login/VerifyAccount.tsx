import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

// project imports
import { useVerifyMutation } from '../redux/auth.api';

const alertStyle = {
  fontSize: '18px',
  alignItems: 'center',
  '& .MuiAlert-icon': {
    fontSize: '24px',
    marginTop: '2px'
  }
};

const VerifyAccount = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useParams();

  const [verify, { isLoading }] = useVerifyMutation();

  useEffect(() => {
    const runVerification = async () => {
      try {
        const response = await verify({ token }).unwrap();
        setMessage(response?.message || 'Account verified successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (err: any) {
        const errorMsg = err?.data?.error?.[0] || 'Something went wrong. Please try again.';
        setError(errorMsg);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };

    if (token) {
      runVerification();
    }
  }, [token, verify, navigate]);

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="60vh">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper
          elevation={3}
          sx={{
            py: 4,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {isLoading ? (
            <Box>
              <CircularProgress size={80} />
              <Typography variant="h5" mt={10}>
                Verifying your account...
              </Typography>
            </Box>
          ) : message ? (
            <Stack sx={{ width: 'maxContent' }} spacing={2}>
              <Alert sx={alertStyle} severity="success">
                {message}
              </Alert>
            </Stack>
          ) : error ? (
            <Stack sx={{ width: 'maxContent' }} spacing={2}>
              <Alert sx={alertStyle} severity="error">
                {error}
              </Alert>
            </Stack>
          ) : null}
          <Grid item xs={12}>
            <Button
              disableElevation
              disabled={isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
            >
              Back to Login
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VerifyAccount;
