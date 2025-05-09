import baseApi from "./baseApi";

const serviceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        allServices: build.query({
            query: () => ({
                url: '/services/my-service',
                method: 'GET'
            })
        }),
        addService: build.mutation({
            query: (data) => ({
                url: '/services/create-service',
                method: 'POST',
                body: data
            })
        }),
        updateService: build.mutation({
            query: ({ data, id }) => ({
                url: `/services/update-service/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteService: build.mutation({
            query: (id) => ({
                url: `/services/${id}`,
                method: 'DELETE',
            })
        }),
        getServiceById: build.query({
            query: (id) => ({
                url: `/services/${id}`,
                method: 'GET'
            })
        }),
    })
})
export const { useAllServicesQuery, useAddServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation, useGetServiceByIdQuery } = serviceApi