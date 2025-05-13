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
import { useGetUserRoleUserPermissionsQuery, usePatchUserRoleMutation } from '../../redux/user-role.api';

// Form Schema, Defaults, Types
import { SelectOption } from '@/components/CustomInput';
import { UserPermissionItem } from '../../redux/types';
import { defaultValues, UserRoleUpdateFormDataType, userRoleUpdateFormFields, userRoleUpdateFormSchema } from './userRoleUpdateForm.config';

interface UserRoleUpdateFormProps {
  userRoleData?: any;
  onClose?: () => void;
}

export default function UserRoleUpdateForm({ userRoleData, onClose }: UserRoleUpdateFormProps) {
  const dispatch = useAppDispatch();
  const [updateUserRole] = usePatchUserRoleMutation();

  const { data: permissionsData } = useGetUserRoleUserPermissionsQuery({
    search: '',
    paginationModel: { page: 0, pageSize: 100 },
    sortModel: []
  });

  const [formFields, setFormFields] = useState(userRoleUpdateFormFields);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserRoleUpdateFormDataType>({
    resolver: zodResolver(userRoleUpdateFormSchema),
    defaultValues
  });

  // Reset form with user-role data when it's available
  useEffect(() => {
    if (userRoleData) {
      const userRoleFormData = {
        ...userRoleData,
        permissions: userRoleData.permissions.map((permission: { id: number }) => permission.id)
      };
      reset(userRoleFormData);
    }
  }, [userRoleData, reset]);

  // This is for form update not for inline update
  const onSubmit = async (data: UserRoleUpdateFormDataType) => {
    const { id, ...values } = data;
    const payload = { id, values };
    try {
      const res = await updateUserRole(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      dispatch(
        setMessage({
          message: 'Failed to update user role. Please try again.',
          variant: 'error'
        })
      );
    }
  };

  // Dynamically update permissions options once loaded
  useEffect(() => {
    if (permissionsData?.count) {
      const permissionsOptions: SelectOption[] = permissionsData.results.map((permission: UserPermissionItem) => ({
        label: permission.name,
        value: permission.id,
        groupName: permission.permissionCategoryName + ' : ' + permission.mainModuleName
      }));

      setFormFields((prev) => prev.map((field) => (field.name === 'permissions' ? { ...field, options: permissionsOptions } : field)));
    }
  }, [permissionsData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ my: 1 }}>
        <Grid item xs={12}>
          <MainCard divider title={'Update User Role'}>
            <FormSection<UserRoleUpdateFormDataType> fields={formFields} control={control} errors={errors} />
          </MainCard>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
