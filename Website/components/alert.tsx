import React from "react";

import { HiEye } from "react-icons/hi";

import { useAppDispatch } from "../utilities/hooks";

import { setTrackedFlight } from "../store/flightsSlice"; 

type Props = { flight: LiveFlight };

const AlertComponent: React.FC<Props> = ({ flight }) => {

    const dispatch = useAppDispatch();

    const handleViewMore = () => dispatch(setTrackedFlight(flight));

    return (
        <div>
            <h1 className="text-lg font-medium text-yellow-700 dark:text-yellow-800">Squawk {flight.squawkCode}</h1>
            <h2>{flight.squawkCode == 7600 ? "Radio/Communications Failure" : "Emergency Situation"}</h2>
            <div className="my-2 text-sm text-yellow-700 dark:text-yellow-800">
                <p className="mb-1">Callsign: {flight.callsign}</p>
                <p className="mb-1">Flight Number: {flight.flightNumber}</p>
            </div>
            <button className="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center" onClick={handleViewMore}>
                <HiEye className="-ml-0.5 mr-2 h-4 w-4" />
                View more
            </button>
        </div>
    )

}

export default AlertComponent;