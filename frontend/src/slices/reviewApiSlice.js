import { REVIEW_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        createReview: builder.mutation({
            query: (data) => ({
                url: `${REVIEW_URL}/${data.courseId}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Reviews"],
        }),

        getReviews: builder.query({
            query: (courseId) => ({
                url: `${REVIEW_URL}/${courseId}`,
            }),
            providesTags: ["Reviews"],
            keepUnusedDataFor: 5,
        }),

        updateReview: builder.mutation({
            query: (data) => ({
                url: `${REVIEW_URL}/${data.reviewId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Reviews"],
        }),

        deleteReview: builder.mutation({
            query: (serviceId) => ({
                url: `${REVIEW_URL}/${serviceId}`,
                method: "DELETE"
            }),
        }),
    }),

});

export const {
   useCreateReviewMutation,
   useGetReviewsQuery,
   useUpdateReviewMutation,
   useDeleteReviewMutation
} = reviewApiSlice;
