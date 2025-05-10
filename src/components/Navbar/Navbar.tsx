'use client'
import React, { useEffect, useState } from 'react';
import NavbarSlider from './NavbarSlider';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
      const token = Cookies.get("token");

    const pathName = usePathname()

    const deviceResponsive = () => {
        let availWidth = window.innerWidth; // Use innerWidth for real viewport width
        if (availWidth <= 768) {
            setIsSidebarOpen(false); // Close sidebar on mobile
        } else {
            setIsSidebarOpen(true); // Open sidebar on larger screens
        }
    };

     const dispatch = useDispatch()
    // useEffect(() => {
    //     const tokenDetails = token ? jwtDecode(token as string) : null;

    //     const currentTime = Math.floor(Date.now() / 1000);
    //     // Check if the token is expired
    //     if (tokenDetails != undefined && tokenDetails.exp && tokenDetails.exp > currentTime) {

    //     } else {
    //         dispatch(logOut())
    //         Cookies?.remove("token")
    //         dispatch(checkOutOrder({ id: null, checkoutData: null }))
    //     }
    //     // const handleScroll = () => {
    //     //     // Check if user has scrolled past the banner (100vh)
    //     //     if (window.scrollY > 300) {
    //     //         setIsScrolled(true);
    //     //     } else {
    //     //         setIsScrolled(false);
    //     //     }
    //     // };

    //     // window.addEventListener("scroll", handleScroll);

    //     // return () => {
    //     //     window.removeEventListener("scroll", handleScroll);
    //     // };


    // }, [dispatch, token]);

    // Set up the resize listener to trigger device responsiveness
    useEffect(() => {
        // Call it once on mount to set the correct state based on current screen size
        deviceResponsive();

  const tokenDetails = token ? jwtDecode(token as string) : null;

        const currentTime = Math.floor(Date.now() / 1000);
        // Check if the token is expired
        if (tokenDetails != undefined && tokenDetails.exp && tokenDetails.exp > currentTime) {

        } else {
            console.log("token expired");
            
            // dispatch(logOut())
            // Cookies?.remove("accessToken")
            // dispatch(checkOutOrder({ id: null, checkoutData: null }))
        }

        // Add event listener for resize events
        window.addEventListener('resize', deviceResponsive);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', deviceResponsive);
        };
    }, []);


    return (
        <div className={`w-fit border-r-2 ${pathName == '/privacy-policy' ? "hidden" : "block"}`}>
            <NavbarSlider isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}></NavbarSlider>
        </div>
    );
};

export default Navbar;