import { rootAPI } from '@/libs/apiSlice';
import {
  CreateUserRole,
  UpdateUserRole,
  UserPermissionCategory,
  UserRoleDetailed,
  UserRoleList,
  UserRoleListQueryParams,
  UserRoleMainModules,
  UserRoleSubModules
} from './types';
import { getQueryParams } from '@/utils/functions/queryBuilder';

export const userRoleAPI = 'admin/user-app/roles';

export const userRoleAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get Roles
    getRoles: builder.query<UserRoleList, UserRoleListQueryParams>({
      query: ({ search, paginationModel, sortModel, filterModel }) => {
        // build query params
        const { page, pageSize, orderingString, filterString } = getQueryParams({
          search,
          paginationModel,
          sortModel,
          filterModel
        });

        return {
          url: `${userRoleAPI}?offset=${page * pageSize}&limit=${pageSize}&search=${search ?? ''}&ordering=${orderingString}&${filterString}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['UserRole']
    }),

    // Retrieve User Role
    retrieveUserRole: builder.query<UserRoleDetailed, number | undefined>({
      query: (id) => {
        return {
          url: `${userRoleAPI}/${id}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['UserRole']
    }),

    // Create User Role
    createUserRole: builder.mutation<{ id: number; message: string }, CreateUserRole>({
      query: (values) => {
        const body = JSON.stringify(values);
        return {
          url: `${userRoleAPI}`,
          method: 'POST',
          data: body
        };
      },
      invalidatesTags: ['UserRole']
    }),

    // Patch User Role
    patchUserRole: builder.mutation<{ id: number; message: string }, UpdateUserRole>({
      query: ({ id, values }) => {
        return {
          url: `${userRoleAPI}/${id}`,
          method: 'PATCH',
          data: values
        };
      },
      invalidatesTags: ['UserRole']
    }),

    // Get Main Modules
    getUserRoleMainModules: builder.query<UserRoleMainModules, void>({
      query: () => {
        return {
          url: `${userRoleAPI}/main-modules`,
          method: 'GET'
        };
      },
      providesTags: ['UserRole'],
      keepUnusedDataFor: 0.1
    }),

    // Get Permission Categories OR Sub Modules
    getUserRolePermissionCategories: builder.query<UserRoleSubModules, { mainModule?: number | string }>({
      query: ({ mainModule }) => {
        return {
          url: `${userRoleAPI}/permission-categories?main_module=${mainModule ?? ''}`,
          method: 'GET'
        };
      },
      providesTags: ['UserRole'],
      keepUnusedDataFor: 0.1
    }),

    // Ger User Permissions
    getUserRoleUserPermissions: builder.query<UserPermissionCategory, { mainModule?: number | string; subModule?: number | string }>({
      query: ({ mainModule, subModule }) => {
        return {
          url: `${userRoleAPI}/permissions?main_module=${mainModule ?? ''}&permission_category=${subModule ?? ''}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.01
    }),
    // Archive User Role
    archiveUserRole: builder.mutation<{ id: number; message: string }, number>({
      query: (id) => {
        return {
          url: `${userRoleAPI}/${id}/archive`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['UserRole']
    })
  })
});

export const {
  useGetRolesQuery,
  useRetrieveUserRoleQuery,
  useCreateUserRoleMutation,
  usePatchUserRoleMutation,
  useGetUserRoleMainModulesQuery,
  useGetUserRolePermissionCategoriesQuery,
  useLazyGetUserRolePermissionCategoriesQuery,
  useGetUserRoleUserPermissionsQuery,
  useLazyGetUserRoleUserPermissionsQuery,
  useArchiveUserRoleMutation
} = userRoleAPISlice;
