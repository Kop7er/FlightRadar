import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";

const initialState = {

    latitude: 0,

    longitude: 0,

    zoom: 2
    
}

export const viewStateSlice = createSlice({

    name: "viewState",

    initialState,

    reducers: {

        setViewState(state, action) {

            state.latitude = action.payload.latitude;

            state.longitude = action.payload.longitude;

            state.zoom = action.payload.zoom;

        },

        increaseZoom(state) {

            state.zoom += 0.5;

        },

        decreaseZoom(state) {

            state.zoom -= 0.5;

        }

    }

});

export const { setViewState, increaseZoom, decreaseZoom } = viewStateSlice.actions;

export const selectViewState = (state: AppState) => state.viewState;

export default viewStateSlice.reducer;