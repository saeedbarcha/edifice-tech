import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}`,
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
       query:(productId) => ({
        url:`${PRODUCTS_URL}/${productId}`,
        method: "DELETE"
       }),
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url:`${PRODUCTS_URL}/${data.productId}/reviews`,
        method:"POST",
        body:data,
      }),
      invalidatesTags:['Products']
    }),

    getTopProducts: builder.query({
      query:() => ({
        url:`${PRODUCTS_URL}/top`,
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5
    }),
  }),
});


export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery
} = productsApiSlice;
