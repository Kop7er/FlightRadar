import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";

const initialState = {

    liveFlights: [] as LiveFlight[],

    trackedFlight: null as null | LiveFlight,

    pausedUpdates: false

}

export const flightsSlice = createSlice({

    name: "flights",

    initialState,

    reducers: {

        setLiveFlights(state, action) {

            state.liveFlights = action.payload;

        },

        addLiveFlight(state, action) {

            if (state.pausedUpdates) return;

            state.liveFlights.push(action.payload);

        },

        updateLiveFlight(state, action) {

            if (state.pausedUpdates) return;

            const flightID = action.payload._id.toString();

            if (state.trackedFlight && state.trackedFlight._id.toString() === flightID) {

                state.trackedFlight = action.payload;

            }

            const index = state.liveFlights.findIndex(flight => flight._id.toString() === flightID);

            if (index !== -1) {

                state.liveFlights[index] = action.payload;

            }

        },

        removeLiveFlight(state, action) {
            
            if (state.pausedUpdates) return;

            const flightID = action.payload.toString();

            state.liveFlights = state.liveFlights.filter((flight) => flight._id.toString() !== flightID);

            if (state.trackedFlight && state.trackedFlight._id.toString() === flightID) {

                state.trackedFlight = null;

            }

        },

        setTrackedFlight(state, action) {

            state.trackedFlight = action.payload;

        },

        removeTrackedFlight(state) {

            state.trackedFlight = null;

        },

        setPausedUpdates(state, action) {

            state.pausedUpdates = action.payload;

        }

    }

});

export const { setLiveFlights, addLiveFlight, updateLiveFlight, removeLiveFlight, setTrackedFlight, removeTrackedFlight, setPausedUpdates } = flightsSlice.actions;

export const selectLiveFlights = (state: AppState) => state.flights.liveFlights;

export const selectTrackedFlight = (state: AppState) => state.flights.trackedFlight;

export const selectPausedUpdates = (state: AppState) => state.flights.pausedUpdates;

export default flightsSlice.reducer;