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
import {
  useCreateUserRoleMutation,
  useGetUserRoleMainModulesQuery,
  useLazyGetUserRolePermissionCategoriesQuery,
  useLazyGetUserRoleUserPermissionsQuery
} from '../../redux/user-role.api';

// Form Schema, Defaults, Types
import { SelectOption } from '@/components/CustomInput';
import { UserRoleMainModules, UserRoleSubModules } from '../../redux/types';
import { defaultValues, UserRoleCreateFormDataType, userRoleCreateFormFields, userRoleCreateFormSchema } from './userRoleCreateForm.config';

interface UserRoleCreateFormProps {
  onClose?: () => void;
}

export default function UserRoleCreateForm({ onClose }: UserRoleCreateFormProps) {
  const dispatch = useAppDispatch();
  const [createUserRole] = useCreateUserRoleMutation();
  const [formFields, setFormFields] = useState(userRoleCreateFormFields);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<UserRoleCreateFormDataType>({
    resolver: zodResolver(userRoleCreateFormSchema),
    defaultValues
  });

  // NOTE - Fetch main modules
  const { data: mainModulesData } = useGetUserRoleMainModulesQuery();
  // NOTE - and update mainModuleOptions in form fields
  useEffect(() => {
    if (mainModulesData?.count) {
      const mainModuleOptions: SelectOption[] = mainModulesData.results.map((mainModule: UserRoleMainModules['results'][number]) => ({
        label: mainModule.name,
        value: mainModule.id
      }));
      setFormFields((prev) => prev.map((field) => (field.name === 'mainModule' ? { ...field, options: mainModuleOptions } : field)));
    }
  }, [mainModulesData]);

  // Watch for changes in the main module and sub module fields
  const mainModule = watch('mainModule');
  const subModule = watch('subModule');

  // NOTE - Fetch all permissions when mainModule and subModule are updated
  const [fetchAllPermissions] = useLazyGetUserRoleUserPermissionsQuery();
  useEffect(() => {
    (async () => {
      if (mainModule) {
        // NOTE - Fetch all permissions based on mainModule and subModule
        const res = await fetchAllPermissions({ mainModule, subModule }).unwrap();

        // NOTE - Update allPermissionsOptions in form fields
        if (res) {
          const allPermissionsOptions: SelectOption[] = res.results.map((permission) => ({
            label: permission.name,
            value: permission.id,
            groupName: permission.mainModuleName + ' ' + permission.permissionCategoryName
          }));
          setFormFields((prev) =>
            prev.map((field) => (field.name === 'allPermissions' ? { ...field, options: allPermissionsOptions } : field))
          );
        }
      }
    })();
  }, [mainModule, subModule, fetchAllPermissions]);

  // NOTE - Fetch submodules when mainModule is updated
  // and update subModuleOptions in form fields
  const [fetchSubModules] = useLazyGetUserRolePermissionCategoriesQuery();
  useEffect(() => {
    (async () => {
      if (mainModule) {
        // NOTE - Fetch submodules based on mainModule
        const res = await fetchSubModules({ mainModule }).unwrap();

        // NOTE - Update subModuleOptions in form fields
        if (res) {
          const subModuleOptions: SelectOption[] = res.results.map((subModule: UserRoleSubModules['results'][number]) => ({
            label: subModule.name,
            value: subModule.id
          }));
          setFormFields((prev) => prev.map((field) => (field.name === 'subModule' ? { ...field, options: subModuleOptions } : field)));
        }
      }
    })();
  }, [mainModule, fetchSubModules]);

  const onSubmit = async (data: UserRoleCreateFormDataType) => {
    try {
      const payload = {
        name: data.name,
        permissions: data.selectedPermissions,
        isActive: data.isActive
      };
      const res = await createUserRole(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      console.error('Error creating user role:', error);
    }
  };

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
