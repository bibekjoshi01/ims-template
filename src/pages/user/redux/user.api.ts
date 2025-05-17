import { rootAPI } from '@/libs/apiSlice';
import { UserDetails, UserInput, UserList, UserListQueryParams, UseRoleList, UserRolesListQueryParams, UserUpdateInput } from './types';
import { getQueryParams } from '@/utils/functions/queryBuilder';

export const userAPI = 'admin/user-app/users';

export const userAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    //Get Users
    getUsers: builder.query<UserList, UserListQueryParams>({
      query: ({ search, paginationModel, sortModel, filterModel }) => {
        // build query params
        const { page, pageSize, orderingString, filterString } = getQueryParams({
          search,
          paginationModel,
          sortModel,
          filterModel
        });

        return {
          url: `${userAPI}?offset=${page * pageSize}&limit=${pageSize}&search=${search ?? ''}&ordering=${orderingString}&${filterString}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['User']
    }),

    // Retrieve User
    retrieveUser: builder.query<UserDetails, number | null>({
      query: (id) => {
        return {
          url: `${userAPI}/${id}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['User']
    }),

    // Create User
    createUser: builder.mutation({
      query: (values: UserInput) => {
        const { roles, photo, ...rest } = values;
        const body = new FormData();
        for (const [key, value] of Object.entries(rest)) {
          if (value !== undefined && value !== null) {
            //@ts-ignore
            body.append(key, value);
          }
        }
        if (Array.isArray(roles)) {
          roles.forEach((roleId, index) => {
            body.append(`roles[${index}]`, roleId.toString());
          });
        }
        if (photo instanceof File) {
          body.append('photo', photo);
        }
        return {
          url: `${userAPI}`,
          method: 'POST',
          data: body
        };
      },
      invalidatesTags: ['User']
    }),

    // Update User
    patchUser: builder.mutation({
      query: ({ id, values }: { id: number; values: UserUpdateInput }) => {
        const { roles, photo, ...rest } = values;
        const body = new FormData();

        for (const [key, value] of Object.entries(rest)) {
          if (value !== undefined && value !== null) {
            //@ts-ignore
            body.append(key, value);
          }
        }

        if (Array.isArray(roles)) {
          roles.forEach((roleId, index) => {
            body.append(`roles[${index}]`, roleId.toString());
          });
        }

        if (photo instanceof File) {
          body.append('photo', photo);
        }

        return {
          url: `${userAPI}/${id}`,
          method: 'PATCH',
          data: body
        };
      },
      invalidatesTags: ['User']
    }),

    // Get User Roles
    getUserRoles: builder.query<UseRoleList, UserRolesListQueryParams>({
      query: () => {
        return {
          url: `${userAPI}/roles`,
          method: 'GET'
        };
      },
      providesTags: ['User'],
      keepUnusedDataFor: 0.1
    })
  })
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useRetrieveUserQuery,
  useLazyRetrieveUserQuery,
  useCreateUserMutation,
  usePatchUserMutation,
  useGetUserRolesQuery
} = userAPISlice;
