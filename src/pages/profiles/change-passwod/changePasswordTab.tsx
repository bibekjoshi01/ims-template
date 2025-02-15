import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, List, ListItem, ListItemText, ListItemIcon, Button, Typography, Divider } from '@mui/material';
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material';

import MainCard from '@/components/MainCard';
import FormSection from '@/components/FormSection';
import PasswordStrengthCapsules from '@/components/passwordStrengthCapsules';
import { ChangePasswordFormDataType, changePasswordSchema, defaultValues, passwordFields, ReqObj } from './data';
import MatchIndicator from '@/components/PasswordMatchIndicator';

export default function ChangePasswordTab() {
  // state to toggle password visibility
  const [showPassword, setShowPassword] = useState<Record<keyof ChangePasswordFormDataType, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues
  });

  const newPasswordValue = watch('newPassword', '');
  const confirmPasswordValue = watch('confirmPassword', '');

  /* ----------------- Setup Submit Handler ----------------- */
  const onSubmit = (data: ChangePasswordFormDataType) => {
    console.log('All validated data:', data);
  };

  const handleToggleVisibility = (field: keyof ChangePasswordFormDataType) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Extra components for specific fields in the form
  const childrenForInput = {
    newPassword: newPasswordValue && <PasswordStrengthCapsules password={newPasswordValue} />,
    confirmPassword: confirmPasswordValue && (
      <MatchIndicator errors={errors} confirmPassword={confirmPasswordValue} newPasswordValue={newPasswordValue} />
    )
  };

  return (
    <Grid container spacing={3} sx={{ my: 1 }}>
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

              <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Update Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </MainCard>
      </Grid>
    </Grid>
  );
}
