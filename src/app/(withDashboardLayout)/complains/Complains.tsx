'use client'
import { useUpdateComplainMutation, useUserComplainQuery } from '@/Redux/Api/complainApi';
import ShowToastify from '@/utils/ShowToastify';
import React, { useState } from 'react';

const Complains = () => {
    const [selectedComplaint, setSelectedComplaint] = useState<{ comment: string } | null>(null);

    const handleViewDetails = (complaint :  any) => {
        setSelectedComplaint(complaint);
    };

    const closeModal = () => {
        setSelectedComplaint(null);
    };
    const [activeButton, setActiveButton] = useState(0);
    const buttons = ["Users", "Event Creators"]
    const [role, setRole] = useState("RESIDENT");
    const { data: complains, isLoading } = useUserComplainQuery("", {
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.data,
            isLoading: isLoading,
        })
    });

    console.log("complains", complains);
    

    const [updateComplain, { error }] = useUpdateComplainMutation()
    // const [currentImage, setCurrentImage] = useState();

  

    const handleAccept = async (id: string) => {
        const { data } = await updateComplain(id)
        if (data) {
            ShowToastify({ success: "In progress the complain" })
        }
    }

    return (
        <section>
            <h1 className='text-4xl font-bold text-center text-primary'>See all your complains for users and event creators</h1>
            {/* <div className='flex justify-center mt-5 gap-5 bg-primary/50 w-fit mx-auto px-5 py-2 rounded-xl'>
                {
                    buttons.map((button, index) =>
                        <button key={index} onClick={() => handleButton(index)} className={`font-semibold text-lg px-4 py-1 w-52 text-center border rounded-lg  ${activeButton == index ? " text-white" : "border-primary text-primary"}`}>{button}</button>)
                }
            </div> */}
            <div className="overflow-x-auto p-4">
                <table className="min-w-full bg-white rounded-lg shadow">
                    <thead>
                        <tr className="text-left text-sm text-gray-600 border-b">
                            <th className="p-3">Date</th>
                            <th className="p-3">User</th>
                            <th className="p-3">User complain </th>
                            <th className="p-3">Service</th>
                            <th className="p-3">Complaint</th>
                            {/* <th className="p-3">Status</th>
                            <th className="p-3">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {complains?.map((item: any) => {
                            const createdDate = new Date(item.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            });
                            return (
                                <tr key={item.id} className="border-b hover:bg-gray-50 text-sm">
                                    <td className="p-3">{createdDate}</td>
                                    <td className="p-3 items-center gap-2">
                                        {item.userDetails2?.image && (
                                            <img
                                                src={item.userDetails?.image}
                                                alt={item.userDetails?.name}
                                                className="w-6 h-6 rounded-full"
                                            />
                                        )}
                                         {item.userDetails2?.name}
                                    </td>
                                    <td className="p-3 flex items-center gap-2">
                                        {item.userDetails2?.image && (
                                            <img
                                                src={item.userDetails2.image}
                                                alt={item.userDetails2.name}
                                                className="w-6 h-6 rounded-full"
                                            />
                                        )}
                                        {item.userDetails2?.name}
                                    </td>
                                    <td className="p-3">{item.Service?.name}</td>
                                    <td className="p-3">
                                        <button  onClick={() => handleViewDetails(item)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">
                                            View Details
                                        </button>
                                    </td>
                                    {/* <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-white text-sm ${item.isSolved ? "bg-green-700" : "bg-red-700"
                                                }`}
                                        >
                                            {item.isSolved ? "Solve" : "Unsolve"}
                                        </span>
                                    </td> */}
                                    {/* <td className="p-3">
                                        <button
                                            onClick={() => handleAccept(item.id)}
                                            className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ${item.isSolved ? "hidden" : ""
                                                }`}
                                        >
                                            Make Solve
                                        </button>
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Modal */}
                {selectedComplaint && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-96 max-w-full">
                            <h2 className="text-lg font-semibold mb-4">Complaint Details</h2>
                            <p className="text-gray-700">{selectedComplaint?.comment}</p>
                            <div className="mt-4 text-right">
                                <button
                                    onClick={closeModal}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </section>
    );
};

export default Complains;