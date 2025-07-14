"use client";
import {
  useApproveSessionMutation,
  useCurrentSessionQuery,
} from "@/Redux/Api/session";
import React, { useState } from "react";
import TableLoader from "../Loader/TableLoader";
import Image from "next/image";
import noFace from "@/assests/no-face.png";
import ShowToastify from "@/utils/ShowToastify";
import { ToastContainer } from "react-toastify";
import { useAddNotificationMutation } from "@/Redux/Api/notifyApi";
import NotifyUser from "@/app/(withDashboardLayout)/next-queue/NotifyUser";

const NextQueue = () => {
  const [notifyFn] = useAddNotificationMutation();
  const [approveSession] = useApproveSessionMutation();
  const [serviceId, setServiceId] = useState("");
  const [Modal1, setModal1] = useState(false);
  const { result, loading } = useCurrentSessionQuery("ACCEPTED", {
    selectFromResult: ({ data, isLoading }) => ({
      result: data?.data,
      loading: isLoading,
    }),
  });

  const handleCancel = async (id: string, status: string) => {
    const { data, error } = await approveSession({ id, status: status });
    if (error) {
      ShowToastify({ error: "Unsuccessful to cancel the session" });
      return;
    }
    ShowToastify({ success: "Session cancel successfully" });
  };

  const handleNotification = async (id: string) => {
    setServiceId(id);
    setModal1(true);
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold my-8 mx-5">Next in Queue</h1>
      {loading ? (
        <TableLoader columns={4}></TableLoader>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Started At</th>
              <th className="px-4 py-2 border">Service </th>
              <th className="px-4 py-2 border">Action</th>
              {/* <th className="px-4 py-2 border">Event Date</th> */}
              {/* <th className="px-4 py-2 border">Action</th> */}
              {/* <th className="px-4 py-2 border">Amount</th> */}
              {/* <th className="px-4 py-2 border">Purchase Date</th> */}
            </tr>
          </thead>
          <tbody>
            {result?.map((item: any) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 text-center border-b"
              >
                <td className="px-4 py-2 ">
                  <Image
                    src={item?.user?.profileImage ?? noFace}
                    alt=""
                    width={20}
                    height={20}
                    className="w-10 h-10 mx-auto rounded-full "
                  />
                </td>
                <td className="px-4 py-2 ">{item?.user?.userName}</td>
                <td className="px-4 py-2 ">{item?.user?.email}</td>
                <td className="px-4 py-2 ">{item?.createdAt.split("T")[0]}</td>
                <td className="px-4 py-2 ">
                  {item?.connectedServices[0].connectedService.offer}
                </td>
                <td className="px-4 py-2 flex justify-center gap-5 ">
                  <button
                    onClick={() => handleNotification(item.userId)}
                    className="p-2 bg-primary text-white font-semibold rounded-lg"
                  >
                    Notify
                  </button>
                  <button
                    onClick={() => handleCancel(item.id, "CANCELLED")}
                    className="p-2 bg-secondary text-white font-semibold rounded-lg "
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <dialog
        className="backdrop-blur-[2px] bg-black/30 h-screen top-0 w-full"
        open={Modal1}
      >
        <div className="bg-white text-black  rounded-xl border-2 w-fit mx-auto top-[15%] p-5 relative ">
          <div className="text-lg font-extrabold text-end mt-5 mr-5">
            <button onClick={() => setModal1(!Modal1)}>X</button>
          </div>
          {/* <UpdateSubscription id={id} /> */}
          {/* <LocationHoursForm></LocationHoursForm> */}
          <NotifyUser serviceId={serviceId} setModal1={setModal1}></NotifyUser>
        </div>
      </dialog>

      <ToastContainer></ToastContainer>
    </section>
  );
};

export default NextQueue;
