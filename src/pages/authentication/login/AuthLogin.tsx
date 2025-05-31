import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Project Imports
import FormSection from '@/components/app-form/FormSection';
import { useLogin } from '../hooks/useLogin';
import { LoginFormDataType } from '../redux/types';
import { loginFields } from './login.config';

export default function AuthLogin() {
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState({
    password: false
  });

  const handleClickShowPassword = () => setShowPassword((prev) => ({ password: !prev.password }));

  const { handleSubmit, onSubmit, loadingLogin, control, errors } = useLogin();

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormSection<LoginFormDataType>
            fields={loginFields}
            control={control}
            errors={errors}
            showPassword={showPassword}
            handleToggleVisibility={handleClickShowPassword}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: -1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
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
          <Button disableElevation disabled={loadingLogin} fullWidth size="large" type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
