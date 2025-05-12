import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

// UI Components
import MainCard from '@/components/MainCard';
import FormSection from '@/components/FormSection';
import MatchIndicator from '@/components/PasswordMatchIndicator';
import PasswordStrengthCapsules from '@/components/PasswordStrengthCapsules';

// Utilities & API
import { useAppDispatch } from '@/libs/hooks';
import { splitName } from '@/utils/splitCombineName';
import { setMessage } from '@/pages/common/redux/common.slice';
import { useCreateUserMutation, useGetUserRolesQuery } from '../../redux/user.api';

// Form Schema, Defaults, Types
import { userInfoFormSchema, defaultValues, userInfoFields, UserInfoFormDataType } from './data';
import { SelectOption } from '@/components/CustomInput';
import { UserInput, UserRole } from '../../redux/types';

interface UserFormProps {
  onClose?: () => void;
}

export default function UserForm({ onClose }: UserFormProps) {
  const dispatch = useAppDispatch();
  const [createUser] = useCreateUserMutation();
  const { data: rolesData } = useGetUserRolesQuery({
    search: '',
    paginationModel: { page: 0, pageSize: 100 },
    sortModel: []
  });
  const [formFields, setFormFields] = useState(userInfoFields);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<UserInfoFormDataType>({
    resolver: zodResolver(userInfoFormSchema),
    defaultValues
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const handleToggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (data: UserInfoFormDataType) => {
    try {
      const { confirmPassword, name, ...rest } = data;
      const { firstName, middleName, lastName } = splitName(name);
      const payload: UserInput = { firstName, middleName, lastName, ...rest };
      const res = await createUser(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
      // reset(); // optional
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Dynamically update role options once loaded
  useEffect(() => {
    if (rolesData?.count) {
      const roleOptions: SelectOption[] = rolesData.results.map((role: UserRole) => ({
        label: role.name,
        value: role.id
      }));

      setFormFields((prev) => prev.map((field) => (field.name === 'roles' ? { ...field, options: roleOptions } : field)));
    }
  }, [rolesData]);

  const extraComponents = {
    password: password && <PasswordStrengthCapsules password={password} />,
    confirmPassword: confirmPassword && <MatchIndicator confirmPassword={confirmPassword} newPasswordValue={password} errors={errors} />
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ my: 1 }}>
        <Grid item xs={12}>
          <MainCard divider title="Create New User">
            <FormSection<UserInfoFormDataType>
              fields={formFields}
              control={control}
              errors={errors}
              childrenForInput={extraComponents}
              showPassword={showPassword}
              handleToggleVisibility={handleToggleVisibility}
            />
          </MainCard>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add User
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
