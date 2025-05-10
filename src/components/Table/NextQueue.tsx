"use client"
import { useApproveSessionMutation, useCurrentSessionQuery } from '@/Redux/Api/session';
import React from 'react';
import TableLoader from '../Loader/TableLoader';
import Image from 'next/image';
import noFace from "@/assests/no-face.png"
import ShowToastify from '@/utils/ShowToastify';
import { ToastContainer } from 'react-toastify';
import { useAddNotificationMutation } from '@/Redux/Api/notifyApi';

const NextQueue = () => {
    const [notifyFn] = useAddNotificationMutation()
    const [approveSession] = useApproveSessionMutation()
    const { result, loading } = useCurrentSessionQuery("ACCEPTED", {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data,
            loading: isLoading
        }),
    })

    const handleCancel = async (id: string, status: string) => {
        const { data, error } = await approveSession({ id, status: status })
        if (error) {
            ShowToastify({ error: "Unsuccessful to approve or reject the session" })
            return
        }
        ShowToastify({ success: "Session approved or rejected successfully" })
    }

    const handleNotification = async(id: string) => {
        const body = {
            title: "Work starts soon",
            body: "The work will be start as soon"
        }

        const { data, error } = await notifyFn({body, id})
        if (error) {
            ShowToastify({ error: "Unable to send notification" })
            return
        }
        ShowToastify({ success: "Successfully sent notification" })

    }

    return (
        <section>
            <h1 className='text-3xl font-semibold my-8 mx-5'>Next in Queue</h1>
            {
                loading ?
                    <TableLoader columns={4}></TableLoader>
                    :
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
                            {
                                result?.map((item: any) => (
                                    <tr key={item.id} className="hover:bg-gray-50 text-center border-b">
                                        <td className="px-4 py-2 "><Image src={item?.user?.profileImage ?? noFace} alt="" width={20} height={20} className='w-10 h-10 mx-auto rounded-full ' /></td>
                                        <td className="px-4 py-2 ">{item?.user?.userName}</td>
                                        <td className="px-4 py-2 ">{item?.user?.email}</td>
                                        <td className="px-4 py-2 ">{item?.createdAt.split("T")[0]}</td>
                                        <td className="px-4 py-2 ">{item?.connectedServices[0].connectedService.offer}</td>
                                        <td className="px-4 py-2 flex justify-center gap-5 ">
                                            <button onClick={() => handleNotification(item.id)} className='p-2 bg-primary text-white font-semibold rounded-lg'>Notify</button>
                                            <button onClick={() => handleCancel(item.id, "CANCELLED")} className='p-2 bg-secondary text-white font-semibold rounded-lg '>Cancel</button>
                                        </td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>

            }
            <ToastContainer></ToastContainer>
        </section>
    );
};

export default NextQueue; 