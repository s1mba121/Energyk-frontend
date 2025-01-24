import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { DrawerProvider } from "./context/DrawerContext";

const App = () => {
    return (
        <DrawerProvider>
            <AppNavigator />
        </DrawerProvider>
    );
};

export default App;
