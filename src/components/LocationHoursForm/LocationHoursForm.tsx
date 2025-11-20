import { useAddLocationMutation } from '@/Redux/Api/locationApi';
import useGeoLocation from '@/utils/LocationLatLong';
import ShowToastify from '@/utils/ShowToastify';
import { useGetLatLngFromPlace } from '@/utils/useGetLatLngFromPlace';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer } from 'react-toastify';

export default function LocationHoursForm() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [startTime, setStartTime] = useState<Date | null>(new Date());
    const [endTime, setEndTime] = useState<Date | null>(new Date());
    const [location, setLocation] = useState('410 W Main St, Cortez, CO 81321, United States');
    //  const {lat,lng} = useGetLatLngFromPlace("South Manda Jheelapar Road Dhaka, Bangladesh")


    const [addLocationFn] = useAddLocationMutation();

    const handleSubmit = async () => {
        const output = {
            startDate: startDate ? startDate.toDateString() : 'Invalid Date',
            endDate: endDate ? endDate.toDateString() : 'Invalid Date',
            startTime: startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : 'Invalid Time',
            endTime: endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : 'Invalid Time',
            location
        };

        const { data, error } = await addLocationFn(output);
        if (error) {
            ShowToastify({ error: "Unsuccessful to add the location" });
            return;
        } else {
            ShowToastify({ success: "Location added successfully" });
        }

    };



    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Update Locations & Hours</h2>

            {/* Date Range */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Pick a date (from)</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="w-full border p-2 rounded"
                        dateFormat="EEE, dd MMM yyyy"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Pick a date (to)</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="w-full border p-2 rounded"
                        dateFormat="EEE, dd MMM yyyy"
                    />
                </div>
            </div>

            {/* Time Range */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Pick a time (from)</label>
                    <DatePicker
                        selected={startTime}
                        onChange={(date) => setStartTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Pick a time (to)</label>
                    <DatePicker
                        selected={endTime}
                        onChange={(date) => setEndTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="w-full border p-2 rounded"
                    />
                </div>
            </div>

            {/* Location */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border p-2 rounded"
                />
            </div>

            {/* Map Placeholder */}
            {/* <div className="mb-4">
                <iframe
                    title="map"
                    src="https://maps.google.com/maps?q=410%20W%20Main%20St,%20Cortez,%20CO%2081321&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-48 rounded"
                ></iframe>
            </div> */}

            <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded hover:opacity-90 transition"
            >
                Submit
            </button>

            <ToastContainer></ToastContainer>
        </div>
    );
}
