import { IListQueryParams, IMutationSuccessResponse } from '@/globals';
import { rootAPI } from '@/libs/apiSlice';
import { getQueryParams } from '@/utils/functions/queryBuilder';
import { ICustomerCreatePayload, ICustomerDetails, ICustomerList, ICustomerUpdatePayload } from './types';

export const customerAPI = 'admin/customer-mod/customers';

export const customerAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    //Get Customers
    getCustomers: builder.query<ICustomerList, IListQueryParams>({
      query: ({ search, paginationModel, sortModel, filterModel }) => {
        // build query params
        const { page, pageSize, orderingString, filterString } = getQueryParams({
          search,
          paginationModel,
          sortModel,
          filterModel
        });

        return {
          url: `${customerAPI}?offset=${page * pageSize}&limit=${pageSize}&search=${search ?? ''}&ordering=${orderingString}&${filterString}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['Customer']
    }),

    // Retrieve Customer
    retrieveCustomer: builder.query<ICustomerDetails, number | null>({
      query: (id) => {
        return {
          url: `${customerAPI}/${id}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['Customer']
    }),

    // Create Customer
    createCustomer: builder.mutation<IMutationSuccessResponse, ICustomerCreatePayload>({
      query: (values) => {
        return {
          url: `${customerAPI}`,
          method: 'POST',
          data: values
        };
      },
      invalidatesTags: ['Customer']
    }),

    // Update Customer
    patchCustomer: builder.mutation<IMutationSuccessResponse, { id: number; values: ICustomerUpdatePayload }>({
      query: ({ id, values }) => {
        return {
          url: `${customerAPI}/${id}`,
          method: 'PATCH',
          data: values
        };
      },
      invalidatesTags: ['Customer']
    }),

    // Archive Customer
    archiveCustomer: builder.mutation<IMutationSuccessResponse, number>({
      query: (id) => {
        return {
          url: `${customerAPI}/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Customer']
    })
  })
});

export const {
  useGetCustomersQuery,
  useLazyGetCustomersQuery,
  useRetrieveCustomerQuery,
  useLazyRetrieveCustomerQuery,
  useCreateCustomerMutation,
  usePatchCustomerMutation,
  useArchiveCustomerMutation
} = customerAPISlice;
