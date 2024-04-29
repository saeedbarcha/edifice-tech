import { BLOGS_URL } from "../constants";
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
      invalidatesTags: ["Blogs"],
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
  useUpdateBlogMutation
} = blogApiSlice;
