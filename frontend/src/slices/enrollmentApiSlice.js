import { ENROLLMENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";



export const enrollmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEnrollment: builder.mutation({
      query: (data) => ({
        url: `${ENROLLMENT_URL}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Enrollment"],
    }),

    getAllEnrolmentByAdmin: builder.query({
      query: () => ({
        url: `${ENROLLMENT_URL}/`,
      }),
      providesTags: ["Enrollment"],
      keepUnusedDataFor: 5,
    }),

    getMyEnrolments: builder.query({
      query: (userId) => ({
        url: `${ENROLLMENT_URL}/my-enrollments/${userId}`,
      }),
      providesTags: ["Enrollment"],
      keepUnusedDataFor: 5,
    }),
    
    deleteEnrollment: builder.mutation({
       query:(EnrollmentId) => ({
        url:`${ENROLLMENT_URL}/${EnrollmentId}`,
        method: "DELETE"
       }),
    }),
    updateEnrollment: builder.mutation({
      query: (data) => ({
        url: `${ENROLLMENT_URL}/update-enrollment-admin`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Enrollment"],
    }),
  }),
});


export const {
  useGetAllEnrolmentByAdminQuery,
  useCreateEnrollmentMutation,
  useUpdateEnrollmentMutation,
  useDeleteEnrollmentMutation,
  useGetMyEnrolmentsQuery

} = enrollmentApiSlice;
