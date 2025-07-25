"use client";
import {
  useAllServicesQuery,
  useDeleteRootServiceMutation,
  useDeleteServiceMutation,
} from "@/Redux/Api/serviceApi";
import React, { useState } from "react";
import AddService from "./AddService";
import { CiEdit } from "react-icons/ci";
import UpdateServices from "./UpdateService";
import { MdDeleteForever } from "react-icons/md";
import ShowToastify from "@/utils/ShowToastify";
import { ToastContainer } from "react-toastify";

interface ConnectedService {
  id: string;
  type: string;
  offer: string;
  additionalOffer: string;
  duration: string;
  price: number;
}

interface ServiceData {
  id: string;
  title: string;
  ConnectedService: ConnectedService[];
}

// const serviceData: ServiceData[] = [
//   {
//     "id": "680cb87adc8ec15dba18e321",
//     "title": "Message",
//     "ConnectedService": [
//       {
//         "id": "680cb87adc8ec15dba18e322",
//         "type": "For_Members",
//         "offer": "10 minute message",
//         "additionalOffer": "10x message",
//         "duration": "30 min",
//         "price": 30
//       },
//       {
//         "id": "680cb8ecdc8ec15dba18e323",
//         "type": "Non_Members",
//         "offer": "10 minute message",
//         "additionalOffer": "10x message",
//         "duration": "30 min",
//         "price": 30
//       }
//     ]
//   },
//   {
//     "id": "680cc82364f8a209c2163415",
//     "title": "Stretch",
//     "ConnectedService": [
//       {
//         "id": "680cc82364f8a209c2163416",
//         "type": "For_Members",
//         "offer": "10 minute stretch",
//         "additionalOffer": "10x message",
//         "duration": "30 min",
//         "price": 30
//       }
//     ]
//   }
// ];

export default function ServiceList() {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
    null
  );
  const [Modal, setModal] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState("");
  const [Modal1, setModal1] = useState<boolean>(false);
  const [deleteServiceFn] = useDeleteServiceMutation();
  const [deleteRootServiceFn] = useDeleteRootServiceMutation();

  const { result: serviceData, loading } = useAllServicesQuery("", {
    selectFromResult: ({ data, isLoading }) => ({
      result: data?.data,
      loading: isLoading,
    }),
  });

  const toggleExpand = (id: string) => {
    setExpandedServiceId(expandedServiceId === id ? null : id);
  };

  const handleButton = (id: string) => {
    setServiceId(id);
    setModal1(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await deleteServiceFn(id);
    if (error) {
      ShowToastify({ error: "Unsuccessful to delete the service" });
      return;
    }
    ShowToastify({ success: "Service deleted successfully" });
  };
  const handleServiceDelete = async (id: string) => {
    const { error } = await deleteRootServiceFn(id);
    if (error) {
      ShowToastify({ error: "Unsuccessful to delete the service" });
      return;
    }
    ShowToastify({ success: "Service deleted successfully" });
  };

  return (
    <section>
      <div className="flex justify-between items-center m-10">
        <h1 className="text-3xl font-semibold ">Type of Services</h1>
        <button
          onClick={() => setModal(true)}
          className="border p-3 font-semibold rounded-lg bg-gray-100"
        >
          Add Service +
        </button>
      </div>
      <div className="flex gap-5 mx-10 flex-wrap">
        {serviceData
          // ?.filter((service: ServiceData) => service.ConnectedService.length > 0)
          ?.map((service: ServiceData) => (
            <div
              key={service.id}
              className="border p-4 rounded-lg shadow-md w-96  h-fit"
            >
              <div className="flex justify-between gap-5 items-center">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleServiceDelete(service.id)}
                    className="flex justify-end  text-2xl my-auto"
                  >
                    <MdDeleteForever />
                  </button>
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-full"
                  >
                    {expandedServiceId === service.id ? "-" : "+"}
                  </button>
                </div>
              </div>
              <p className="text-gray-500">
                {service.ConnectedService.length} service
                {service.ConnectedService.length > 1 ? "s" : ""} available
              </p>

              {expandedServiceId === service.id && (
                <div className="mt-4 space-y-2">
                  {service.ConnectedService.map((detail) => (
                    <div key={detail.id} className="border-t pt-2">
                      <div className="flex gap-4 justify-end">
                        <button
                          onClick={() => handleButton(detail.id)}
                          className="flex justify-end  text-xl"
                        >
                          <CiEdit />
                        </button>

                        <button
                          onClick={() => handleDelete(detail.id)}
                          className="flex justify-end  text-xl"
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                      <p className="font-medium">
                        {detail.type.replace("_", " ")}
                      </p>
                      {/* <p>Offer: {detail.offer}</p> */}
                      <p>Duration: {detail.duration}</p>
                      <p>Price: ${detail.price.toFixed(2)}</p>
                      {detail.additionalOffer && (
                        <p className="text-gray-600">
                          Additional Offer: {detail.additionalOffer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>

      <dialog
        className="backdrop-blur-[2px] bg-black/30 h-screen top-0 w-full"
        open={Modal}
      >
        <div className="bg-white text-black  rounded-xl border-2 w-fit mx-auto top-[10%] p-5 relative ">
          <div className="text-lg font-extrabold text-end mt-5 mr-5">
            <button onClick={() => setModal(!Modal)}>X</button>
          </div>
          {/* <UpdateSubscription id={id} /> */}
          {/* <LocationHoursForm></LocationHoursForm> */}
          <AddService></AddService>
        </div>
      </dialog>
      <dialog
        className="backdrop-blur-[2px] bg-black/30 h-screen top-0 w-full"
        open={Modal1}
      >
        <div className="bg-white text-black  rounded-xl border-2 w-fit mx-auto top-[10%] p-5 relative ">
          <div className="text-lg font-extrabold text-end mt-5 mr-5">
            <button onClick={() => setModal1(!Modal1)}>X</button>
          </div>
          {/* <UpdateSubscription id={id} /> */}
          {/* <LocationHoursForm></LocationHoursForm> */}
          <UpdateServices serviceId={serviceId}></UpdateServices>
        </div>
      </dialog>
      <ToastContainer></ToastContainer>
    </section>
  );
}
