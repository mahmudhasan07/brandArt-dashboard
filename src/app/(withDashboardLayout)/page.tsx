"use client"
import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import { useRouter } from "next/navigation";

export default function Page() {
    const route = useRouter();

    route.push("/current-session");
    return (
        <div className="w-full">
            {/* <DashboardOverview /> */}
        </div>
    );
}
