"use client";
import { useAddServiceMutation } from "@/Redux/Api/serviceApi";
import ShowToastify from "@/utils/ShowToastify";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function UpdateService() {
  const [serviceType, setServiceType] = useState("Massage");
  const [membership, setMembership] = useState("Non_Members");
  const [offering, setOffering] = useState("");
  const [additionalOffering, setAdditionalOffering] = useState("");
  const [duration, setDuration] = useState("30 Minute");
  const [price, setPrice] = useState(0);
  const [addServiceFn] = useAddServiceMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newOffering = {
      title: serviceType,
      type: membership,
      offer: offering,
      additionalOffer: additionalOffering,
      duration,
      price,
    };
    const { data, error } = await addServiceFn(newOffering);
    if (error && "data" in error) {
      ShowToastify({ error: (error.data as { message: string }).message });
      return;
    }
    ShowToastify({ success: "Offering added successfully" });
  };

  return (
    <div className="w-96 mx-auto bg-white p-8 rounded-lg shadow-md mt-2">
      <h2 className="text-2xl font-semibold mb-6">Add New Offering</h2>

      <form onSubmit={handleSubmit}>
        {/* Service Type Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="serviceType"
            className="block text-sm font-medium mb-1"
          >
            Service Type
          </label>
          <select
            id="serviceType"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full border p-2 rounded-lg"
          >
            <option value="Massage">Massage</option>
            <option value="Stretch">Stretch</option>
          </select>
        </div>

        {/* Membership Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="membership"
            className="block text-sm font-medium mb-1"
          >
            Membership
          </label>
          <select
            id="membership"
            value={membership}
            onChange={(e) => setMembership(e.target.value)}
            className="w-full border p-2 rounded-lg"
          >
            <option value="Non_Members">Non-Member</option>
            <option value="For_Members">Member</option>
          </select>
        </div>

        {/* Offering Description */}
        <div className="mb-4">
          <label htmlFor="offering" className="block text-sm font-medium mb-1">
            What are you offering?
          </label>
          <input
            type="text"
            id="offering"
            value={offering}
            onChange={(e) => setOffering(e.target.value)}
            placeholder="Your offerings"
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Additional Offering */}
        <div className="mb-4">
          <label
            htmlFor="additionalOffering"
            className="block text-sm font-medium mb-1"
          >
            Additional Offering
          </label>
          <input
            type="text"
            id="additionalOffering"
            value={additionalOffering}
            onChange={(e) => setAdditionalOffering(e.target.value)}
            placeholder="Additional offering"
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium mb-1">
            Duration
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border p-2 rounded-lg"
          >
            <option value="30 Minute">30 Minute</option>
            <option value="60 Minute">60 Minute</option>
            <option value="90 Minute">90 Minute</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            placeholder="Price of your offering"
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Submit
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
}
