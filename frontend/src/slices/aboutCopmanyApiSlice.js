import { ABOUT_COMPANY_URL , UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const aboutCopmanyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getAboutCompany: builder.query({
      query: () => ({
        url: ABOUT_COMPANY_URL,
        }),
      providesTags: ["About Company"],
      keepUnusedDataFor: 5,
    }),
    updateAboutCompany: builder.mutation({
      query: (data) => ({
        url: `${ABOUT_COMPANY_URL}/${data.blogId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["About Company"],
    }),
   
  }),
  
});

export const {
  useGetAboutCompanyQuery,
  useUpdateAboutCompanyMutation
} = aboutCopmanyApiSlice;
