import type * as realm from "realm-web";

type ObjectID = realm.BSON.ObjectID;

export interface FlightLocation {

    groundSpeed: number;
    
    coordinates: number[];

    altitude: number;

    heading: number;

    updateTime: number;

}

export interface Flight {

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

export interface LiveFlight {

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