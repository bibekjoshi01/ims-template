// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// third party
import { Link, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

// project import
import AuthWrapper from './components/AuthWrapper';

const ForgetPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: ''
  };
  const validationSchema = {};

  const onSubmit = () => {
    // TODO: Implement password reset logic here
    console.log('Password reset logic executed');
  };

  return (
    <AuthWrapper>
      <Grid container spacing={4} sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Forgot Password</Typography>
            <Link variant="inherit" color="primary" underline="none" sx={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => navigate('/')}>
              Back to Login
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-login">Email Address</InputLabel>
                      <OutlinedInput
                        id="email-login"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                        autoComplete="username"
                      />
                    </Stack>
                    {touched.email && errors.email && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" fontSize="14px" sx={{ marginBottom: '10px', opacity: 0.8 }}>
                      Do not forget to check SPAM box .
                    </Typography>

                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => navigate('/reset-password')}
                    >
                      Send Password Reset Email
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgetPassword;
