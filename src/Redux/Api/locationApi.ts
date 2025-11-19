import baseApi from "./baseApi";

const location = baseApi.injectEndpoints({
    endpoints: (build) => ({
        allLocations: build.query({
            query: ({page, limit}) => ({
                url: `/locations/get-my-locations?page=${page}&limit=${limit}`,
                method: 'GET'
            }),
            providesTags: ["location"]
        
        }),
        addLocation: build.mutation({   
            query: (data) => ({
                url: '/locations/create-location',
                method: 'POST',
                body: data
            }),
            invalidatesTags : ["location"]
        }),
        updateLocation: build.mutation({   
            query: ({data, id}) => ({
                url: `/locations/update-location/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags : ["location"]
        }),
        deleteLocation: build.mutation({   
            query: (id) => ({
                url: `/locations/delete-location/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags : ["location"]
        }),
        getLocationById: build.query({
            query: (id) => ({
                url: `/locations/${id}`,
                method: 'GET',
            }),
            providesTags : ["location"]
        }),
   
    }),
})

export const { useAllLocationsQuery, useAddLocationMutation, useUpdateLocationMutation, useDeleteLocationMutation, useGetLocationByIdQuery } = location