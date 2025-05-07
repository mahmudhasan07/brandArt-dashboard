'use client';
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation"; // Import the hook
import { IoClose } from "react-icons/io5"; // Close icon
import { FiMenu } from "react-icons/fi"; // Menu icon
import logout from '@/assests/logout.png'
import logo from "@/assests/logo.png"
import { MdDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { TbTransactionDollar } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/Redux/ReduxFunction";
import Cookies from "js-cookie";
import { AppDispatch, RootState } from "@/Redux/store";
import { IconType } from "react-icons";
import { useState } from "react";
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navigation: { label: string, route: string, iconPath: IconType }[] = [
  { label: "Dashboard", route: "/", iconPath: MdDashboard },
  { label: "Needers", route: "/needers", iconPath: FaUsers },
  { label: "Helpers", route: "/helpers", iconPath: FaUsers },
  { label: "Transaction", route: "/transaction", iconPath: TbTransactionDollar }, 
  { label: "Complains", route: "/complains", iconPath: TbTransactionDollar }, 
];

const NavbarSlider = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const path = usePathname();
  const dispatch = useDispatch<AppDispatch>()

  const { name } = useSelector((state: RootState) => state.Auth);

  const renderNavItem = (item: { label: string, route: string, iconPath: IconType }) => {
    const isActive = path === item.route;


    return (
      <li key={item.route}>
        <Link
          href={item.route}
          className={`relative flex items-center h-11 pr-6 py-[10px] pl-[24px] text-lg transition-all my-3 duration-300 ${isActive
            ? "poppins-semibold text-white border-l-4 border-primary  bg-gradient-to-r from-primary/90 to-primary/75"
            : "text-black border-l-4 border-transparent hover:border-primary hover:bg-gradient-to-r hover:from-primary/80 hover:to-primary/65 hover:text-black"
            }`}
        >
          <item.iconPath className="ml-2" size={20} />
          {isOpen && <span className="ml-3 text-[18px] tracking-wide truncate">{item.label}</span>}
        </Link>
      </li>
    );
  };


  const route = useRouter()

  const handleLogOut = () => {
    dispatch(logOut())
    Cookies.remove("accessToken")
    route.push("/login")

  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative flex">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute z-50 top-4 left-4 text-black p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? <IoClose size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar Content */}
      <div className={`h-screen bg-white duration-300 flex flex-col  font-inter ${isOpen ? 'w-[270px]' : 'w-[80px]'
          }`}
      >
        {/* Logo */}
        {isOpen && (
          <Link href="/" className="flex justify-center mb-6">
            <Image width={120} height={120} className="w-40 mt-14" src={logo} alt="logo_image" />
          </Link>
        )}

        <div className={`flex flex-col justify-between  h-screen pb-11 ${isOpen ? "pt-0" : 'pt-14'}`}>
          {/* Navigation */}
          {/* <div className="space-y-3">
            <ul className="pt-2 pb-4 space-y-1 text-sm">{navigation.map(renderNavItem)}</ul>
          </div> */}

          <div className="relative p-2">
            <button
              onClick={toggleDropdown}
              className="flex items-center w-full space-x-2 text-gray-700 font-medium hover:text-blue-500"
            >
              <span className="w-full">Appointment Management</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className=" left-0 mt-2 bg-white shadow-lg rounded-lg w-56 border border-gray-100 z-10">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Current Session</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Waiting for approval</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Next in Queue</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Completed Appointment</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Canceled Appointment</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Location & Hour</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Offered Services</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Client Management</a>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <div>
            <div className="flex px-8 space-x-2  text-lg">
              <FaRegUser className="text-2xl text-primary" />
              <p className="font-semibold text-primary lg:block hidden">Hello, {name}</p>
            </div>
            <button
              onClick={handleLogOut}
              className={`relative flex items-center h-11 pr-6 py-[10px] pl-[24px] text-lg transition-all duration-300 poppins-semibold hover:bg-gradient-to-r hover:from-[primary]/80 hover:to-[#B80069]/60 to-white text-black border-l-4 ${isOpen ? '' : 'justify-center'
                }`}
            >
              <Image src={logout} alt="logout" width={20} height={20} className="ml-2" />
              {isOpen && <span className="ml-3 text-[18px] tracking-wide truncate ">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSlider;
