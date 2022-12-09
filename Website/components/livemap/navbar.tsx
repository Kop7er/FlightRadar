import React from "react";

import Link from "next/link";

import { MdHome, MdPerson, MdAirplanemodeActive } from "react-icons/md";

const NavBar: React.FC = () => {

    return (
        <div className="absolute flex flex-row bg-white top-3 left-3 max-h-max rounded outline-none leading-[0] overflow-hidden">
            <Link href="/" className="flex flex-row p-3 outline-none leading-[0] items-center border-r">
                <MdHome className="w-6 h-6" />
                <span className="text-md font-medium ml-1.5 hidden sm:block">Home</span>
            </Link>
            <Link href="/account" className="flex flex-row p-3 outline-none leading-[0] items-center border-r">
                <MdPerson className="w-6 h-6" />
                <span className="text-md font-medium ml-1.5 hidden sm:block">My Account</span>
            </Link>
            <Link href="/liveflights" className="flex flex-row p-3 outline-none leading-[0] items-center">
                <MdAirplanemodeActive className="w-6 h-6" />
                <span className="text-md font-medium ml-1.5 hidden sm:block">All Flights</span>
            </Link>
        </div>
    )
    
}

export default NavBar;