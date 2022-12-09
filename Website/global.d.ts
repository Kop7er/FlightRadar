import type { NextPage } from "next";

import type { ReactElement, ReactNode } from "react";

import type { ObjectID } from "mongodb";

declare global {

    type NextPageWithLayout = NextPage & {

        getLayout?: (page: ReactElement) => ReactNode;

    }

    interface Flight {

        _id: ObjectID;

        pilot: ObjectID;

        callsign: string;

        flightNumber: string;

        aircraft: string;

        departureTime: number;

        arrivalTime: number;

        origin: string | null;

        destination: string | null;

        positions: FlightLocation[];

        isLive: boolean;

    }

    interface FlightLocation {

        groundSpeed: number;
    
        coordinates: number[];
    
        altitude: number;
    
        heading: number;
    
        updateTime: number;
    
    }

    interface LiveFlight {

        _id: ObjectID;

        pilot: ObjectID;

        callsign: string;

        flightNumber: string;

        aircraft: string;

        departureTime: number;

        origin: string | null;

        destination: string | null;

        groundSpeed: number;

        coordinates: number[];

        altitude: number;

        heading: number;

        squawkCode: number;

        lastUpdate: number;

    }

}