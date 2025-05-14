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
import { useCreateUserRoleMutation, useGetUserRoleUserPermissionsQuery } from '../../redux/user-role.api';

// Form Schema, Defaults, Types
import { SelectOption } from '@/components/CustomInput';
import { UserPermissionItem } from '../../redux/types';
import { defaultValues, UserRoleCreateFormDataType, userRoleCreateFormFields, userRoleCreateFormSchema } from './userRoleCreateForm.config';

interface UserRoleCreateFormProps {
  onClose?: () => void;
}

export default function UserRoleCreateForm({ onClose }: UserRoleCreateFormProps) {
  const dispatch = useAppDispatch();
  const [createUserRole] = useCreateUserRoleMutation();
  const { data: permissionsData } = useGetUserRoleUserPermissionsQuery({
    search: '',
    paginationModel: { page: 0, pageSize: 100 },
    sortModel: []
  });
  const [formFields, setFormFields] = useState(userRoleCreateFormFields);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserRoleCreateFormDataType>({
    resolver: zodResolver(userRoleCreateFormSchema),
    defaultValues
  });

  const onSubmit = async (data: UserRoleCreateFormDataType) => {
    try {
      const res = await createUserRole(data).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      console.error('Error creating user role:', error);
    }
  };

  // Dynamically update permissions options once loaded
  useEffect(() => {
    if (permissionsData?.count) {
      const permissionOptions: SelectOption[] = permissionsData.results.map((permission: UserPermissionItem) => ({
        label: permission.name,
        value: permission.id,
        groupName: permission.permissionCategoryName + ' : ' + permission.mainModuleName
      }));

      setFormFields((prev) => prev.map((field) => (field.name === 'permissions' ? { ...field, options: permissionOptions } : field)));
    }
  }, [permissionsData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ my: '1px' }}>
        <Grid item xs={12} sx={{ py: '10px' }}>
          <MainCard divider title="Add New User Role">
            <FormSection<UserRoleCreateFormDataType> fields={formFields} control={control} errors={errors} />
          </MainCard>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
