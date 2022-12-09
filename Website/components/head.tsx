import React from "react";

import NextHead from "next/head";

const Head: React.FC = () => {
    return (     
        <NextHead>
            <title>Flight Radar</title>            
            <link rel="icon" href="/favicon.svg" />
            <meta name="theme-color" content="#0099ff" />

            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </NextHead>
    )
}

export default Head;