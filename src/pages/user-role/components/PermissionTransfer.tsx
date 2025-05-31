import TransferList from '@/components/transfer-list';
import React, { useMemo } from 'react';

export interface UserPermission {
  id: number | string;
  name: string | number;
}

interface PermissionTransferProps {
  allPermissions: UserPermission[];
  selectedPermissions: UserPermission[];
  onChange: (selected: UserPermission[]) => void;
  loading?: boolean;
  titleLeft?: string;
  titleRight?: string;
}

/**
 * PermissionTransfer - Wrapper around the generic TransferList to handle permissions specifically.
 */
const PermissionTransfer: React.FC<PermissionTransferProps> = ({
  allPermissions,
  selectedPermissions,
  onChange,
  loading = false,
  titleLeft = 'Available Permissions',
  titleRight = 'Selected Permissions'
}) => {
  /**
   * Converts the permissions array to the TransferList expected structure.
   * Ensures each item has a unique identifier and a display label/name.
   */
  const formattedPermissions = useMemo(() => allPermissions.map((perm) => ({ id: perm.id, name: perm.name })), [allPermissions]);

  const selectedIds = selectedPermissions.map((perm) => perm.id);

  return (
    <TransferList
      allItems={formattedPermissions}
      selectedItems={formattedPermissions.filter((perm) => selectedIds.includes(perm.id))}
      onChange={onChange}
      loading={loading}
      pk="id"
      renderLabel={(item) => item.name}
      titleLeft={titleLeft}
      titleRight={titleRight}
    />
  );
};

export default PermissionTransfer;
