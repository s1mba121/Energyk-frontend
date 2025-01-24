import React, { useState, useEffect, use } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [balance, setBalance] = useState(0);
    const [coins, setCoins] = useState("0.00");
    const navigation = useNavigation();

    const formatPhoneNumber = (phone) => {
        if (phone.length === 13) {
            return `${phone.slice(0, 4)} (${phone.slice(4, 6)}) ${phone.slice(6, 9)}-${phone.slice(9, 11)}-${phone.slice(11, 13)}`;
        }
        return phone;
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userData");
        navigation.replace("Auth");
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem("userData");
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    console.log("Fetched user data:", userData);
                    const email = userData.email || "";
                    const name = email.split("@")[0];

                    const phone = userData.phone || "";
                    const balance = userData.balance || 0;
                    const coins = userData.coins || "0.00";

                    setUserName(name);

                    setEmail(email);
                    setUserPhone(formatPhoneNumber(phone));
                    setBalance(balance);
                    setCoins(coins);
                }
            } catch (error) {
                console.error("Ошибка получения данных пользователя:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.replace("Home")}
                        style={styles.back}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color="#132330"
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            top: -5,
                            color: "#132330",
                        }}
                    >
                        Профиль
                    </Text>
                </View>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.username}>{userName}</Text>
                        <Text style={styles.email}>{email}</Text>
                    </View>

                    <MaterialCommunityIcons
                        name="face-man-profile"
                        size={45}
                        color="#132330"
                    />
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Телефон</Text>
                        <Text style={styles.value}>{userPhone}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Баланс</Text>
                        <Text style={styles.value}>{balance}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Баллы</Text>
                        <Text style={styles.value}>{coins}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
            >
                <Text style={styles.logoutText}>Выйти из профиля</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 30,
        justifyContent: "space-between",
    },
    back: {
        marginTop: 30,
        marginBottom: 40,
    },
    header: {
        marginBottom: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#132330",
    },
    email: {
        fontSize: 16,
        color: "#666",
        marginTop: 5,
    },
    infoSection: {
        marginBottom: 30,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: "#666",
    },
    value: {
        fontSize: 16,
        color: "#132330",
    },
    addEmailButton: {
        backgroundColor: "#FFD700",
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 30,
    },
    addEmailText: {
        fontSize: 16,
        color: "#132330",
        fontWeight: "bold",
    },
    logoutButton: {
        width: 160,
        height: 40,
        marginBottom: 20,
        justifyContent: "center",
    },
    logoutText: {
        fontSize: 16,
        color: "#132330",
    },
});
