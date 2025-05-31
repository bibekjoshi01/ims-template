import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

// Custom Hooks
import { useMainModules } from '../../hooks/useMainModules';
import { usePermissions } from '../../hooks/usePermissions';
import { useSubModules } from '../../hooks/useSubModules';

// UI Components
import FormSection from '@/components/FormSection';
import MainCard from '@/components/MainCard';

// Utilities & API
import { useAppDispatch } from '@/libs/hooks';
import { setMessage } from '@/pages/common/redux/common.slice';
import { useCreateUserRoleMutation } from '../../redux/user-role.api';

// Form Schema, Defaults, Types
import { handleClientError } from '@/utils/functions/handleError';
import { useSnackbar } from 'notistack';
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
   * Form submission handler.
   */
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
            {/* Form Section with other fields */}
            <FormSection<UserRoleCreateFormDataType> fields={formFields} control={control} errors={errors} />

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
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
