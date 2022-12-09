import Link from "next/link";

import { GoBrowser } from "react-icons/go";

import { MdRadar, MdAirplanemodeActive } from "react-icons/md";

const Home: NextPageWithLayout = () => {

    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <h1 className="text-4xl mb-8 text-center font-extrabold text-gray-900 md:text-5xl lg:text-6xl">Flight Radar</h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">A interactive map for flight simulator games</p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <Link href="/rcon" legacyBehavior>
                        <a className="flex flex-1 w-full lg:max-w-xs py-4 mr-8 bg-gray-900 text-white rounded-md place-content-center place-items-center">
                            <span className="mr-2">Live Map</span>
                            <MdRadar size={25} />
                        </a>
                    </Link>
                    <Link href="/download" legacyBehavior>
                        <a className="flex flex-1 w-full lg:max-w-xs mt-4 lg:mt-0 py-4 outline outline-2 outline-gray-900 text-gray-900 rounded-md place-content-center">
                            <span className="mr-2">Live Flights</span>
                            <MdAirplanemodeActive size={25} />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default Home;