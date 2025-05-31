"use client";
import UserTable from "@/components/Table/UserTable";
import UserTable2 from "@/components/Table/UserTable2";
import { useState } from "react";

export default function Page() {
  const [tabs, setTabs] = useState("active");

  const renderContent = () => {
    switch (tabs) {
      case "active":
        return <UserTable></UserTable>;
      case "block":
        return <UserTable2></UserTable2>;
    }
  };

  return (
    <div>
      <div className="w-fit mx-auto mt-5 space-x-2">
        <button
          onClick={() => setTabs("active")}
          className={`border-2 px-4 py-1 rounded-lg text-lg font-semibold ${
            tabs == "active" ? "bg-primary text-white" : ""
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setTabs("block")}
          className={`border-2 px-4 py-1 rounded-lg text-lg font-semibold ${
            tabs == "block" ? "bg-primary text-white" : ""
          }`}
        >
          Blocked
        </button>
      </div>

      <div>{renderContent()}</div>
    </div>
  );
}
