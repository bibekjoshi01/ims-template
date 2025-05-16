import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Alert, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

// project imports
import AuthWrapper from './components/AuthWrapper';
import { useVerifyMutation } from './redux/auth.api';

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
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {isLoading ? (
            <>
              <CircularProgress />
              <Typography variant="h6" mt={2}>
                Verifying your account...
              </Typography>
            </>
          ) : message ? (
            <Alert severity="success" icon={<CheckCircleOutlineIcon fontSize="inherit" />} sx={{ fontSize: '1.1rem' }}>
              {message}
            </Alert>
          ) : error ? (
            <Alert severity="error" icon={<ErrorOutlineIcon fontSize="inherit" />} sx={{ fontSize: '1.1rem' }}>
              {error}
            </Alert>
          ) : null}
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default VerifyAccount;
