import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Link, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// project import
import FormSection from '@/components/app-form/FormSection';
import { useAppSelector } from '@/libs/hooks';
import AuthWrapper from '../components/AuthWrapper';
import { useForgetPasswordRequest } from '../hooks/useForgetPasswordRequest';
import { authState } from '../redux/selector';
import { ForgetPasswordRequestFormDataType } from '../redux/types';
import ForgetPasswordEmailSentSuccess from './EmailSentSuccess';
import { forgetPasswordRequestFields } from './forgetPasswordReqeust.config';

const ForgetPasswordRequest = () => {
  const navigate = useNavigate();
  const { forgetPasswordEmailSent } = useAppSelector(authState);

  const { handleSubmit, onSubmit, control, errors, successMessage, loadingForgetPasswordRequest } = useForgetPasswordRequest();

  return (
    <React.Fragment>
      {forgetPasswordEmailSent ? (
        <ForgetPasswordEmailSentSuccess message={successMessage} />
      ) : (
        <AuthWrapper>
          <Grid container spacing={4} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                <Typography variant="h3">Forgot Password</Typography>
                <Link
                  variant="inherit"
                  color="primary"
                  underline="none"
                  sx={{ cursor: 'pointer', opacity: 0.8 }}
                  onClick={() => navigate('/')}
                >
                  Back to Login
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormSection<ForgetPasswordRequestFormDataType>
                      fields={forgetPasswordRequestFields}
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" fontSize="14px" sx={{ marginBottom: '10px', opacity: 0.8 }}>
                      Do not forget to check SPAM box .
                    </Typography>

                    <Button
                      disableElevation
                      disabled={loadingForgetPasswordRequest}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Send Password Reset Email
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </AuthWrapper>
      )}
    </React.Fragment>
  );
};

export default ForgetPasswordRequest;
