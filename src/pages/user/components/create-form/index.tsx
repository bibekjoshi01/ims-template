import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import FormSection from '@/components/app-form/FormSection';
import MatchIndicator from '@/components/app-form/PasswordMatchIndicator';
import PasswordStrengthCapsules from '@/components/app-form/PasswordStrengthCapsules';
import MainCard from '@/components/cards/MainCard';

import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { splitName } from '@/utils/functions/splitCombineName';
import { useCreateUserMutation, useGetUserRolesQuery, useLazyGetUsersQuery } from '../../redux/user.api';

import { SelectOption } from '@/components/app-form/types';
import useUniqueFieldValidation from '@/hooks/useUniqueFieldValidation';
import { handleClientError } from '@/utils/functions/handleError';
import { UserCreatePayload, UserRole } from '../../redux/types';
import { defaultValues, uniqueFieldNames, userInfoFields, UserInfoFormDataType, userInfoFormSchema } from './config';

interface UserCreateFormProps {
  onClose?: () => void;
}

export default function UserCreateForm({ onClose }: UserCreateFormProps) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [createUser] = useCreateUserMutation();
  const [triggerGetUsers] = useLazyGetUsersQuery();
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
    watch,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm<UserInfoFormDataType>({
    resolver: zodResolver(userInfoFormSchema),
    defaultValues
  });

  // NOTE - For Unique field validation
  const uniqueFieldValues = {
    username: watch('username'),
    email: watch('email'),
    phoneNo: watch('phoneNo')
  };

  const fetchUser = useCallback((args: any) => triggerGetUsers(args).unwrap(), [triggerGetUsers]);

  useUniqueFieldValidation({
    fields: [...uniqueFieldNames],
    values: uniqueFieldValues,
    triggerFunc: fetchUser,
    setError: (field, message) => {
      if (message) setError(field, { type: 'manual', message });
      else clearErrors(field);
    },
    debounceDelay: 300
  });

  // NOTE - Form submit handler
  const onSubmit = async (data: UserInfoFormDataType) => {
    try {
      const { confirmPassword, name, ...rest } = data;
      const { firstName, middleName, lastName } = splitName(name);
      const payload: UserCreatePayload = { firstName, middleName, lastName, ...rest };
      const res = await createUser(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      handleClientError<UserInfoFormDataType>({
        error,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          firstName: 'name',
          lastName: 'name',
          username: 'username',
          password: 'password',
          email: 'email',
          photo: 'photo',
          phoneNo: 'phoneNo',
          roles: 'roles',
          isActive: 'isActive'
        }
      });
    }
  };

  // NOTE - Fetching roles data and setting it to form fields
  useEffect(() => {
    if (rolesData?.count) {
      const roleOptions: SelectOption[] = rolesData.results.map((role: UserRole) => ({
        label: role.name,
        value: role.id
      }));

      setFormFields((prev) => prev.map((field) => (field.name === 'roles' ? { ...field, options: roleOptions } : field)));
    }
  }, [rolesData]);

  // NOTE - Password and Confirm Password validation
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const extraComponents = {
    password: password && <PasswordStrengthCapsules password={password} />,
    confirmPassword: confirmPassword && <MatchIndicator confirmPassword={confirmPassword} newPasswordValue={password} errors={errors} />
  };

  // NOTE - Toggle password visibility
  const handleToggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3}>
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

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={Object.keys(errors).length > 0}>
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
