import { IListQueryParams, IMutationSuccessResponse } from '@/globals';
import { rootAPI } from '@/libs/apiSlice';
import { getQueryParams } from '@/utils/functions/queryBuilder';
import { ISupplierCreatePayload, ISupplierDetails, ISupplierList, ISupplierUpdatePayload } from './types';

export const supplierAPI = 'admin/supplier-mod/suppliers';

export const supplierAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    //Get Suppliers
    getSuppliers: builder.query<ISupplierList, IListQueryParams>({
      query: ({ search, paginationModel, sortModel, filterModel }) => {
        // build query params
        const { page, pageSize, orderingString, filterString } = getQueryParams({
          search,
          paginationModel,
          sortModel,
          filterModel
        });

        return {
          url: `${supplierAPI}?offset=${page * pageSize}&limit=${pageSize}&search=${search ?? ''}&ordering=${orderingString}&${filterString}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['Supplier']
    }),

    // Retrieve Supplier
    retrieveSupplier: builder.query<ISupplierDetails, number | null>({
      query: (id) => {
        return {
          url: `${supplierAPI}/${id}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['Supplier']
    }),

    // Create Supplier
    createSupplier: builder.mutation<IMutationSuccessResponse, ISupplierCreatePayload>({
      query: (values) => {
        return {
          url: `${supplierAPI}`,
          method: 'POST',
          data: values
        };
      },
      invalidatesTags: ['Supplier']
    }),

    // Update Supplier
    patchSupplier: builder.mutation<IMutationSuccessResponse, { id: number; values: ISupplierUpdatePayload }>({
      query: ({ id, values }) => {
        return {
          url: `${supplierAPI}/${id}`,
          method: 'PATCH',
          data: values
        };
      },
      invalidatesTags: ['Supplier']
    }),

    // Archive Supplier
    archiveSupplier: builder.mutation<IMutationSuccessResponse, number>({
      query: (id) => {
        return {
          url: `${supplierAPI}/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Supplier']
    })
  })
});

export const {
  useGetSuppliersQuery,
  useLazyGetSuppliersQuery,
  useRetrieveSupplierQuery,
  useLazyRetrieveSupplierQuery,
  useCreateSupplierMutation,
  usePatchSupplierMutation,
  useArchiveSupplierMutation
} = supplierAPISlice;
