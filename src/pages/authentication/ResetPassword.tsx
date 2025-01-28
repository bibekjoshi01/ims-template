// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// third party
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
// project import
import AuthWrapper from './components/AuthWrapper';

const ResetPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    password: '',
    confirmPassword: ''
  };

  const validationSchema = {}; // Add your validation logic here

  const onSubmit = () => {
    // Handle password reset logic
    console.log('Password reset successfully');
  };

  return (
    <AuthWrapper>
      <Grid container spacing={4} sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h3">Reset Password</Typography>
        </Grid>
        <Grid item xs={12}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password">New Password</InputLabel>
                      <OutlinedInput
                        id="password"
                        type="password"
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                      />
                      {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                      <OutlinedInput
                        id="confirm-password"
                        type="password"
                        value={values.confirmPassword}
                        name="confirmPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        fullWidth
                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      />
                      {touched.confirmPassword && errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => navigate('/reset-password-success')}
                    >
                      Reset Password
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

export default ResetPassword;
