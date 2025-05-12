import { rootAPI } from '@/libs/apiSlice';
import { UserRoleList, UserRoleListQueryParams } from './types';

export const userRoleAPI = 'admin/user-app/roles';

export const userRoleAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get User Roles
    getUserRoles: builder.query<UserRoleList, UserRoleListQueryParams>({
      query: ({ search, paginationModel, sortModel, filterModel }) => {
        // pagination
        const { page, pageSize } = paginationModel!;

        // ordering
        const ordering = sortModel?.[0]?.field; // name of the field to sort by
        const direction = sortModel?.[0]?.sort === 'asc' ? '-' : ''; // 'asc' or 'desc'
        const orderingString = ordering ? `${direction}${ordering}` : ''; // complete ordering string

        // filtering
        const filterField = filterModel?.items?.[0]?.field; // field to filter by
        const filterValue = filterModel?.items?.[0]?.value; // value of the filter
        const filterString = filterField && filterValue ? `${filterField}=${filterValue}` : ''; // complete filter string

        return {
          url: `${userRoleAPI}?offset=${page * pageSize}&limit=${pageSize}&search=${search ?? ''}&ordering=${orderingString}&${filterString}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['UserRole']
    }),

    // Retrieve User Role
    retrieveUserRole: builder.query({
      query: (id) => {
        return {
          url: `${userRoleAPI}/${id}`,
          method: 'GET'
        };
      },
      providesTags: ['UserRole']
    }),

    // Create User Role
    createUserRole: builder.mutation({
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
    patchUserRole: builder.mutation({
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
    getUserRoleMainModules: builder.query({
      query: () => {
        return {
          url: `${userRoleAPI}/main-modules`,
          method: 'GET'
        };
      },
      providesTags: ['UserRole']
    }),

    // Get Permission Categories
    getUserRolePermissionCategories: builder.query({
      query: ({ mainModule }) => {
        return {
          url: `${userRoleAPI}/user-permission-categories?main_module=${mainModule}`,
          method: 'GET'
        };
      },
      providesTags: ['UserRole'],
      keepUnusedDataFor: 0.1
    }),

    // Ger User Permissions
    getUserRoleUserPermissions: builder.query({
      query: ({ mainModule, subModule }) => {
        return {
          url: `${userRoleAPI}/permissions`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.01
    })
  })
});

export const {
  useGetUserRolesQuery,
  useRetrieveUserRoleQuery,
  useCreateUserRoleMutation,
  usePatchUserRoleMutation,
  useGetUserRoleMainModulesQuery,
  useGetUserRolePermissionCategoriesQuery,
  useGetUserRoleUserPermissionsQuery
} = userRoleAPISlice;
