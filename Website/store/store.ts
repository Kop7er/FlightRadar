import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { createWrapper } from "next-redux-wrapper";

import { realmSlice } from "./realm";

import { flightsSlice } from "./flightsSlice";

import { viewStateSlice } from "./viewStateSlice";

const makeStore = () => configureStore({

    reducer: {

        [realmSlice.name]: realmSlice.reducer,

        [flightsSlice.name]: flightsSlice.reducer,

        [viewStateSlice.name]: viewStateSlice.reducer

    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({

        serializableCheck: false

    }),

    devTools: process.env.NODE_ENV !== "production"

});

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);