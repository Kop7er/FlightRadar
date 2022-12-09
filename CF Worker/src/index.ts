import * as Realm from "realm-web";

import { Flight, FlightLocation, LiveFlight } from "./interfaces";

export interface Env {

	REALM_APPID: string;

}

let realmApp: Realm.App;

const ObjectId = Realm.BSON.ObjectID;

export default {

	async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		const url = new URL(req.url);

        realmApp = realmApp || new Realm.App(env.REALM_APPID);

        if (req.method !== "POST") {

            return new Response(null, { status: 405 });

        }

        const path = url.pathname.replace(/[/]$/, "");

        const token = req.headers.get("authorization");

        if (!token) {

            return new Response(null, { status: 401 });

        }

        try {

            const credentials = Realm.Credentials.apiKey(token);

            var user = await realmApp.logIn(credentials);

            var mongodb = user.mongoClient("mongodb-atlas");

            var flightsCollection = mongodb.db("data").collection("flights");

            var liveFlightsCollection = mongodb.db("data").collection("liveFlights");

        } catch (err) {

            return new Response(null, { status: 401 });

        }

        try {

            const body = await req.json() as any;

            const flight = await flightsCollection.findOne({ pilot: new ObjectId(user.id), isLive: true });

            const currentFlight = await liveFlightsCollection.findOne({ pilot: new ObjectId(user.id) });

            switch (path) {

                case "/startflight":

                    if (currentFlight) {

                        return new Response("You already have a flight in progress.", { status: 400 });

                    }

                    if (!body.callsign || !body.flightNumber || !body.aircraft || !body.departureTime || !body.groundSpeed || !body.coordinates || !body.altitude || !body.heading || !body.squawkCode) {

                        return new Response("Missing required fields.", { status: 400 });

                    }

                    const newFlight: Flight = {

                        pilot: new ObjectId(user.id),

                        callsign: body.callsign,

                        flightNumber: body.flightNumber,
                    
                        aircraft: body.aircraft,
                    
                        departureTime: body.departureTime,
                    
                        arrivalTime: body.arrivalTime,
                    
                        origin: body.origin || null,
                    
                        destination: body.destination || null,
                    
                        positions: [{

                            groundSpeed: body.groundSpeed,

                            coordinates: body.coordinates,

                            altitude: body.altitude,

                            heading: body.heading,
                        
                            updateTime: Date.now()
                        
                        }],
                    
                        isLive: true

                    }

                    const newLiveFlight: LiveFlight = {

                        pilot: new ObjectId(user.id),

                        callsign: body.callsign,

                        flightNumber: body.flightNumber,
                    
                        aircraft: body.aircraft,
                    
                        departureTime: body.departureTime,
                                    
                        origin: body.origin || null,
                    
                        destination: body.destination || null,
                    
                        groundSpeed: body.groundSpeed,

                        coordinates: body.coordinates,

                        altitude: body.altitude,

                        heading: body.heading,
                    
                        squawkCode: body.squawkCode,
                    
                        lastUpdate: Date.now()

                    }

                    await flightsCollection.insertOne(newFlight);

                    await liveFlightsCollection.insertOne(newLiveFlight);

                    return new Response("Flight started successfully.", { status: 200 });

                case "/endflight":

                    if (!currentFlight) {

                        return new Response("You don't have a flight in progress.", { status: 400 });

                    }

                    await flightsCollection.updateOne({ _id: flight._id }, { $set: { isLive: false } });

                    await liveFlightsCollection.deleteOne({ _id: currentFlight._id });

                    return new Response("Flight ended successfully.", { status: 200 });

                case "/updateflight":

                    if (!currentFlight) {

                        return new Response("You don't have a flight in progress.", { status: 400 });

                    }

                    if (!body.groundSpeed || !body.coordinates || !body.altitude || !body.heading || !body.squawkCode) {

                        return new Response("Missing required fields.", { status: 400 });

                    }

                    const newFlightLocation: FlightLocation = {

                        groundSpeed: body.groundSpeed,

                        coordinates: body.coordinates,

                        altitude: body.altitude,

                        heading: body.heading,

                        updateTime: Date.now()

                    };

                    await flightsCollection.updateOne({ _id: flight._id }, { $push: { positions: newFlightLocation } });

                    await liveFlightsCollection.updateOne({ _id: currentFlight._id }, { $set: { 
                        
                        groundSpeed: body.groundSpeed,

                        coordinates: body.coordinates,

                        altitude: body.altitude,

                        heading: body.heading,

                        squawkCode: body.squawkCode,

                        updateTime: Date.now()

                    }});

                    return new Response("Flight updated successfully.", { status: 200 });

                default:

                    return new Response(null, { status: 404 });

            }
            
        } catch (error) {

            return new Response(null, { status: 500 });
            
        }
		
	}

}