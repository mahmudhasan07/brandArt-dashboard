'use client';

import { useState } from "react";
import DeliveryChart from "@/components/allchart/CompletedChart";
import LineChart from "@/components/allchart/LineChart";
// import { useGetAllEventsQuery } from "../Redux/Api/eventApi";
import CountUp from "react-countup";
import CompletedChart from "@/components/allchart/CompletedChart";
import { useDashboardInfoQuery } from "@/Redux/Api/userApi";
// import { useGetAllEventsQuery } from "@/Redux/Api/eventApi";

export default function DashboardOverview() {
  const [selectedValue, setSelectedValue] = useState<string>('this-month');
  const {totalService, userLength, ownerLength, totalIncome } = useDashboardInfoQuery("", {
    selectFromResult: ({ data }) => ({
      totalService: data?.data?.totalService,
      userLength: data?.data?.userLength,
      ownerLength:data?.data?.ownerLength,
      totalIncome:data?.data?.totalIncome,
    })
  })
  const today = new Date().toISOString()
  // const runningEvent = data?.data?.data?.filter((item: { startDate: Date | string }) => item?.startDate >= today);
  // const completedEvent = data?.data?.data?.filter((item: { startDate: Date | string }) => item?.startDate <= today);


  console.log("totalIncome", totalIncome);
  console.log("userLength", userLength);
  console.log("ownerLength", ownerLength);
  

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="pt-8 pb-32 lg:px-0 px-3">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 justify-between">
            {/* Card 1 */}
            <div className="w-full bg-white rounded-lg shadow-md">
            <div className="relative p-6 border-2 rounded-xl">
              <div className="space-y-4 font-poppins">
                <h3 className="text-xl font-medium text-gray-900">Total Service Request</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight"><CountUp end={totalService} duration={3}></CountUp></span>
                  {/* <span className="text-lg text-gray-500">From All Services</span> */}
                </div>
                <p></p>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="w-full bg-white rounded-lg shadow-md">
            <div className="relative p-6 border-2 rounded-xl">
              <div className="space-y-4 font-poppins">
                <h3 className="text-xl font-medium text-gray-900">Total Needers</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight"> <CountUp end={userLength} /></span>
                  {/* <span className="text-lg text-gray-500">People</span> */}
                </div>
                <p className="text-base text-gray-600"></p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full bg-white rounded-lg shadow-md">
            <div className="relative p-6 border-2 rounded-xl">
              <div className="space-y-4 font-poppins">
                <h3 className="text-xl font-medium text-gray-900">Total Helpers</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight"><CountUp end={ownerLength} /></span>
                  {/* <span className="text-lg text-gray-500">People</span> */}
                </div>
                <p className="text-base text-gray-600"></p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="w-full bg-white rounded-lg shadow-md">
            <div className="relative p-6 border-2 rounded-xl">
              <div className="space-y-4 font-poppins">
                <h3 className="text-xl font-medium text-gray-900">Total Earning</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight"><CountUp end={totalIncome} duration={3}></CountUp></span>
                  {/* <span className="text-lg text-gray-500">From All Services</span> */}
                </div>
                <p></p>
              </div>
            </div>
          </div>
        
        </div>

        {/* Chart Section */}
        <div className="mt-8">
          {/* <CompletedChart totalEvent={data?.data?.data?.length } completedEvent={completedEvent?.length} /> */}
        </div>
        <div className="mt-8">
          <LineChart />
        </div>
      </div>
    </div>
  );
}
