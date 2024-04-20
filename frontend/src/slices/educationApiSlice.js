import { EDUCATION_URL } from "../constants";
import { apiSlice } from "./apiSlice";



export const educationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEducation: builder.mutation({
      query: (data) => ({
        url: `${EDUCATION_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Education"],
    }),
    deleteEducation: builder.mutation({
       query:(educationId) => ({
        url:`${EDUCATION_URL}/${educationId}`,
        method: "DELETE"
       }),
    }),
    updateEducation: builder.mutation({
      query: (data) => ({
        url: `${EDUCATION_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Education"],
    }),
  }),
});


export const {
  useDeleteEducationMutation,
  useUpdateEducationMutation,
  useCreateEducationMutation
} = educationApiSlice;
