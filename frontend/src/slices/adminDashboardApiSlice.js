import { ADMIN_DASHBOARD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const adminDashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBog: builder.query({
            query: () => ({
                url: `${ADMIN_DASHBOARD_URL}/blogs`,
            }),
            providesTags: ["Admin Dashboard"],
            keepUnusedDataFor: 5,
        }),
        getCourse: builder.query({
            query: () => ({
                url: `${ADMIN_DASHBOARD_URL}/courses`,
            }),
            providesTags: ["Admin Dashboard"],
            keepUnusedDataFor: 5,
        }),
        getGalleries: builder.query({
            query: () => ({
                url:`${ADMIN_DASHBOARD_URL}/galleries`,
            }),
            providesTags: ["Admin Dashboard"],
            keepUnusedDataFor: 5,
        }),
        getService: builder.query({
            query: () => ({
                url: `${ADMIN_DASHBOARD_URL}/services`,
            }),
            providesTags: ["Admin Dashboard"],
            keepUnusedDataFor: 5,
        }),
        getUser: builder.query({
            query: () => ({
                url: `${ADMIN_DASHBOARD_URL}/users`,
            }),
            providesTags: ["Admin Dashboard"],
            keepUnusedDataFor: 5,
        }),
        getProduct: builder.query({
            query: () => ({
                url: `${ADMIN_DASHBOARD_URL}/products`,
            }),
            providesTags: ["Admin Dashboard"],
            keepUnusedDataFor: 5,
        }),
        getAdmissionBatche: builder.query({
            query: () => ({
                url: `${ADMIN_DASHBOARD_URL}/admission-batches`,
            }),
            providesTags: ["Admin Dashboard"],
            keepUnusedDataFor: 5,
        }),

        getFaq: builder.query({
            query: () => ({
                url: `${ADMIN_DASHBOARD_URL}/faqs`,
            }),
            providesTags: ["Admin Dashboard"],
            keepUnusedDataFor: 5,
        }),
       
        getEnrollment: builder.query({
            query: () => ({
                url: `${ADMIN_DASHBOARD_URL}/enrollments`,
            }),
            providesTags: ["Admin Dashboard"],
            keepUnusedDataFor: 5,
        }),

        getUserRoleBase: builder.query({
            query: () => ({
                url: `${ADMIN_DASHBOARD_URL}/user-rolles`,
            }),
            providesTags: ["Admin Dashboard"],
            keepUnusedDataFor: 5,
        }),

        getAdmissionEnrollmentsDetail: builder.query({
            query: () => ({
                url: `${ADMIN_DASHBOARD_URL}/admission-batch-details`,
            }),
            providesTags: ["Admin Dashboard"],
            keepUnusedDataFor: 5,
        }),
        
    }),
});

export const {
useGetBogQuery,
useGetCourseQuery,
useGetGalleriesQuery,
useGetServiceQuery,
useGetProductQuery,
useGetFaqQuery,
useGetAdmissionBatcheQuery,
useGetUserQuery,
useGetEnrollmentQuery,
useGetUserRoleBaseQuery,
useGetAdmissionEnrollmentsDetailQuery

} = adminDashboardApiSlice;
