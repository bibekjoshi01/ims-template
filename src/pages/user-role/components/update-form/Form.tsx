// PACKAGE IMPORTS
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

// PROJECT IMPORTS

import FormSection from '@/components/app-form/FormSection';
import MainCard from '@/components/cards/MainCard';
import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { handleClientError } from '@/utils/functions/handleError';

// LOCAL IMPORTS
import { useMainModules } from '../../hooks/useMainModules';
import { usePermissions } from '../../hooks/usePermissions';
import { useSubModules } from '../../hooks/useSubModules';
import { UserRoleDetailed } from '../../redux/types';
import { usePatchUserRoleMutation } from '../../redux/user-role.api';
import PermissionTransfer, { UserPermission } from '../PermissionTransfer';
import { defaultValues, UserRoleUpdateFormDataType, userRoleUpdateFormFields, userRoleUpdateFormSchema } from './config';

interface UserRoleUpdateFormProps {
  userRoleData?: UserRoleDetailed;
  onClose?: () => void;
}

export default function UserRoleUpdateForm({ userRoleData, onClose }: UserRoleUpdateFormProps) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [updateUserRole] = usePatchUserRoleMutation();
  const [formFields, setFormFields] = useState(userRoleUpdateFormFields);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors }
  } = useForm<UserRoleUpdateFormDataType>({
    resolver: zodResolver(userRoleUpdateFormSchema),
    defaultValues
  });

  const mainModule = watch('mainModule');
  const subModule = watch('subModule');
  const selectedPermissions = watch('selectedPermissions') || [];

  const mainModuleOptions = useMainModules();
  const subModuleOptions = useSubModules(mainModule);
  const allPermissions = usePermissions(selectedPermissions, mainModule, subModule);

  const formattedPermissions = useMemo(() => allPermissions.map((perm) => ({ id: perm.value, name: perm.label })), [allPermissions]);

  const selectedUserPermissions = useMemo(
    () => formattedPermissions.filter((perm) => selectedPermissions.includes(perm.id as number)),
    [formattedPermissions, selectedPermissions]
  );

  const handlePermissionsChange = useCallback(
    (newSelected: UserPermission[]) => {
      const selectedIds = newSelected.map((perm) => perm.id as number);
      setValue('selectedPermissions', selectedIds, { shouldValidate: true });
    },
    [setValue]
  );

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
      handleClientError<UserRoleUpdateFormDataType>({
        error,
        setError,
        enqueueSnackbar,
        fieldKeyMap: {
          name: 'name',
          permissions: 'selectedPermissions',
          isActive: 'isActive'
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard divider title="Update User Role">
            <FormSection<UserRoleUpdateFormDataType> fields={formFields} control={control} errors={errors} />

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
