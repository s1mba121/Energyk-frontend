import React, { createContext, useRef } from "react";

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const drawerRef = useRef(null);

    return (
        <DrawerContext.Provider value={{ drawerRef }}>
            {children}
        </DrawerContext.Provider>
    );
};
