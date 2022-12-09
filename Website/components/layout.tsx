import React from "react";

import type { ReactElement } from "react";

import NavBar from "./navbar";

type Props = { children: ReactElement };

const Layout: React.FC<Props> = ({ children }) => {

    return (
        <>
            <NavBar />
            {children}
        </>
    )
    
}

export default Layout;