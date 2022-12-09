import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../utilities/hooks";

import { MdPlayArrow, MdPause } from "react-icons/md";

import { HiPlus, HiMinus } from "react-icons/hi";

import { selectLiveFlightsCollection } from "../../store/realm";

import { setLiveFlights, selectPausedUpdates, setPausedUpdates } from "../../store/flightsSlice";

import { increaseZoom, decreaseZoom } from "../../store/viewStateSlice";

const ControlPanel: React.FC = () => {

    const dispatch = useAppDispatch();

    const isPaused = useAppSelector(selectPausedUpdates);

    const liveFlightsCollection = useAppSelector(selectLiveFlightsCollection);

    const handlePausing = () => {
            
        dispatch(setPausedUpdates(!isPaused));

        if (isPaused && liveFlightsCollection) {    

            liveFlightsCollection.find({}).then(liveFlights => dispatch(setLiveFlights(liveFlights)));
                
        }

    }

    const handleZoomIn = useCallback(() => dispatch(increaseZoom()), [ dispatch ]);

    const handleZoomOut = useCallback(() => dispatch(decreaseZoom()), [ dispatch ]);

    return (
        <div className="flex flex-col absolute top-3 right-3">
            <button className="bg-white p-3 rounded-lg outline-none leading-[0] overflow-hidden" onClick={handlePausing}>
                {isPaused ? <MdPlayArrow className="w-6 h-6" /> : <MdPause className="w-6 h-6" />}
            </button>
            <div className="flex flex-col bg-white mt-3 rounded overflow-hidden">
                <button className="p-3 outline-none leading-[0]" onClick={handleZoomIn}>
                    <HiPlus className="w-6 h-6" />
                </button>
                <hr />
                <button className="p-3 outline-none leading-[0]" onClick={handleZoomOut}>
                    <HiMinus className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
    
}

export default ControlPanel;