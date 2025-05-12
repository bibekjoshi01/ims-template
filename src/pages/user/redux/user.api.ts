import { rootAPI } from '@/libs/apiSlice';
import {
  UserDetails,
  UserInput,
  UserList,
  UserListQueryParams,
  UseRoleList,
  UserRole,
  UserRolesListQueryParams,
  UserUpdateInput
} from './types';

export const userAPI = 'admin/user-app/users';

export const userAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    //Get Users
    getUsers: builder.query<UserList, UserListQueryParams>({
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
  useRetrieveUserQuery,
  useLazyRetrieveUserQuery,
  useCreateUserMutation,
  usePatchUserMutation,
  useGetUserRolesQuery
} = userAPISlice;
