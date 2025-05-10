"use client"
import { useApproveSessionMutation, useCurrentSessionQuery } from '@/Redux/Api/session';
import React from 'react';
import TableLoader from '../Loader/TableLoader';
import Image from 'next/image';
import noFace from "@/assests/no-face.png"
import ShowToastify from '@/utils/ShowToastify';
import { ToastContainer } from 'react-toastify';

const WaitingApprove = () => {

    const [approveSession] = useApproveSessionMutation()


    const { result, loading } = useCurrentSessionQuery("PENDING", {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data,
            loading: isLoading
        }),
    })

    const handleComplete = async (id: string, status: string) => {

        console.log("ID", id);
        

        const { data, error } = await approveSession({ id, status: status })
        if (error) {
            ShowToastify({ error: "Unsuccessful to approve or reject the session" })
            return
        }
        ShowToastify({ success: "Session approved or rejected successfully" })
    }

    return (
        <section>
            <h1 className='text-3xl font-semibold my-8 mx-5'>Waiting for approve</h1>
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
                                        <td className="px-4 py-2"><Image src={item?.user?.profileImage ?? noFace} alt="" width={20} height={20} className='w-10 h-10 rounded-full mx-auto' /></td>
                                        <td className="px-4 py-2 ">{item?.user?.userName}</td>
                                        <td className="px-4 py-2">{item?.user?.email}</td>
                                        <td className="px-4 py-2 ">{item?.createdAt.split("T")[0]}</td>
                                        <td className="px-4 py-2 ">{item?.connectedServices[0].connectedService.offer}</td>
                                        <td className="px-4 py-2 flex justify-center gap-5 ">
                                            <button onClick={() => handleComplete(item.id, "ACCEPTED")} className='p-2 bg-primary text-white font-semibold rounded-lg'>Approve</button>
                                            <button onClick={() => handleComplete(item.id, "REJECTED")} className='p-2 bg-secondary text-white font-semibold rounded-lg '>Reject</button>
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

export default WaitingApprove;