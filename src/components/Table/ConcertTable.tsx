'use client'
import React, { useState } from 'react';
// import { ConcertInterface } from '@/utils/InterFaces';
import { motion } from "motion/react"
import Image from 'next/image';
import Loader from '../Loader/Loader';
import { ConcertInterface } from '@/Interfaces/InterFaces';

const ConcertTable = ({ concertTable, serial, isLoading }: { concertTable : ConcertInterface[], serial: number, isLoading: boolean }) => {


    return (
        <div className="overflow-x-auto overflow-y-hidden">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Serial</th>
                        <th className="px-4 py-2 border">Image</th>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Location</th>
                        <th className="px-4 py-2 border">Ticket Price</th>
                        <th className="px-4 py-2 border">Total Ticket</th>
                        <th className="px-4 py-2 border">Event Date</th>
                        {/* <th className="px-4 py-2 border">Action</th> */}
                        {/* <th className="px-4 py-2 border">Amount</th> */}
                        {/* <th className="px-4 py-2 border">Purchase Date</th> */}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ?
                        <tr>
                            <td colSpan={7} className='text-center'>
                                <Loader className={`w-36`}></Loader>
                            </td>
                        </tr>
                        :
                        concertTable?.map((item: ConcertInterface, index: number) => (
                            <motion.tr initial={{ y: 100 * (index + 1), opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} key={index} className="border-b text-center">
                                <td className="px-4 text-nowrap py-2">{serial+ index + 1}</td>
                                <td className="px-4 text-nowrap py-2"><Image src={item.photos[0]} alt={`${item.photos[0]}`} width={60} className='h-12 mx-auto object-cover' height={20}></Image></td>
                                <td className="px-4 text-nowrap py-2">{item.title}</td>
                                <td className="px-4 text-nowrap py-2">{item.locationName}</td>
                                <td className="px-4 text-nowrap py-2">{item.price}</td>
                                <td className="px-4 text-nowrap py-2">{item.totalTicket}</td>
                                <td className="px-4 text-nowrap py-2">{item.startDate.split("T")[0]}</td>
                                {/* <td className="px-4 py-2"><button className='px-4 py-1 rounded-lg bg-[primary] text-white'>Delete</button></td> */}

                                {/* <td className="px-4 py-2">{item.createdAt.split("T")[0]}</td> */}
                            </motion.tr>
                        ))}
                </tbody>
            </table>


        </div>
    );
};

export default ConcertTable;

