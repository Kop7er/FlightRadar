import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";

import * as Realm from "realm-web";

export const realmSlice = createSlice({

    name: "realm",

    initialState: {

        app: new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID! }),

        flightsCollection: null as globalThis.Realm.Services.MongoDB.MongoDBCollection<Flight> | null,

        liveFlightsCollection: null as globalThis.Realm.Services.MongoDB.MongoDBCollection<LiveFlight> | null,        

    },

    reducers: {

        setFlightsCollection(state, action) {

            state.flightsCollection = action.payload;

        },

        setLiveFlightsCollection(state, action) {

            state.liveFlightsCollection = action.payload;

        }

    }

});

export const { setFlightsCollection, setLiveFlightsCollection } = realmSlice.actions;

export const selectRealmApp = (state: AppState) => state.realm.app;

export const selectFlightsCollection = (state: AppState) => state.realm.flightsCollection;

export const selectLiveFlightsCollection = (state: AppState) => state.realm.liveFlightsCollection;

export default realmSlice.reducer;