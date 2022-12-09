import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../utilities/hooks";

import { selectTrackedFlight, removeTrackedFlight } from "../../store/flightsSlice";
import { MdMyLocation, MdPlayArrow, MdPause } from "react-icons/md";

import { HiPlus, HiMinus } from "react-icons/hi";
const TrackedFlight: React.FC = () => {

    const dispatch = useAppDispatch();

    const trackedFlight = useAppSelector(selectTrackedFlight);

    const handleRemove = useCallback(() => dispatch(removeTrackedFlight()), [ dispatch ]);

    if (!trackedFlight) return null;
    
    return (
        <>
            <div className="flex flex-col absolute top-[4.5rem] left-3 bg-white w-auto p-3 rounded-lg outline-none leading-[0] overflow-hidden">
                <p className="text-base">Callsign</p>
                <p className="text-base">{trackedFlight.callsign}</p>
                <p className="text-base">Flight Number</p>
                <p className="text-base">{trackedFlight.flightNumber}</p>
                <hr />
                <button className="" onClick={handleRemove}>
                    <HiMinus className="w-6 h-6" />
                </button>
                <hr />
                <span>Last Updated: {}</span>
            </div>
        </>
    )
    
}

export default TrackedFlight;