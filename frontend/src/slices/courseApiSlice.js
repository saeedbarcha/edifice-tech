import { COURSE_URL,UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getCourses: builder.query({
      query: () => ({
        url: COURSE_URL,
        }),
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),
    getActiveCourses: builder.query({
      query: () => ({
        url: `${COURSE_URL}/active-courses`,
        }),
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),
//     uploadBlogImage: builder.mutation({
//       query: (data) => ({
//         url: `${UPLOAD_URL}`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     createBlog: builder.mutation({
//       query: () => ({
//         url: `${COURSE_URL}`,
//         method: "POST",
//       }),
//       invalidatesTags: ["Course"],
//     }),
    updateCourse: builder.mutation({
      query: (data) => ({
        url: `${COURSE_URL}/${data.courseId}/edit`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: `${COURSE_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
//     getActiveBlogs: builder.query({
//       query: () => ({
//         url: `${COURSE_URL}/active-blogs`,
//         }),
//       providesTags: ["Blogs"],
//       keepUnusedDataFor: 5,
//     }),
    getCourseDetails: builder.query({
      query: (courseId) => ({
        url: `${COURSE_URL}/${courseId}`,
      }),
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),
    deleteCourse: builder.mutation({
      query:(courseId) => ({
        url: `${COURSE_URL}/${courseId}`,
        method: "DELETE"
      }),
   }),
  }),
  
});

export const {
 useGetCoursesQuery,
 useGetActiveCoursesQuery,
 useUpdateCourseMutation,
 useCreateCourseMutation,
 useGetCourseDetailsQuery,
 useDeleteCourseMutation
} = courseApiSlice;
