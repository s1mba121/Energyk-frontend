import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import DocumentationScreen from "../screens/DocumentationScreen";
import InfoScreen from "../screens/InfoScreen";
import SupportScreen from "../screens/SupportScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TariffsScreen from "../screens/TariffsScreen";
import OrdersScreen from "../screens/OrdersScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("authToken");
            setIsAuthenticated(!!token);
        };
        checkAuth();
    }, []);

    useEffect(() => {
        console.log("Home screen preloaded");
    }, []);

    if (isAuthenticated === null) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={isAuthenticated ? "Home" : "Auth"}
            >
                <Stack.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Orders"
                    component={OrdersScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Documentation"
                    component={DocumentationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Info"
                    component={InfoScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Support"
                    component={SupportScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Payment"
                    component={PaymentScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Tariffs"
                    component={TariffsScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
