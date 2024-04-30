import { SERVICE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ServiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getServices: builder.query({
      query: () => ({
        url: `${SERVICE_URL}/`,
        }),
      providesTags: ["Service"],
      keepUnusedDataFor: 5,
    }),
    
    
    getActiveServices: builder.query({
      query: () => ({
        url: `${SERVICE_URL}/active-services`,
        }),
      providesTags: ["Service"],
      keepUnusedDataFor: 5,
    }),

    updateService: builder.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.serviceId}/edit`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    createService: builder.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    getServiceDetails: builder.query({
      query: (serviceId) => ({
        url: `${SERVICE_URL}/${serviceId}`,
      }),
      providesTags: ["Service"],
      keepUnusedDataFor: 5,
    }),

    deleteService: builder.mutation({
      query:(serviceId) => ({
        url: `${SERVICE_URL}/${serviceId}`,
        method: "DELETE"
      }),
   }),
  }),
  
});

export const {
 useGetServicesQuery,
 useGetActiveServicesQuery,
 useUpdateServiceMutation,
 useCreateServiceMutation,
 useGetServiceDetailsQuery,
 useDeleteServiceMutation
} = ServiceApiSlice;
