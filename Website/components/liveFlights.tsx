import React, { useEffect, useCallback } from "react";

import { Credentials as RealmCredentials } from "realm-web";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../utilities/hooks";

import { selectRealmApp, setFlightsCollection, setLiveFlightsCollection } from "../store/realm";

import { setLiveFlights, addLiveFlight, updateLiveFlight, removeLiveFlight } from "../store/flightsSlice";

import AlertComponent from "./alert";

const importantSquakCodes: number[] = [ 7600, 7700 ];

const LiveFlights: React.FC = () => {

    const dispatch = useAppDispatch();

    const realmApp = useAppSelector(selectRealmApp);

    const onLiveFlightsLoaded = (liveFlights: LiveFlight[]) => dispatch(setLiveFlights(liveFlights));

    const onLiveFlightAdded = (liveFlight: LiveFlight) => dispatch(addLiveFlight(liveFlight));

    const onLiveFlightUpdated = (liveFlight: LiveFlight) => dispatch(updateLiveFlight(liveFlight));

    const onLiveFlightRemoved =(liveFlight: LiveFlight) => dispatch(removeLiveFlight(liveFlight));

    const notify = useCallback((flight: LiveFlight) => 
        toast.warn(<AlertComponent flight={flight} />, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }), [ ]);

    useEffect(() => {
        
        if (!realmApp.currentUser) {

            const anonymousUser = RealmCredentials.anonymous();

            realmApp.logIn(anonymousUser);

        }

    }, [ realmApp, realmApp.currentUser, realmApp?.currentUser?.id, ]);

    useEffect(() => {

        async function login() {

            const mongodb = realmApp.currentUser!.mongoClient("mongodb-atlas");

            const collection = mongodb.db("data").collection("live-flights");

            dispatch(setLiveFlightsCollection(collection));

            dispatch(setFlightsCollection(mongodb.db("data").collection("flights")));

            onLiveFlightsLoaded(await collection.find());

            for await (const change of collection.watch()) {

                switch (change.operationType) {

                    case "insert":

                        onLiveFlightAdded(change.fullDocument);

                        break;

                    case "update":
                        
                        if (change.updateDescription.updatedFields.squawkCode && importantSquakCodes.includes(change.updateDescription.updatedFields.squawkCode)) {

                            notify(change.fullDocument);

                        }

                        onLiveFlightUpdated(change.fullDocument);

                        break;

                    case "delete":

                        onLiveFlightRemoved(change.documentKey._id);

                        break;

                }

            }

        }

        login();
        
    }, [  ]); //eslint-disable-line 

    return <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    
}

export default LiveFlights;