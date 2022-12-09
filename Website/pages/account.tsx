import * as Realm from "realm-web";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useAppSelector } from "../utilities/hooks";

import { selectRealmApp, selectFlightsCollection } from "../store/realm";

import generateAPIKey from "../utilities/generateKey";

import Layout from "../components/layout";

const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

const Account: NextPageWithLayout = () => {

    const router = useRouter();

    const realmApp = useAppSelector(selectRealmApp);

    const flightsCollection = useAppSelector(selectFlightsCollection);

    const [ flights, setFlights ] = useState<Flight[]>([]);

    const [ apiKey, setApiKey ] = useState("");
    
    const redirect = useCallback((redirectTo?: string) => router.push(redirectTo ? redirectTo : "/", undefined, { shallow: true }), [ router ]);

    const handleLogout = () => realmApp?.currentUser?.logOut().then(() => redirect()).catch((error) => console.error(error));

    const generateUserAPIKey = () => {

        const apiKey = generateAPIKey();

        setApiKey(apiKey);

        realmApp.currentUser?.linkCredentials(Realm.Credentials.apiKey(apiKey))

    }

    const formatDate = (dateUnix: number) => {

        const date = new Date(dateUnix);

        const day = date.getDate();

        const month = months[date.getMonth()];

        const year = date.getFullYear();

        const hours = date.getHours();

        const minutes = date.getMinutes();

        return `${month} ${day}, ${year} ${hours}:${minutes}`;

    }

    useEffect(() => {

        if (!realmApp.currentUser || realmApp.currentUser.providerType == "anon-user") {

            redirect();

        } else {

            flightsCollection?.find({ pilot: realmApp.currentUser.id }, { sort: { date: -1 } })
                .then((flights) => setFlights(flights))
                .catch((error) => console.error(error));

        }

    }, [ flightsCollection, realmApp.currentUser, redirect ]);

    return (
        <>
            <h1 className="text-3xl font-bold text-center">My Account</h1>
            <div className="flex flex-row items-center justify-center w-full h-full my-6">
                <button className="border-blue-500 border-2 px-8 py-2 rounded-md transition-colors duration-300 transform hover:bg-blue-500" onClick={handleLogout}>Logout</button>
                <button className="border-blue-500 border-2 px-8 py-2 rounded-md transition-colors duration-300 transform hover:bg-blue-500 ml-6" onClick={generateUserAPIKey}>Generate API Key</button>
            </div>
            <div>
                <h1 className="text-3xl font-bold text-center">My API Key</h1>
                <div className="flex flex-row items-center justify-center w-full h-full my-6">
                    <input className="border-blue-500 border-2 px-8 py-2 rounded-md" value={apiKey} readOnly />
                </div>
            </div>
            <h1 className="text-3xl font-bold text-center">My Flights</h1>
            <div className="flex flex-col items-center justify-center w-full h-full mt-6">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Callsign</th>
                            <th className="px-4 py-2">Flight Number</th>
                            <th className="px-4 py-2">Departure Airport</th>
                            <th className="px-4 py-2">Arrival Airport</th>
                            <th className="px-4 py-2">Aircraft</th>
                            <th className="px-4 py-2">Departure Time</th>
                            <th className="px-4 py-2">Arrival Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight) => (
                            <tr key={flight._id}>
                                <td className="px-4 py-2">{flight.callsign}</td>
                                <td className="px-4 py-2">{flight.flightNumber}</td>
                                <td className="px-4 py-2">{flight.origin || "N/A"}</td>
                                <td className="px-4 py-2">{flight.destination || "N/A"}</td>
                                <td className="px-4 py-2">{flight.aircraft}</td>
                                <td className="px-4 py-2">{formatDate(flight.departureTime)}</td>
                                <td className="px-4 py-2">{formatDate(flight.arrivalTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )

}


Account.getLayout = (page) => <Layout>{page}</Layout>

export default Account;