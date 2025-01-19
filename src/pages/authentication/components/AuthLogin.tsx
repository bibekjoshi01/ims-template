import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

// assets
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';

// Project Imports
import { useAppDispatch } from '@/libs/hooks';
import { useLoginMutation } from '../redux/auth.api';
import { loginSuccess } from '../redux/auth.slice';
import { BackendError } from '../redux/types';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function AuthLogin() {
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
  });

  const onSubmit = async (values: LoginFormValues, { setErrors }: { setErrors: (errors: Record<string, string>) => void }) => {
    try {
      const response = await login({ values }).unwrap();

      // Change the login states
      dispatch(loginSuccess({ ...response }));
      // show success notification
      enqueueSnackbar(response?.message, { variant: 'success' });
      // Redirect to homepage after successful login
      navigate('/');
    } catch (error) {
      const err = error as BackendError;
      if (err?.status == 400) {
        setErrors(err.data);
      }
    }
  };

  return (
    <>
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
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link to={'/forget-password'} variant="h6" component={RouterLink} color="primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
