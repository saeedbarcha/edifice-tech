import { EXPERIENCE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const experienceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createExperience: builder.mutation({
      query: (data) => ({
        url: `${EXPERIENCE_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Experience"],
    }),

    updateExperience: builder.mutation({
      query: (data) => ({
        url: `${EXPERIENCE_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Experience"],
    }),
    
    deleteExperience: builder.mutation({
      query:(experienceId) => ({
       url:`${EXPERIENCE_URL}/${experienceId}`,
       method: "DELETE"
      }),
   }),
  }),
});


export const {
  useDeleteExperienceMutation,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
} = experienceApiSlice;
