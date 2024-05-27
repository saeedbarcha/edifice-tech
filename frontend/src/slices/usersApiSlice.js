import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: ({ keyword = '', pageNumber = 1 }) => ({
        url: `${USERS_URL}`,
        params: {
          keyword: keyword || undefined,
          pageNumber: pageNumber || 1,
        },
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    getMemberUser: builder.query({
      query: () => ({
        url: `${USERS_URL}/members`,
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),

    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getTeamMemberDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/member/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserProfileMutation,
  useGetUsersQuery,
  useGetMemberUserQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useGetTeamMemberDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;
