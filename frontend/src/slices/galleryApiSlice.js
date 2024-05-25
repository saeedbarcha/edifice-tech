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

    getAllActiveGalleries: builder.query({
      query: ({ keyword = '', pageNumber = 1 }) => ({
        url: `${GALLERY_URL}/all-active`,
        params: {
          keyword: keyword || undefined,
          pageNumber: pageNumber || 1,
        },
      }),

      providesTags: ["Gallery"],
      keepUnusedDataFor: 5,
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
useGetAllActiveGalleriesQuery,
useUpdateGalleryItemMutation,
useDeleteGalleryItemMutation,
useCreateGalleryMutation,
} = galleryApiSlice;
