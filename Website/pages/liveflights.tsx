import Link from "next/link";

import { useAppSelector } from "../utilities/hooks";

import { selectLiveFlights } from "../store/flightsSlice";

import Layout from "../components/layout";

const LiveFlights: NextPageWithLayout = () => {

    const liveFlights = useAppSelector(selectLiveFlights);

    return (
        <div className="my-6">
            <h1 className="text-3xl font-bold text-center">Live Flights</h1>
            <div className="flex flex-col items-center justify-center w-full h-full mt-6">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Callsign</th>
                            <th className="px-4 py-2">Flight Number</th>
                            <th className="px-4 py-2">Departure Airport</th>
                            <th className="px-4 py-2">Arrival Airport</th>
                            <th className="px-4 py-2">Aircraft</th>
                            <th className="px-4 py-2">Altitude</th>
                            <th className="px-4 py-2">Speed</th>
                            <th className="px-4 py-2">Squawk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {liveFlights.map((flight, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{flight.callsign}</td>
                                <td className="border px-4 py-2">{flight.flightNumber}</td>
                                <td className="border px-4 py-2">{flight.origin || "N/A"}</td>
                                <td className="border px-4 py-2">{flight.destination || "N/A"}</td>
                                <td className="border px-4 py-2">{flight.aircraft}</td>
                                <td className="border px-4 py-2">{flight.altitude}</td>
                                <td className="border px-4 py-2">{flight.groundSpeed}</td>
                                <td className="border px-4 py-2">{flight.squawkCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>       
    )

}

LiveFlights.getLayout = (page) => <Layout>{page}</Layout>

export default LiveFlights;