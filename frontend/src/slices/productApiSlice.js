import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword = '', pageNumber = 1 }) => ({
        url: `${PRODUCTS_URL}`,
        params: {
          keyword: keyword || undefined,
          pageNumber: pageNumber || 1,
        },
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5,
    }),
    getActiveProducts: builder.query({
      query: ({ keyword = '', pageNumber = 1 }) => ({
        url: `${PRODUCTS_URL}/active-products`,
        params: {
          keyword: keyword || undefined,
          pageNumber: pageNumber || 1,
        },
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5,
    }),
    
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE"
      }),
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5
    }),
  }),
});


export const {
  useGetProductsQuery,
  useGetActiveProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetTopProductsQuery
} = productsApiSlice;
