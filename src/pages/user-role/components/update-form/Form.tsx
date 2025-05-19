import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Custom Hooks
import { useMainModules } from '../../hooks/useMainModules';
import { useSubModules } from '../../hooks/useSubModules';
import { usePermissions } from '../../hooks/usePermissions';

// UI Components
import FormSection from '@/components/FormSection';
import MainCard from '@/components/MainCard';
import PermissionTransfer, { UserPermission } from '../PermissionTransfer';

// Utilities & API
import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { usePatchUserRoleMutation } from '../../redux/user-role.api';

// Form Schema, Defaults, Types
import { defaultValues, UserRoleUpdateFormDataType, userRoleUpdateFormFields, userRoleUpdateFormSchema } from './userRoleUpdateForm.config';
import { UserRoleDetailed } from '../../redux/types';

interface UserRoleUpdateFormProps {
  userRoleData?: UserRoleDetailed;
  onClose?: () => void;
}

export default function UserRoleUpdateForm({ userRoleData, onClose }: UserRoleUpdateFormProps) {
  const dispatch = useAppDispatch();
  const [updateUserRole] = usePatchUserRoleMutation();
  const [formFields, setFormFields] = useState(userRoleUpdateFormFields);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<UserRoleUpdateFormDataType>({
    resolver: zodResolver(userRoleUpdateFormSchema),
    defaultValues
  });

  // Watches the form fields for reactive data fetching.
  const mainModule = watch('mainModule');
  const subModule = watch('subModule');
  const selectedPermissions = watch('selectedPermissions') || [];

  // Fetch data using custom hooks
  const mainModuleOptions = useMainModules();
  const subModuleOptions = useSubModules(mainModule);
  const allPermissions = usePermissions(selectedPermissions, mainModule, subModule);

  // Memoized formatted permissions
  const formattedPermissions = useMemo(() => allPermissions.map((perm) => ({ id: perm.value, name: perm.label })), [allPermissions]);

  // Convert selectedPermissions IDs to permission objects
  const selectedUserPermissions = useMemo(
    () => formattedPermissions.filter((perm) => selectedPermissions.includes(perm.id as number)),
    [formattedPermissions, selectedPermissions]
  );

  /**
   * Updates the selected permissions in the form state.
   */
  const handlePermissionsChange = useCallback(
    (newSelected: UserPermission[]) => {
      const selectedIds = newSelected.map((perm) => perm.id as number);
      setValue('selectedPermissions', selectedIds, { shouldValidate: true });
    },
    [setValue]
  );

  /**
   * Update form field options for mainModule and subModule.
   */
  useMemo(() => {
    setFormFields((prev) =>
      prev.map((field) => {
        if (field.name === 'mainModule') {
          return { ...field, options: mainModuleOptions };
        }
        if (field.name === 'subModule') {
          return { ...field, options: subModuleOptions };
        }
        return field;
      })
    );
  }, [mainModuleOptions, subModuleOptions]);

  /**
   * Reset form with user role data when it's available.
   */
  /**
   * Reset form with user role data when it's available.
   */
  useEffect(() => {
    if (userRoleData) {
      const userRoleFormData: UserRoleUpdateFormDataType = {
        id: userRoleData.id ?? 0,
        name: userRoleData.name,
        isActive: userRoleData.isActive,
        mainModule: '',
        subModule: '',
        allPermissions: [],
        selectedPermissions: userRoleData.permissions.map((perm) => perm.id) || []
      };
      reset(userRoleFormData);
    }
  }, [userRoleData, reset]);

  /**
   * Form submission handler.
   */
  const onSubmit = async (data: UserRoleUpdateFormDataType) => {
    const { id, ...updateData } = data;
    const values = {
      name: updateData.name,
      permissions: updateData.selectedPermissions,
      isActive: updateData.isActive
    };
    try {
      const payload = { id, values };
      const res = await updateUserRole(payload).unwrap();
      dispatch(setMessage({ message: res.message, variant: 'success' }));
      onClose?.();
    } catch (error) {
      dispatch(setMessage({ message: 'Failed to update user role.', variant: 'error' }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard divider title="Update User Role">
            {/* Form Section with other fields */}
            <FormSection<UserRoleUpdateFormDataType> fields={formFields} control={control} errors={errors} />

            {/* Permission Transfer Component */}
            <PermissionTransfer
              allPermissions={formattedPermissions}
              selectedPermissions={selectedUserPermissions}
              onChange={handlePermissionsChange}
            />
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
