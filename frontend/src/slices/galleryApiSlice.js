import { GALLERY_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const galleryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getGallery: builder.query({
      query: () => ({
        url: `${GALLERY_URL}`,
        }),
      providesTags: ["Gallery"],
      keepUnusedDataFor: 5,
    }),

    uploadGallaryImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    createGallery: builder.mutation({
      query: (data) => ({
        url: `${GALLERY_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Gallery"],
    }),
    
    updateGalleryItem: builder.mutation({
      query: (data) => ({
        url: `${GALLERY_URL}/${data.galleryItemId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Gallery"],
    }),
  //   getActiveBlogs: builder.query({
  //     query: () => ({
  //       url: `${BLOGS_URL}/active-blogs`,
  //       }),
  //     providesTags: ["Blogs"],
  //     keepUnusedDataFor: 5,
  //   }),
  //   getBlogDetails: builder.query({
  //     query: (blogId) => ({
  //       url: `${BLOGS_URL}/${blogId}`,
  //     }),
  //     providesTags: ["Blogs"],
  //     keepUnusedDataFor: 5,
  //   }),
    deleteGalleryItem: builder.mutation({
      query:(galleryItemId) => ({
        url: `${GALLERY_URL}/${galleryItemId}`,
        method: "DELETE"
      }),
   }),
  }),
  
});

export const {
useGetGalleryQuery,
useUploadGallaryImageMutation,
useUpdateGalleryItemMutation,
useDeleteGalleryItemMutation,
useCreateGalleryMutation,
} = galleryApiSlice;
