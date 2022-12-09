import React, { useEffect, useState } from "react";

import Link from "next/link";

import Image from "next/image";

import { MdClose, MdMenu } from "react-icons/md";

import { useAppSelector } from "../utilities/hooks";

import { selectRealmApp } from "../store/realm";

const NavBar: React.FC = () => {
    
    const realmApp = useAppSelector(selectRealmApp);

    const [ isLogged, setIsLogged ] = useState(false);

    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    useEffect(() => {

        if (realmApp.currentUser && realmApp.currentUser.providerType != "anon-user") {

            setIsLogged(true);

        }

    }, [ realmApp.currentUser ]);

    return (
        <nav className="relative bg-gray-900 shadow">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <div className="text-xl font-semibold text-gray-700">
                            <Link href="/" className="flex flex-row text-2xl font-bold transition-colors duration-300 transform text-white lg:text-3xl sm:hover:text-gray-300">
                                <Image src="/logo.svg" width={32} height={32} className="mr-3" alt="Flight Radar Logo" />
                                <span>Flight Radar</span>
                            </Link>
                        </div>
                        <div className="flex lg:hidden">
                            <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                { isMenuOpen ? <MdClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" /> }
                            </button>
                        </div>
                    </div>
                    <div className={(isMenuOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full") + " absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-gray-900 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center"}>
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            <Link href="/livemap" className="px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 text-gray-200 hover:bg-gray-700">
                                Live Map
                            </Link>
                            <Link href="/liveflights" className="px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 text-gray-200 hover:bg-gray-700">
                                Live Flights
                            </Link>
                        </div>
                        <div className="my-6 lg:my-0">
                            { isLogged ?
                                <Link href="/account" className="border-blue-500 border-2 px-8 py-2 rounded-md text-gray-200 transition-colors duration-300 transform hover:bg-blue-500">My Account</Link> :
                                <Link href="/login" className="border-blue-500 border-2 px-8 py-2 rounded-md text-gray-200 transition-colors duration-300 transform hover:bg-blue-500">Login/Signup</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
    
}

export default NavBar;