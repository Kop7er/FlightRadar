import "../styles/tailwind.css";

import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import Head from "../components/head";

import LiveFlights from "../components/liveFlights";

import { wrapper } from "../store/store";

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout; }

function MyApp({ Component, ...rest }: AppPropsWithLayout) {

    const { store, props } = wrapper.useWrappedStore(rest);

    const getLayout = Component.getLayout ?? (page => page);

    return (
        <Provider store={store}>
            <Head />
            {getLayout(<Component {...props} />)}
            <LiveFlights />
        </Provider>
    )
    
}

export default MyApp;