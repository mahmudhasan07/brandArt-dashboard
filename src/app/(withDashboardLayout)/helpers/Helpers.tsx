"use client"
import UserTable from '@/components/Table/UserTable';
import { useAllUsersQuery } from '@/Redux/Api/userApi';
import React, { useRef, useState } from 'react';

const Helpers = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const [activeTab, setActiveTab] = useState<string>("HELPER");
    const [page, setPage] = useState<number>(1);
    const limit = 20;
    const [email, setEmail] = useState<string>("");
    const { userData, isLoading, pages } = useAllUsersQuery({ page, limit, email, activeTab }, {
        selectFromResult: ({ data, isLoading }) => ({
            userData: data?.data,
            isLoading,
            pages: data?.meta?.totalPage
        })
    })

    const button = userData && [...Array(pages).keys()];
    const handleSearch = () => {
        if (emailRef?.current?.value) {
            setEmail(emailRef?.current?.value)
        }
    }
    return (
        <section className='p-10'>
            <h1 className='text-3xl font-semibold text-center mb-8'>Business Owner Details</h1>
            <div className='flex justify-end mb-5'>
                <input ref={emailRef} type="text" className='border my-auto py-1 px-3 w-72 rounded-lg border-primary' placeholder='Enter the email address' />
                <button onClick={handleSearch} className='bg-primary text-white py-1 px-5 text-lg font-semibold rounded-lg ml-2'>Search</button>
            </div>
          
            <div>
                <UserTable userData={userData} serial={(page * limit) - limit} isLoading={isLoading}></UserTable>
            </div>
            <div className="flex justify-center gap-5 mt-5">
                {
                    button && button.map((item: string, index: number) =>
                        <button onClick={() => setPage(index + 1)} className='border-2 px-3 py-1 rounded-lg border-primary/50 text-primary text-lg font-bold' key={index}>{item + 1}</button>)
                }
            </div>
        </section>
    );
};

export default Helpers;