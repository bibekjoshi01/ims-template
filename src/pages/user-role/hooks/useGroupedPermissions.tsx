import { useMemo } from 'react';
import { useGetUserRoleUserPermissionsQuery } from '../redux/user-role.api';
import { UserPermissionItem, UserRoleDetailed } from '../redux/types';

// Interface for organizing permissions hierarchically
export interface GroupedPermission {
  mainModuleName: UserPermissionItem['mainModuleName'];
  categories: {
    permissionCategoryName: UserPermissionItem['permissionCategoryName'];
    permissions: Array<{
      id: UserPermissionItem['id'];
      name: UserPermissionItem['name'];
    }>;
  }[];
}

export const useGroupedPermissions = (userRoleData?: UserRoleDetailed) => {
  // Fetch all user permissions
  const { data, isLoading } = useGetUserRoleUserPermissionsQuery({});

  // Extract selected permission IDs from userRoleData
  const selectedPermissionIds = useMemo(
    () => userRoleData?.permissions.map((p) => p.id).filter((id): id is number => id !== undefined) ?? [],
    [userRoleData]
  );

  // Filter the permissions based on selectedPermissionIds
  const selectedPermissions = useMemo<UserPermissionItem[]>(() => {
    return data?.results.filter((p) => selectedPermissionIds.includes(p.id ?? -1)) ?? [];
  }, [data, selectedPermissionIds]);

  // Group permissions by modulename and category and their permissions
  const groupedPermissions = useMemo<GroupedPermission[]>(() => {
    if (!selectedPermissions || selectedPermissions.length === 0) return [];

    // Indexed by mainModuleName and stores the grouped permissions
    const permissionMap = new Map<UserPermissionItem['mainModuleName'], GroupedPermission>();

    selectedPermissions.forEach((perm) => {
      const moduleName = perm.mainModuleName || 'General';

      // Check if the main module group already exists, if not create it
      if (!permissionMap.has(moduleName)) {
        permissionMap.set(moduleName, {
          mainModuleName: moduleName,
          categories: []
        });
      }

      const moduleGroup = permissionMap.get(moduleName)!;
      const categoryName = perm.permissionCategoryName || 'General';

      // get the categrory group from the main module group
      let categoryGroup = moduleGroup.categories.find((cat) => cat.permissionCategoryName === categoryName);

      // if not found, create a new category group with empty permissions
      if (!categoryGroup) {
        categoryGroup = {
          permissionCategoryName: categoryName,
          permissions: []
        };
        moduleGroup.categories.push(categoryGroup);
      }

      // Add the permission to the category group
      if (perm.id) {
        categoryGroup.permissions.push({
          id: perm.id,
          name: perm.name
        });
      }
    });

    // Convert the map to an array
    return Array.from(permissionMap.values());
  }, [selectedPermissions]);

  return { selectedPermissions, groupedPermissions, isLoading };
};
