import {PROJECT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation({
       query:(projectId) => ({
        url:`${PROJECT_URL}/${projectId}`,
        method: "DELETE"
       }),
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});


export const {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation
} = projectApiSlice;
