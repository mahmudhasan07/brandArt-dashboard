import build from "next/dist/build";
import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["logIn"],
    }),
    registerUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/register-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["register"],
    }),
    allUsers: build.query({
      query: ({ page, limit, email, activeTab }) => ({
        url: `/users?limit=${limit}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["allUsers"],
    }),

    singleUser: build.query({
      query: (id) => ({
        url: `/user/single/${id}`,
        method: "GET",
      }),
    }),

    allCreators: build.query({
      query: ({ page, limit, email }) => ({
        url: `/user/creator-user-all?page=${page}&limit=${limit}&email=${email}`,
        method: "GET",
      }),
      providesTags: ["allCreators"],
    }),
    userStatusUpdate: build.mutation({
      query: (data) => {
        return {
          url: `/bookings/block-user/${data?.id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["allCreators", "allUsers", "session"],
    }),

    userBlockStatusUpdate: build.mutation({
      query: (data) => {
        return {
          url: `/bookings/unblock-user/${data?.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["allCreators", "allUsers", "session"],
    }),

    dashboardInfo: build.query({
      query: () => ({
        url: `/admin/dashboard/all`,
        method: "GET",
      }),
      providesTags: ["dashboardInfo"],
    }),

    forgetPassword: build.mutation({
      query: (data) => {
        return {
          url: `/auth/forgot-password`,
          method: "POST",
          body: data,
        };
      },
    }),
    resetPass: build.mutation({
      query: (data) => {
        return {
          url: `/auth/reset-password`,
          method: "POST",
          body: data,
        };
      },
    }),

    verifyOtp: build.mutation({
      query: (data) => {
        return {
          url: `/auth/verify-reset-password-otp`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useAllCreatorsQuery,
  useAllUsersQuery,
  useUserStatusUpdateMutation,
  useSingleUserQuery,
  useDashboardInfoQuery,
  useRegisterUserMutation,
  useUserBlockStatusUpdateMutation,
  useForgetPasswordMutation,
  useResetPassMutation,
  useVerifyOtpMutation
} = userApi;
