import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

// UI Components
import MainCard from '@/components/MainCard';
import FormSection from '@/components/FormSection';

// Utilities & API
import { useAppDispatch } from '@/libs/hooks';
import { splitName } from '@/utils/splitCombineName';
import { setMessage } from '@/pages/common/redux/common.slice';
import { useGetUserRolesQuery, usePatchUserMutation } from '../../redux/user.api';
import fetchFileFromUrl from '@/utils/createFile';

// Form Schema, Defaults, Types
import { userInfoUpdateFormSchema, defaultValues, userInfoUpdateFields, UserInfoUpdateFormDataType } from './data';
import { SelectOption } from '@/components/CustomInput';
import { UserRole } from '../../redux/types';

interface UserFormProps {
  userData?: any; // User data from API
  onClose?: () => void;
}

export default function UserUpdateForm({ userData, onClose }: UserFormProps) {
  const dispatch = useAppDispatch();
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
    watch,
    formState: { errors },
    reset
  } = useForm<UserInfoUpdateFormDataType>({
    resolver: zodResolver(userInfoUpdateFormSchema),
    defaultValues
  });

  // Reset form with user data when it's available
  useEffect(() => {
    if (userData) {
      console.log('User Data:', userData);
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
      console.error('Error updating user:', error);
      dispatch(
        setMessage({
          message: 'Failed to update user. Please try again.',
          variant: 'error'
        })
      );
    }
  };

  console.log('image: ', watch('photo'));
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
      <Grid container spacing={3} sx={{ my: 1 }}>
        <Grid item xs={12}>
          <MainCard divider title={userData ? 'Update User' : 'Create New User'}>
            <FormSection<UserInfoUpdateFormDataType> fields={formFields} control={control} errors={errors} />
          </MainCard>
        </Grid>

        {/* <img src={userData.photo} alt="Profile" style={{ width: 120, height: 120 }} /> */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            {userData ? 'Update User' : 'Add User'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
