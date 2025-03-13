import { rootAPI } from '@/libs/apiSlice';
import { BlogCategoryItem, BlogCategoryQueryParams, BlogCategoryResponse } from './types';

// Endpoints
export const blogAPI = 'admin/blog-app/';
export const blogCategoryAPI = 'admin/blog-app/categories';

export const blogAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Categories endpoints
    getBlogCategories: builder.query<BlogCategoryResponse, BlogCategoryQueryParams>({
      query: ({ search, paginationDetail = { page: 1, pageSize: 10 } }) => {
        const { page, pageSize } = paginationDetail;
        return {
          url: `${blogCategoryAPI}?offset=${page * pageSize}&limit=${pageSize}&search=${search ?? ''}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['BlogCategory']
    }),
    retrieveBlogCategory: builder.query<BlogCategoryItem, number>({
      query(id) {
        return {
          url: `${blogCategoryAPI}/${id}`,
          method: 'GET'
        };
      },
      keepUnusedDataFor: 0.1,
      providesTags: ['BlogCategory']
    }),
    addBlogCategory: builder.mutation({
      query: ({ values }) => {
        return {
          url: blogCategoryAPI,
          method: 'POST',
          data: values
        };
      },
      invalidatesTags: ['BlogCategory']
    }),
    updateBlogCategory: builder.mutation({
      query: ({ id, values }) => {
        return {
          url: `${blogCategoryAPI}/${id}`,
          method: 'PATCH',
          data: values
        };
      },
      invalidatesTags: ['BlogCategory']
    })
  })
});

export const { useGetBlogCategoriesQuery, useRetrieveBlogCategoryQuery, useAddBlogCategoryMutation, useUpdateBlogCategoryMutation } =
  blogAPISlice;
