'use client'
import React, { useRef, useState } from 'react';
import UserTable from '@/components/Table/UserTable';
import { useAllUsersQuery } from '@/Redux/Api/userApi';
// import { useAllUsersQuery } from '@/components/Redux/Api/userApi';


const buttons = [
    {
        id: 1,
        name: "Users",
        value: "CUSTOMER"
    },

    {
        id: 2,
        name: "Business Owners",
        value: "OWNER"
    },

]

const Needers = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const [activeTab, setActiveTab] = useState<string>("NEEDER");
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
        <div className='p-10'>
            <h1 className='text-3xl font-semibold text-center mb-8'>Users Details</h1>
            <div className='flex justify-end mb-5'>
                <input ref={emailRef} type="text" className='border my-auto py-1 px-3 w-72 rounded-lg border-primary' placeholder='Enter the email address' />
                <button onClick={handleSearch} className='bg-primary text-white py-1 px-5 text-lg font-semibold rounded-lg ml-2'>Search</button>
            </div>
            {/* <div className='flex justify-center gap-5 my-5'>
                {
                    buttons.map((id) =>
                        <button onClick={() => setActiveTab(id.value)} key={id.id} className={`py-1 px-3 border rounded-lg ${activeTab == id.value ? "bg-primary text-white" : "bg-white text-primary border-primary"}`}>{id.name}</button>)
                }
            </div> */}
            <div>
                <UserTable userData={userData} serial={(page * limit) - limit} isLoading={isLoading}></UserTable>
            </div>
            <div className="flex justify-center gap-5 mt-5">
                {
                    button && button.map((item: string, index: number) =>
                        <button onClick={() => setPage(index + 1)} className='border-2 px-3 py-1 rounded-lg border-primary/50 text-primary text-lg font-bold' key={index}>{item + 1}</button>)
                }
            </div>
        </div>
    );
};

export default Needers;