"use client";
import { RootState } from '@/Redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import image from '@/assests/no-face.png'

const TopBar = () => {
    const user = useSelector((state: RootState) => state.Auth as { name: string; role: string; image?: string });

    return (
        <div className='flex justify-end gap-4 border-2 p-3'>
            <div>
                <img src={user.image || image.src} alt="User" className="w-12 h-12 rounded-full" />
            </div>
            <div>
                <h1>{user.name}</h1>
                <h1>{user.role}</h1>
            </div>
        </div>
    );
};

export default TopBar;