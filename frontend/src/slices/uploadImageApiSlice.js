import {UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const uploadImageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Upload Iamge"],
    }),
  }),
});

export const {
    useUploadImageMutation
} = uploadImageApiSlice;
