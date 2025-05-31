import { current } from "@reduxjs/toolkit";
import baseApi from "./baseApi";

const session = baseApi.injectEndpoints({
  endpoints: (build) => ({
    currentSession: build.query({
      query: (filter) => ({
        url: `/bookings/my-bookings?filter=${filter}`,
        method: "GET",
      }),
      providesTags: ["session"],
    }),
    waitingApproval: build.query({
      query: () => ({
        url: "/session/waiting-approval",
        method: "GET",
      }),
      providesTags: ["session"],
    }),
    nextQueue: build.query({
      query: () => ({
        url: "/bookings/my-bookings?filter=ACCEPTED",
        method: "GET",
      }),
      providesTags: ["session"],
    }),
    completedAppointment: build.query({
      query: () => ({
        url: "/bookings/my-completed-bookings?dateRange=7d",
        method: "GET",
      }),
      providesTags: ["session"],
    }),
    canceledAppointment: build.query({
      query: () => ({
        url: "/bookings/my-cancel-bookings?dateRange=1y",
        method: "GET",
      }),
      providesTags: ["session"],
    }),
    approveSession: build.mutation({
      query: ({ id, status }) => ({
        url: `/bookings/approve-cancel-booking/${id}`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags: ["session"],
    }),

    myActiveBookingUsers: build.query({
      query: ({ page, limit }) => ({
        url: `/bookings/my-completed-bookings?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["session"],
    }),

    myBlockBookingUsers: build.query({
      query: ({ page, limit }) => ({
        url: `/bookings/my-blocking-list?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["session"],
    }),
  }),
});

export const {
  useCurrentSessionQuery,
  useWaitingApprovalQuery,
  useNextQueueQuery,
  useCompletedAppointmentQuery,
  useCanceledAppointmentQuery,
  useApproveSessionMutation,
  useMyActiveBookingUsersQuery,
  useMyBlockBookingUsersQuery,
} = session;
