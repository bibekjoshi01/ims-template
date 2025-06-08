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
        const { photo, addresses, ...rest } = values;
        const body = new FormData();

        for (const [key, value] of Object.entries(rest)) {
          if (value !== undefined && value !== null) {
            body.append(key, value as string | Blob);
          }
        }

        // Append nested addresses
        if (Array.isArray(addresses)) {
          addresses.forEach((addr, index) => {
            Object.entries(addr).forEach(([addrKey, addrValue]) => {
              if (addrValue !== undefined && addrValue !== null) {
                body.append(`addresses[${index}][${addrKey}]`, addrValue);
              }
            });
          });
        }

        // Append photo if it's a valid File
        if (photo instanceof File) {
          body.append('photo', photo);
        }

        return {
          url: `${customerAPI}`,
          method: 'POST',
          data: body
        };
      },
      invalidatesTags: ['Customer']
    }),

    // Update Customer
    patchCustomer: builder.mutation<IMutationSuccessResponse, { id: number; values: ICustomerUpdatePayload }>({
      query: ({ id, values }) => {
        const { photo, addresses, ...rest } = values;
        const body = new FormData();

        // Append flat fields
        for (const [key, value] of Object.entries(rest)) {
          if (value !== undefined && value !== null) {
            // @ts-ignore
            body.append(key, value);
          }
        }

        // Append nested addresses
        if (Array.isArray(addresses)) {
          addresses.forEach((addr, index) => {
            Object.entries(addr).forEach(([addrKey, addrValue]) => {
              if (addrValue !== undefined && addrValue !== null) {
                body.append(`addresses[${index}][${addrKey}]`, addrValue);
              }
            });
          });
        }

        // Append photo if it's a valid File
        if (photo instanceof File) {
          body.append('photo', photo);
        }

        return {
          url: `${customerAPI}/${id}`,
          method: 'PATCH',
          data: body
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
    }),

    // Archive Customer Address
    archiveCustomerAddress: builder.mutation<IMutationSuccessResponse, { id: number; address_id: number }>({
      query: ({ id, address_id }) => {
        return {
          url: `${customerAPI}/${id}/address/${address_id}/delete`,
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
  useArchiveCustomerMutation,
  useArchiveCustomerAddressMutation
} = customerAPISlice;
