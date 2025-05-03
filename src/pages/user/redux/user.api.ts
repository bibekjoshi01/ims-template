import { rootAPI } from '@/libs/apiSlice';
import { UserDetails, UserList, UserListQueryParams, UserRole } from './types';

export const userAPI = 'admin/user-app/users';

export const userAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    //Get Users
    getUsers: builder.query<UserList, UserListQueryParams>({
      query: ({ search, paginationDetail }) => {
        const { page, pageSize } = paginationDetail!;
        return {
          url: `${userAPI}?offset=${page * pageSize}&limit=${pageSize}&search=${search ?? ''}`,
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
      query: (values) => {
        const { roles, ...rest } = values;
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
      query: ({ id, values }) => {
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
        if (typeof photo !== 'string' && photo !== null) {
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
    getUserRoles: builder.query<UserRole[], UserListQueryParams>({
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

export const { useGetUsersQuery, useRetrieveUserQuery, useCreateUserMutation, usePatchUserMutation, useGetUserRolesQuery } = userAPISlice;
