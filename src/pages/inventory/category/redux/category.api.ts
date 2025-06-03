import { IListQueryParams, IMutationSuccessResponse } from '@/globals';
import { rootAPI } from '@/libs/apiSlice';
import { getQueryParams } from '@/utils/functions/queryBuilder';
import { ICategoryCreatePayload, ICategoryDetails, ICategoryList, ICategoryUpdatePayload } from './types';

export const categoryAPI = 'admin/inventory/catalog-mod/categories';

export const categoryAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    //Get Categories
    getCategories: builder.query<ICategoryList, IListQueryParams>({
      query: ({ search, paginationModel, sortModel, filterModel }) => {
        // build query params
        const { page, pageSize, orderingString, filterString } = getQueryParams({
          search,
          paginationModel,
          sortModel,
          filterModel
        });

        return {
          url: `${categoryAPI}?offset=${page * pageSize}&limit=${pageSize}&search=${search ?? ''}&ordering=${orderingString}&${filterString}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['ProductCategory']
    }),

    // Retrieve Category
    retrieveCategory: builder.query<ICategoryDetails, number>({
      query: (id) => {
        return {
          url: `${categoryAPI}/${id}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['ProductCategory']
    }),

    // Create Category
    createCategory: builder.mutation<IMutationSuccessResponse, ICategoryCreatePayload>({
      query: (values) => {
        const { icon, ...rest } = values;
        const body = new FormData();

        for (const [key, value] of Object.entries(rest)) {
          if (value !== undefined && value !== null) {
            body.append(key, value as string | Blob);
          }
        }

        if (icon instanceof File) {
          body.append('icon', icon);
        }

        return {
          url: `${categoryAPI}`,
          method: 'POST',
          data: body
        };
      },
      invalidatesTags: ['ProductCategory']
    }),

    // Update Category
    patchCategory: builder.mutation<IMutationSuccessResponse, { id: number; values: ICategoryUpdatePayload }>({
      query: ({ id, values }) => {
        const { icon, ...rest } = values;
        const body = new FormData();

        for (const [key, value] of Object.entries(rest)) {
          if (value !== undefined && value !== null) {
            body.append(key, value as string | Blob);
          }
        }

        if (icon instanceof File) {
          body.append('icon', icon);
        }

        return {
          url: `${categoryAPI}/${id}`,
          method: 'PATCH',
          data: body
        };
      },
      invalidatesTags: ['ProductCategory']
    }),

    // Archive Category
    archiveCategory: builder.mutation<IMutationSuccessResponse, number>({
      query: (id) => {
        return {
          url: `${categoryAPI}/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['ProductCategory']
    })
  })
});

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useRetrieveCategoryQuery,
  useLazyRetrieveCategoryQuery,
  useCreateCategoryMutation,
  usePatchCategoryMutation,
  useArchiveCategoryMutation
} = categoryAPISlice;
