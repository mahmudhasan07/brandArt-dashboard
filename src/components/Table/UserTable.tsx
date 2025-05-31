"use client";
// import { OrderInterFace, PaymentTableInterFace } from '@/utils/Interfaces';
import React, { useState } from "react";
// import { UserInterFace } from '@/utils/InterFaces';
import { motion } from "framer-motion";
// import {  useUserStatusUpdateMutation } from '../Redux/Api/userApi';
import Lottie from "lottie-react";
import loader from "@/assests/loader.json";
import Loader from "../Loader/Loader";
import noface from "@/assests/no-face.png";
import {
  useAllUsersQuery,
  useUserStatusUpdateMutation,
} from "@/Redux/Api/userApi";
import { UserInterFace } from "@/Interfaces/InterFaces";
import ShowToastify from "@/utils/ShowToastify";
import { useRouter } from "next/navigation";
import TableLoader from "../Loader/TableLoader";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import { useMyBookingUsersQuery } from "@/Redux/Api/session";

const UserTable = () => {
  const route = useRouter();

  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(1);

  const { userData, isLoading, totalPages } = useMyBookingUsersQuery(
    { limit, page },
    {
      selectFromResult: ({ data, isLoading }) => ({
        userData: data?.data?.data,
        isLoading: isLoading,
        totalPages: data?.data?.meta?.totalPages,
      }),
    }
  );

  console.log("User Data", userData);

  console.log("totalPages", totalPages);

  const [updateStatus] = useUserStatusUpdateMutation();
  const button = userData && [...Array(totalPages).keys()];
  const handleStatus = async (id: string) => {
    const { error } = await updateStatus({ id });
    if (error) {
      return ShowToastify({
        error: "Unsuccessful to block or active the user",
      });
    }
    ShowToastify({ success: "User status updated successfully" });
  };

  return (
    <div className="overflow-x-auto overflow-hidden m-10">
      {isLoading ? (
        <TableLoader columns={5}></TableLoader>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">User Email</th>
              {/* <th className="px-4 py-2 border">Role</th> */}
              <th className="px-4 py-2 border">Action</th>
              {/* <th className="px-4 py-2 border">Amount</th> */}
              {/* <th className="px-4 py-2 border">Purchase Date</th> */}
            </tr>
          </thead>
          <tbody>
            {userData?.map((item: UserInterFace, index: number) => (
              <motion.tr
                initial={{ y: 100 * (index + 1), opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
                key={index}
                className="border-b text-center"
              >
                {/* <td className="px-4 text-nowrap py-2">{serial + index + 1}</td> */}
                <td>
                  <Image
                    src={
                      item?.user?.profileImage
                        ? item?.user?.profileImage
                        : noface
                    }
                    width={50}
                    height={50}
                    alt={item?.user?.userName}
                    className="rounded-full mx-auto"
                  ></Image>
                </td>
                <td className="px-4 text-nowrap py-2">
                  {item?.user?.userName}
                </td>
                <td className="px-4 text-nowrap py-2">{item?.user?.email}</td>
                <td className="px-4 text-nowrap py-2 space-x-2">
                  <button
                    onClick={() => handleStatus(item?.user.id)}
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg bg-primary text-white"
                  >
                    {item?.user?.isBlocked == true ? "Active" : "Block"}
                  </button>
                  {/* <button onClick={() => route.push(`/needers/${item?.id}`)} className='px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg bg-primary text-white'>View</button> */}
                </td>

                {/* <td className="px-4 py-2">{item.updatedAt.split("T")[0]}</td> */}
              </motion.tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-center gap-5 mt-5">
        {button &&
          button.map((item: string, index: number) => (
            <button
              onClick={() => setPage(index + 1)}
              className="border-2 px-3 py-1 rounded-lg border-primary/50 text-primary text-lg font-bold"
              key={index}
            >
              {item + 1}
            </button>
          ))}
      </div>
      <ToastContainer></ToastContainer>
    </div>
    // <div></div>
  );
};

export default UserTable;
