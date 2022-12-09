import { useCallback, useMemo } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

import Map, { Marker } from "react-map-gl";

import type { ViewStateChangeEvent } from "react-map-gl";

import { useAppDispatch, useAppSelector } from "../utilities/hooks";

import { MdAirplanemodeActive } from "react-icons/md";

import { selectLiveFlights, setTrackedFlight } from "../store/flightsSlice";

import { selectViewState, setViewState } from "../store/viewStateSlice";

import NavBar from "../components/livemap/navbar";

import ControlPanel from "../components/livemap/controlPanel";

import TrackedFlight from "../components/livemap/trackedFlight";

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const LiveMap: NextPageWithLayout = () => {
    
    const dispatch = useAppDispatch();

    const viewState = useAppSelector(selectViewState);

    const liveFlights = useAppSelector(selectLiveFlights);

    const onMove = useCallback((event: ViewStateChangeEvent) => dispatch(setViewState(event.viewState)), [ dispatch ]);

    const onFlightClicked = useCallback((liveFlight: LiveFlight) => dispatch(setTrackedFlight(liveFlight)), [ dispatch ]);

    const markers = useMemo(() => liveFlights.map(flight => (
            <Marker key={flight._id} onClick={() => onFlightClicked(flight)}
                longitude={flight.coordinates[0]}
                latitude={flight.coordinates[1]}
                rotation={flight.heading}>
                <MdAirplanemodeActive size={50} className="hover:cursor-pointer" />
            </Marker>
        )), [ liveFlights, onFlightClicked ]);

    return (
        <div className="relative w-screen h-full">
            <Map {...viewState} style={{ width: "100%", height: "100vh" }} onMove={onMove} mapStyle="mapbox://styles/mapbox/streets-v9" mapboxAccessToken={mapboxAccessToken}>
                {markers}
            </Map>
            <NavBar />
            <TrackedFlight />
            <ControlPanel />
        </div>        
    )

}

export default LiveMap;