import { IListQueryParams, IMutationSuccessResponse } from '@/globals';
import { rootAPI } from '@/libs/apiSlice';
import { getQueryParams } from '@/utils/functions/queryBuilder';
import {
  IProductCategoryListResponse,
  IProductCreatePayload,
  IProductDetails,
  IProductList,
  IProductUnitListResponse,
  IProductUpdatePayload
} from './types';

export const productAPI = 'admin/inventory/catalog-mod/products';

export const productAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    //Get Products
    getProducts: builder.query<IProductList, IListQueryParams>({
      query: ({ search, paginationModel, sortModel, filterModel }) => {
        // build query params
        const { page, pageSize, orderingString, filterString } = getQueryParams({
          search,
          paginationModel,
          sortModel,
          filterModel
        });

        return {
          url: `${productAPI}?offset=${page * pageSize}&limit=${pageSize}&search=${search ?? ''}&ordering=${orderingString}&${filterString}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['Product']
    }),

    // Retrieve Product
    retrieveProduct: builder.query<IProductDetails, number | null>({
      query: (id) => {
        return {
          url: `${productAPI}/${id}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['Product']
    }),

    // Create Product
    createProduct: builder.mutation<IMutationSuccessResponse, IProductCreatePayload>({
      query: (values) => {
        const { image, ...rest } = values;
        const body = new FormData();

        for (const [key, value] of Object.entries(rest)) {
          if (value !== undefined && value !== null) {
            body.append(key, value as string | Blob);
          }
        }

        if (image instanceof File) {
          body.append('image', image);
        }

        return {
          url: `${productAPI}`,
          method: 'POST',
          data: body
        };
      },
      invalidatesTags: ['Product']
    }),

    patchProduct: builder.mutation<IMutationSuccessResponse, { id: number; values: IProductUpdatePayload }>({
      query: ({ id, values }) => {
        const { image, ...rest } = values;
        const body = new FormData();

        for (const [key, value] of Object.entries(rest)) {
          if (value !== undefined && value !== null) {
            body.append(key, value as string | Blob);
          }
        }

        if (image instanceof File) {
          body.append('image', image);
        }

        return {
          url: `${productAPI}/${id}`,
          method: 'PATCH',
          data: body
        };
      },
      invalidatesTags: ['Product']
    }),

    // Get Product Categories
    getProductCategories: builder.query<IProductCategoryListResponse, IListQueryParams>({
      query: ({ search, paginationModel, sortModel, filterModel }) => {
        // build query params
        const { page, pageSize, orderingString, filterString } = getQueryParams({
          search,
          paginationModel,
          sortModel,
          filterModel
        });
        return {
          url: `${productAPI}/categories?offset=${page * pageSize}&limit=${pageSize}&search=${search ?? ''}&ordering=${orderingString}&${filterString}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['Product']
    }),

    // Get Product Units
    getProductUnits: builder.query<IProductUnitListResponse, IListQueryParams>({
      query: ({ search, paginationModel, sortModel, filterModel }) => {
        // build query params
        const { page, pageSize, orderingString, filterString } = getQueryParams({
          search,
          paginationModel,
          sortModel,
          filterModel
        });
        return {
          url: `${productAPI}/units?offset=${page * pageSize}&limit=${pageSize}&search=${search ?? ''}&ordering=${orderingString}&${filterString}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['Product']
    }),

    // Archive Product
    archiveProduct: builder.mutation<IMutationSuccessResponse, number>({
      query: (id) => {
        return {
          url: `${productAPI}/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Product']
    })
  })
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useRetrieveProductQuery,
  useLazyRetrieveProductQuery,
  useCreateProductMutation,
  useGetProductUnitsQuery,
  useGetProductCategoriesQuery,
  usePatchProductMutation,
  useArchiveProductMutation
} = productAPISlice;
