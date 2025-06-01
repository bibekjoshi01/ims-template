// PACKAGE IMPORTS
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useState } from 'react';
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
import { useCreateUserRoleMutation } from '../../redux/user-role.api';

import PermissionTransfer, { UserPermission } from '../PermissionTransfer';
import { defaultValues, UserRoleCreateFormDataType, userRoleCreateFormFields, userRoleCreateFormSchema } from './config';

interface UserRoleCreateFormProps {
  onClose?: () => void;
}

export default function UserRoleCreateForm({ onClose }: UserRoleCreateFormProps) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [createUserRole] = useCreateUserRoleMutation();
  const [formFields, setFormFields] = useState(userRoleCreateFormFields);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors }
  } = useForm<UserRoleCreateFormDataType>({
    resolver: zodResolver(userRoleCreateFormSchema),
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
      handleClientError<UserRoleCreateFormDataType>({
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
          <MainCard divider title="Create User Role">
            <FormSection<UserRoleCreateFormDataType> fields={formFields} control={control} errors={errors} />

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
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
