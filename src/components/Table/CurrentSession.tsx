"use client"
import { useCurrentSessionQuery } from '@/Redux/Api/session';
import React from 'react';
import TableLoader from '../Loader/TableLoader';
import Image from 'next/image';

const CurrentSession = () => {

    const { result, loading } = useCurrentSessionQuery("ACCEPTED", {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data,
            loading: isLoading
        }),
    })

    const handleComplete = async (id: string) => {
        // const { data, error } = await approveSessionFun({ id, status: "COMPLETED" })
    }

    return (
        <section>
            <h1 className='text-3xl font-semibold my-8 mx-5'>Current Session</h1>
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
                                    <td className="px-4 py-2"><Image src={item?.user?.profileImage} alt="" width={20} height={20} className='w-10 h-10 rounded-full mx-auto' /></td>
                                    <td className="px-4 py-2">{item?.user?.userName}</td>
                                    <td className="px-4 py-2">{item?.user?.email}</td>
                                    <td className="px-4 py-2">{item?.createdAt.split("T")[0]}</td>
                                    <td className="px-4 py-2">{item?.connectedServices[0].connectedService.offer}</td>
                                    <td className="px-4 py-2 flex justify-center border"><button onClick={()=> handleComplete(item.id)} className='p-2 bg-primary text-white font-semibold rounded-lg mx-auto w-fit'>Completed</button></td>
                                </tr>
                            ))

                        }
                     </tbody>
                    </table>

            }

        </section>
    );
};

export default CurrentSession;