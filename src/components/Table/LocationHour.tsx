"use client"
import { useAllLocationsQuery, useDeleteLocationMutation } from '@/Redux/Api/locationApi';
import React, { useState } from 'react';
import TableLoader from '../Loader/TableLoader';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import LocationHoursForm from '../LocationHoursForm/LocationHoursForm';
import ShowToastify from '@/utils/ShowToastify';
import { ToastContainer } from 'react-toastify';
import useGeoLocation from '@/utils/LocationLatLong';
const LocationHour = () => {
    const [Modal, setModal] = useState<boolean>(false);
    const [deleteFn] = useDeleteLocationMutation()
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);

    const { result, loading, totalPages } = useAllLocationsQuery({limit, page}, {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data,
            loading: isLoading,
            totalPages: data?.data?.meta?.totalPages
        }),
    })

      const button = result && [...Array(totalPages).keys()];


    const handleDelete = async (id: string) => {
        const { data, error } = await deleteFn(id)
        if (error) {
            ShowToastify({ error: "Unsuccessful to delete the location" })
            return
        }
        ShowToastify({ success: "Location deleted successfully" })

    }


    return (
        <section className='p-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-semibold my-8 mx-5'>Next Location & Hour</h1>
                <button onClick={() => setModal(true)} className='border rounded-lg bg-gray-100 p-3 font-semibold'>Add New +</button>
            </div>
            <div>
                {
                    loading ?
                        <TableLoader columns={4}></TableLoader>
                        :
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Time</th>
                                    <th className="px-4 py-2 border">Location</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Add your data rows here */}
                                {
                                    result?.map((item: any) => (
                                        <tr key={item.id} className="hover:bg-gray-50 text-center border-b">
                                            <td className="px-4 py-2 ">{item?.startDate} - {item?.endDate}</td>
                                            <td className="px-4 py-2 ">{item?.startTime} - {item?.endTime}</td>
                                            <td className="px-4 py-2 ">{item?.location}</td>
                                            <td className="px-4 py-2 flex justify-center gap-5 ">
                                                {/* <button className='p-2 bg-primary text-white font-semibold rounded-lg'><MdEdit /></button> */}
                                                <button onClick={() => handleDelete(item.id)} className='p-2 bg-secondary text-white font-semibold rounded-lg '><MdDelete /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }


            </div>

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

            <dialog className='backdrop-blur-[2px] bg-black/30 h-screen top-0 w-full' open={Modal}>
                <div className='bg-white text-black  rounded-xl border-2 w-fit mx-auto top-[10%] p-5 relative '>
                    <div className='text-lg font-extrabold text-end mt-5 mr-5'>
                        <button onClick={() => setModal(!Modal)}>X</button>
                    </div>
                    {/* <UpdateSubscription id={id} /> */}
                    <LocationHoursForm></LocationHoursForm>
                </div>
            </dialog>
            <ToastContainer></ToastContainer>
        </section>
    );
};

export default LocationHour;