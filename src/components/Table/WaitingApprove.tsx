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
import { stat } from "fs";

const WaitingApprove = () => {
  const [approveSession] = useApproveSessionMutation();
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const { result, loading, totalPages } = useCurrentSessionQuery(
    { limit, page, filter: "PENDING" },
    {
      selectFromResult: ({ data, isLoading }) => ({
        result: data?.data?.data,
        loading: isLoading,
        totalPages: data?.data?.meta?.totalPage,
      }),
    }
  );

  const button = result && [...Array(totalPages).keys()];

  const handleComplete = async (id: string, status: string) => {
    const { data, error } = await approveSession({ id, status: status });
    if (error) {
      if (status === "ACCEPTED") {
        ShowToastify({
          error: "Unsuccessful to make session approve, please try again",
        });
      }

      ShowToastify({
        error: "Unsuccessful to make session reject, please try again",
      });
      return;
    }

    if (status === "ACCEPTED") {
      ShowToastify({ success: "Session is approve successfully" });
      return;
    }

    ShowToastify({ success: "Session rejected successfully" });
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold my-8 mx-5">Waiting for approve</h1>
      {loading ? (
        <TableLoader columns={4}></TableLoader>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Service</th>
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
                <td className="px-4 py-2">{item?.user?.userName || "N/A"}</td>
                <td className="px-4 py-2">{item?.user?.email || "N/A"}</td>
                <td className="px-4 py-2">{item?.serviceDate || "N/A"}</td>
                <td className="px-4 py-2">{item?.serviceTime || "N/A"}</td>
                <td className="px-4 py-2">{item?.serviceLocation || "N/A"}</td>
                <td className="px-4 py-2">
                  {item?.connectedServices[0]?.connectedService.service.title || "N/A"}
                </td>
                <td className="px-4 py-2 flex justify-center gap-5 ">
                  <button
                    onClick={() => handleComplete(item.id, "ACCEPTED")}
                    className="p-2 bg-primary text-white font-semibold rounded-lg"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleComplete(item.id, "REJECTED")}
                    className="p-2 bg-secondary text-white font-semibold rounded-lg "
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-center gap-5 mt-5">
        {button &&
          button.map((item: string, index: number) => (
            <button
              onClick={() => setPage(index + 1)}
              className={`border-2 px-3 py-1 rounded-lg border-primary/50 text-primary text-lg font-bold  ${
                page === index + 1 ? "bg-primary text-white" : ""
              }`}
              key={index}
            >
              {item + 1}
            </button>
          ))}
      </div>

      <ToastContainer></ToastContainer>
    </section>
  );
};

export default WaitingApprove;
