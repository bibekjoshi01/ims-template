import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import FormSection from '@/components/app-form/FormSection';
import MatchIndicator from '@/components/app-form/PasswordMatchIndicator';
import PasswordStrengthCapsules from '@/components/app-form/PasswordStrengthCapsules';
import { resetPasswordTokenLength } from '@/utils/constants/defaults';
import AuthWrapper from '../components/AuthWrapper';
import { useResetPassword } from '../hooks/useResetPassword';
import { ResetPasswordRequestFormDataType } from '../redux/types';
import { resetPasswordFields } from './resetPassword.config';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Basic Validation for the token
  useEffect(() => {
    if (!token || String(token)?.length < resetPasswordTokenLength) {
      enqueueSnackbar('Invalid Token, Try again!', { variant: 'error' });
      navigate('/forget-password');
    }
  }, [token]);

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  });

  const { handleSubmit, onSubmit, watch, control, errors, loadingResetPassword } = useResetPassword();

  const newPasswordValue = watch('newPassword', '');
  const confirmPasswordValue = watch('confirmPassword', '');

  type PasswordFields = 'newPassword' | 'confirmPassword';

  const handleToggleVisibility = (field: PasswordFields) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const childrenForInput = {
    newPassword: newPasswordValue && <PasswordStrengthCapsules password={newPasswordValue} />,
    confirmPassword: confirmPasswordValue && (
      <MatchIndicator errors={errors} confirmPassword={confirmPasswordValue} newPasswordValue={newPasswordValue} />
    )
  };

  // Include token on form submit
  const handleFormSubmit = (data: ResetPasswordRequestFormDataType) => {
    onSubmit({ ...data, token });
  };

  return (
    <AuthWrapper>
      <Grid container spacing={4} sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h3">Reset Password</Typography>
        </Grid>
        <Grid item xs={12}>
          <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormSection<ResetPasswordRequestFormDataType>
                  fields={resetPasswordFields}
                  control={control}
                  childrenForInput={childrenForInput}
                  errors={errors}
                  showPassword={showPassword}
                  handleToggleVisibility={handleToggleVisibility}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disableElevation
                  disabled={loadingResetPassword}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Reset Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ResetPassword;
