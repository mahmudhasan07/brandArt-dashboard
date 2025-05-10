import baseApi from "./baseApi";

const notifyApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getNotification: build.query({
            query: () => ({
                url: '/notifications',
                method: 'GET'
            }),
            providesTags: ['notify']
        }), 
        addNotification: build.mutation({
            query: ({data,id}) => ({ 
                url: `/bookings/notify-user/${id}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['notify']
        }),
    })
})
export const { useGetNotificationQuery, useAddNotificationMutation } = notifyApi