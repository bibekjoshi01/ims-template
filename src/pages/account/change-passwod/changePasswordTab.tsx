import React, { useState } from 'react';

// material-ui imports
import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material';
import { Box, Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

// components
import FormSection from '@/components/app-form/FormSection';
import MainCard from '@/components/cards/MainCard';
import MatchIndicator from '@/components/app-form/PasswordMatchIndicator';
import PasswordStrengthCapsules from '@/components/app-form/PasswordStrengthCapsules';

// project imports
import { useChangePassword } from '../hooks/useChangePassword';
import { ChangePasswordFormDataType } from '../redux/types';
import { passwordFields, ReqObj } from './changePasssword.config';

export default function ChangePasswordTab() {
  const [showPassword, setShowPassword] = useState<Record<keyof ChangePasswordFormDataType, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const { handleSubmit, onSubmit, loadingChangePassword, control, watch, errors } = useChangePassword();

  const newPasswordValue = watch('newPassword', '');
  const confirmPasswordValue = watch('confirmPassword', '');

  const handleToggleVisibility = (field: keyof ChangePasswordFormDataType) => {
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

  return (
    <Grid container spacing={2} sx={{ my: 1 }}>
      <Grid item xs={12}>
        <MainCard divider title="Change Password">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Box display="flex" flexDirection="column" gap={3}>
                  <FormSection<ChangePasswordFormDataType>
                    fields={passwordFields}
                    control={control}
                    errors={errors}
                    childrenForInput={childrenForInput}
                    showPassword={showPassword}
                    handleToggleVisibility={handleToggleVisibility}
                  />
                </Box>
                <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                  <Button variant="contained" type="submit" disabled={loadingChangePassword}>
                    Update Password
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight="bold" mb={1}>
                  New Password must contain:
                </Typography>
                <List dense sx={{ pl: 0 }}>
                  {ReqObj.map(({ text, test }, index) => (
                    <React.Fragment key={index}>
                      <ListItem disableGutters>
                        <ListItemIcon sx={{ mr: 1 }}>
                          {test(newPasswordValue) ? (
                            <CheckCircleOutline sx={{ color: 'success.main' }} />
                          ) : (
                            <CancelOutlined sx={{ color: 'text.disabled' }} />
                          )}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                      {index < 4 && <Divider sx={{ my: 1.5 }} />}
                    </React.Fragment>
                  ))}
                </List>
              </Grid>
            </Grid>
          </form>
        </MainCard>
      </Grid>
    </Grid>
  );
}
