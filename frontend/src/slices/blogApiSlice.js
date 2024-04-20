import { BLOGS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getBlogs: builder.query({
      query: () => ({
        url: BLOGS_URL,
        }),
      providesTags: ["Blogs"],
      keepUnusedDataFor: 5,
    }),
    uploadBlogImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    createBlog: builder.mutation({
      query: () => ({
        url: `${BLOGS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.blogId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getActiveBlogs: builder.query({
      query: () => ({
        url: `${BLOGS_URL}/active-blogs`,
        }),
      providesTags: ["Blogs"],
      keepUnusedDataFor: 5,
    }),
    getBlogDetails: builder.query({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
      }),
      providesTags: ["Blogs"],
      keepUnusedDataFor: 5,
    }),
    deleteBlog: builder.mutation({
      query:(blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
        method: "DELETE"
      }),
   }),
  }),
  
});

export const {
  useGetBlogsQuery,
  useGetActiveBlogsQuery,
  useGetBlogDetailsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUploadBlogImageMutation,
  useUpdateBlogMutation
} = blogApiSlice;
