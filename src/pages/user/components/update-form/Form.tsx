import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// UI Components
import FormSection from '@/components/FormSection';
import MainCard from '@/components/MainCard';

// Utilities & API
import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { splitName } from '@/utils/functions/splitCombineName';
import { useGetUserRolesQuery, usePatchUserMutation } from '../../redux/user.api';

// Form Schema, Defaults, Types
import { SelectOption } from '@/components/CustomInput';
import { handleClientError } from '@/utils/functions/handleError';
import { useSnackbar } from 'notistack';
import { UserRole } from '../../redux/types';
import { defaultValues, userInfoUpdateFields, UserInfoUpdateFormDataType, userInfoUpdateFormSchema } from './userUpdateForm.config';

interface UserFormProps {
  userData?: any;
  onClose?: () => void;
}

export default function UserUpdateForm({ userData, onClose }: UserFormProps) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [updateUser] = usePatchUserMutation();
  const { data: rolesData } = useGetUserRolesQuery({
    search: '',
    paginationModel: { page: 0, pageSize: 100 },
    sortModel: []
  });
  const [formFields, setFormFields] = useState(userInfoUpdateFields);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset
  } = useForm<UserInfoUpdateFormDataType>({
    resolver: zodResolver(userInfoUpdateFormSchema),
    defaultValues
  });

  // Reset form with user data when it's available
  useEffect(() => {
    if (userData) {
      const userFormData = {
        id: userData.id,
        name: `${userData.firstName} ${userData.lastName}`,
        phoneNo: userData.phoneNo || '',
        roles: userData.roles.map((role: { id: number; name: string; codename: string }) => role.id),
        isActive: userData.isActive,
        photo: userData.photo || undefined
      };

      reset(userFormData);
    }
  }, [userData, reset]);

  // This is for form update not for inline update
  const onSubmit = async (data: UserInfoUpdateFormDataType) => {
    try {
      const { id, name, phoneNo, roles, isActive, photo } = data;
      const { firstName, lastName } = splitName(name);
      const payload = {
        id,
        values: {
          firstName,
          lastName,
          phoneNo,
          roles,
          isActive,
          photo
        }
      };

      const res = await updateUser(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      handleClientError<UserInfoUpdateFormDataType>({
        error,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          firstName: 'name',
          lastName: 'name',
          roles: 'roles',
          photo: 'photo',
          phoneNo: 'phoneNo',
          isActive: 'isActive'
        }
      });
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ pt: 1 }}>
        <Grid item xs={12}>
          <MainCard divider title={'Update User'}>
            <FormSection<UserInfoUpdateFormDataType> fields={formFields} control={control} errors={errors} />
          </MainCard>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Update User
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
