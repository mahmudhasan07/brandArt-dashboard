import baseApi from "./baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allServices: build.query({
      query: () => ({
        url: "/services/my-service",
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    addService: build.mutation({
      query: (data) => ({
        url: "/services/create-service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),
    updateService: build.mutation({
      query: ({ data, id }) => ({
        url: `/services/update-service/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
    getServiceById: build.query({
      query: (id) => ({
        url: `/services/get-service/${id}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
  }),
});
export const {
  useAllServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
} = serviceApi;
