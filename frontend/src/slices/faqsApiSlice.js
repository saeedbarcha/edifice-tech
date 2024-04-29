import { FAQS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const faqsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: () => ({
        url: `${FAQS_URL}`,
        }),
      providesTags: ["Faqs"],
      keepUnusedDataFor: 5,
    }),

    getActiveFaqs: builder.query({
      query: () => ({
        url: `${FAQS_URL}/active-faqs`,
        }),
      providesTags: ["Faqs"],
      keepUnusedDataFor: 5,
    }),
    

    getFaqDetails: builder.query({
      query: (faqId) => ({
        url: `${FAQS_URL}/${faqId}`,
      }),
      providesTags: ["Faqs"],
      keepUnusedDataFor: 5,
    }),

    createFaq: builder.mutation({
      query: (data) => ({
        url: `${FAQS_URL}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faqs"],      
    }),

    updateFaq: builder.mutation({
      query: (data) => ({
        url: `${FAQS_URL}/${data.faqId}/edit`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Faqs"],
    }),

    deleteFaq: builder.mutation({
       query:(faqId) => ({
        url:`${FAQS_URL}/${faqId}`,
        method: "DELETE"
       }),
    }),

  }),
});


export const {
    useGetFaqsQuery,
    useGetActiveFaqsQuery,
    useGetFaqDetailsQuery,
    useCreateFaqMutation,
    useDeleteFaqMutation,
    useUpdateFaqMutation
} = faqsApiSlice;
