'use client'
// import { OrderInterFace, PaymentTableInterFace } from '@/utils/Interfaces';
import React, { useState } from 'react';
// import { UserInterFace } from '@/utils/InterFaces';
import { motion } from 'framer-motion'
// import {  useUserStatusUpdateMutation } from '../Redux/Api/userApi';
import Lottie from 'lottie-react';
import loader from '@/assests/loader.json'
import Loader from '../Loader/Loader';
import { useUserStatusUpdateMutation } from '@/Redux/Api/userApi';
import { UserInterFace } from '@/Interfaces/InterFaces';
import ShowToastify from '@/utils/ShowToastify';
import { useRouter } from 'next/navigation';
import TableLoader from '../Loader/TableLoader';
import { ToastContainer } from 'react-toastify';

const UserTable = ({ userData, isLoading, serial }: { userData: UserInterFace[], isLoading: boolean, serial: number }) => {
    const route = useRouter()

    const [updateStatus] = useUserStatusUpdateMutation()

    const handleStatus = async (id: string) => {

        const { error } = await updateStatus({ id })
        if (error) {

            return ShowToastify({ error: "Unsuccessful to block or active the user" })
        }
        ShowToastify({ success: "User status updated successfully" })
    }

    return (
        <div className="overflow-x-auto overflow-hidden">
            {
                isLoading ?
                    <TableLoader columns={5}></TableLoader>
                    :
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border">Serial</th>
                                <th className="px-4 py-2 border">User Name</th>
                                <th className="px-4 py-2 border">User Email</th>
                                <th className="px-4 py-2 border">Role</th>
                                <th className="px-4 py-2 border">Action</th>
                                {/* <th className="px-4 py-2 border">Amount</th> */}
                                {/* <th className="px-4 py-2 border">Purchase Date</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData?.map((item: UserInterFace, index: number) => (
                                    <motion.tr initial={{ y: 100 * (index + 1), opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} key={index} className="border-b text-center">
                                        <td className="px-4 text-nowrap py-2">{serial + index + 1}</td>
                                        <td className="px-4 text-nowrap py-2">{item.name}</td>
                                        <td className="px-4 text-nowrap py-2">{item.email}</td>
                                        <td className="px-4 text-nowrap py-2">{item.role}</td>
                                        <td className="px-4 text-nowrap py-2 space-x-2">
                                            <button onClick={() => handleStatus(item?.id)} className='px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg bg-primary text-white'>{item.status == "BLOCKED" ? "Active" : "Block"}</button>
                                            <button onClick={() => route.push(`/needers/${item?.id}`)} className='px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg bg-primary text-white'>View</button>
                                        </td>

                                        {/* <td className="px-4 py-2">{item.createdAt.split("T")[0]}</td> */}
                                    </motion.tr>
                                ))}
                        </tbody>
                    </table>
            }
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default UserTable;



