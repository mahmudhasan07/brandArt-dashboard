"use client";
import { useSingleUserQuery } from "@/Redux/Api/userApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loader from "../Loader/Loader";


interface UserDetail { id: string, businessName: string, businessAddress: string, startDay: string, endDay: string, startTime: string, endTime: string }

const UserDetails: React.FC = () => {
    const { id } = useParams();
    console.log("User ID:", id); // Debugging ID

    const { user, loading } = useSingleUserQuery(id, {
        selectFromResult: ({ data, isLoading }) => {
            console.log("Fetched User Data:", data); // Debugging API Response
            return {
                user: data?.data,
                loading: isLoading,
            };
        },
    });

    if (loading) return <Loader className="w-40 mx-auto" />;
    if (!user) return <p className="text-center text-red-500">⚠️ User not found or API error!</p>;

    console.log(user);


    return (
        <div className="container mx-auto p-4">
            {/* User Info */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
                {
                    loading ?
                        <Loader className="w-20 mx-auto"></Loader>
                        :
                        user.image ? (
                            <Image
                                src={user?.image}
                                alt={user.name}
                                width={80}
                                height={80}
                                className="rounded-full w-20 h-20 object-cover"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex flex-col items-center justify-center text-gray-500">
                                No Image
                            </div>
                        )}
                <div>
                    <h2 className="text-xl font-semibold">{user.name || "No Name"}</h2>
                    <p className="text-gray-500">{user.email || "No Email"}</p>
                    <p className="text-sm text-blue-600 font-medium">
                        Role: {user.role || "No Role"}
                    </p>
                </div>
            </div>
            <div>
                <h1 className="text-lg font-semibold">About:</h1>
                <p className="text-gray-700 mt-2">{user.about || "No About"}</p>
            </div>
            <div>
                <h1 className="text-lg font-semibold">ID image</h1>

                <Image src={user.idImage} alt="ID Image" width={200} height={200}></Image>
            </div>
            
        </div>
    );
};

export default UserDetails;
