import baseApi from "./baseApi";

const location = baseApi.injectEndpoints({
    endpoints: (build) => ({
        allLocations: build.query({
            query: () => ({
                url: '/locations/get-my-locations',
                method: 'GET'
            })
        }),
        addLocation: build.mutation({   
            query: (data) => ({
                url: '/locations/create-location',
                method: 'POST',
                body: data
            })
        }),
        updateLocation: build.mutation({   
            query: ({data, id}) => ({
                url: `/locations/update-location/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteLocation: build.mutation({   
            query: (id) => ({
                url: `/locations/${id}`,
                method: 'DELETE',
            })
        }),
        getLocationById: build.query({
            query: (id) => ({
                url: `/locations/${id}`,
                method: 'GET',
            })
        }),
    }),
})

export const { useAllLocationsQuery, useAddLocationMutation, useUpdateLocationMutation, useDeleteLocationMutation, useGetLocationByIdQuery } = location