import { current } from "@reduxjs/toolkit";
import baseApi from "./baseApi";

const session = baseApi.injectEndpoints({
    endpoints: (build) => ({
        currentSession: build.query({
            query: (filter) => ({
                url: `/bookings/my-bookings?filter=${filter}`,
                method: 'GET'
            })
        }),
        waitingApproval: build.query({
            query: () => ({
                url: '/session/waiting-approval',
                method: 'GET'
            })
        }),
        nextQueue: build.query({
            query: () => ({
                url: '/bookings/my-bookings?filter=ACCEPTED',
                method: 'GET'
            })
        }),
        completedAppointment: build.query({
            query: () => ({
                url: '/bookings/my-completed-bookings?dateRange=7d',
                method: 'GET'
            })
        }),
        canceledAppointment: build.query({
            query: () => ({
                url: '/bookings/my-cancel-bookings?dateRange=1y'   ,
                method: 'GET'
            })
        }),
        approveSession: build.mutation({
            query: ({ id, status }) => ({
                url: `/bookings/approve-cancel-booking/${id}`,
                method: 'PUT',
                body: status
            }),
            // invalidatesTags : ['approveSession']
        }),
    })
})

export const { useCurrentSessionQuery, useWaitingApprovalQuery, useNextQueueQuery, useCompletedAppointmentQuery, useCanceledAppointmentQuery, useApproveSessionMutation } = session