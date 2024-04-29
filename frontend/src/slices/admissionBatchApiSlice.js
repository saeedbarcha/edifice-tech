import { ADMISSION_BATCH_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const admissionBatchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmissionBatchs: builder.query({
      query: () => ({
        url: ADMISSION_BATCH_URL,
      }),
      providesTags: ["Admission Batch"],
      keepUnusedDataFor: 5,
    }),
    
    getRecentAdmissionBatch: builder.query({
      query: () => ({
        url: `${ADMISSION_BATCH_URL}/new-admission`,
      }),
      providesTags: ["Admission Batch"],
      keepUnusedDataFor: 5,
    }),
    createAdmissionBatch: builder.mutation({
      query: (data) => ({
        url: `${ADMISSION_BATCH_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admission Batch"],
    }),
    updateAdmissionBatchToEnroll: builder.mutation({
      query: (data) => ({
        url: `${ADMISSION_BATCH_URL}/new-admission/${data.admissionBatchId}/enroll`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admission Batch"],
    }),
    updateAdmissionBatch: builder.mutation({
      query: (data) => ({
        url: `${ADMISSION_BATCH_URL}/${data.admissionBatchId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admission Batch"],
    }),
    getAdmissionBatchDetails: builder.query({
      query: (admissionBatchId) => ({
        url: `${ADMISSION_BATCH_URL}/${admissionBatchId}`,
      }),
      providesTags: ["Admission Batch"],
      keepUnusedDataFor: 5,
    }),
    deleteAdmissionBatch: builder.mutation({
      query: (admissionBatchId) => ({
        url: `${ADMISSION_BATCH_URL}/${admissionBatchId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAdmissionBatchsQuery,
  useUpdateAdmissionBatchMutation,
  useUpdateAdmissionBatchToEnrollMutation,
  useGetRecentAdmissionBatchQuery,
  useGetAdmissionBatchDetailsQuery,
  useCreateAdmissionBatchMutation,
  useDeleteAdmissionBatchMutation

} = admissionBatchApiSlice;
