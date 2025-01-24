import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "@env";

const OrdersScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const userDataString = await AsyncStorage.getItem("userData");
            const userId = JSON.parse(userDataString).id;
            const response = await axios.get(
                `${API_BASE_URL}/orders/active/${userId}`
            );
            if (response.status === 200 && response.data.orders) {
                setOrders(response.data.orders);
                console.log("Fetched orders:", response.data.orders);
            } else {
                setOrders([]);
            }
        } catch (err) {
            if (err.response?.status === 400) {
                setOrders([]);
            } else {
                setError("Не удалось загрузить данные. Попробуйте позже.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const calculateUsageTime = (startTime) => {
        const start = new Date(startTime);
        const now = new Date();
        const diffInMinutes = Math.floor((now - start) / (1000 * 60));
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        return hours > 0 ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
    };

    const renderOrder = ({ item }) => (
        <View style={styles.orderCard}>
            <Ionicons
                name="battery-charging-outline"
                size={40}
                color="#132330"
                style={styles.icon}
            />
            <View style={styles.orderDetails}>
                <Text style={styles.location}>
                    Локация: {item.machineLocation || "N/A"}
                </Text>
                <Text style={styles.usageTime}>
                    Время использования: {calculateUsageTime(item.startTime)}
                </Text>
                <Text style={styles.currentCost}>
                    Начальная стоимость: {item.initialCharge} BYN
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.header}>
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
                    <Text style={styles.headerTitle}>Ваши Аренды</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#132330" />
                ) : error ? (
                    <View style={styles.infoSection}>
                        <Text style={styles.text}>{error}</Text>
                    </View>
                ) : orders.length > 0 ? (
                    <FlatList
                        data={orders}
                        renderItem={renderOrder}
                        keyExtractor={(item) => item.orderId}
                        contentContainerStyle={styles.orderList}
                    />
                ) : (
                    <View style={styles.infoSection}>
                        <Text style={styles.text}>
                            Здесь пока пусто,{"\n"}
                            перейдите на главную чтобы взять Powerbank в аренду.
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default OrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    back: {
        marginTop: 30,
        marginBottom: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#132330",
        marginLeft: 10,
        marginTop: 8,
    },
    infoSection: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        color: "#666",
        textAlign: "center",
    },
    orderList: {
        marginTop: 20,
    },
    orderCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: 15,
    },
    orderDetails: {
        flex: 1,
    },
    location: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#132330",
    },
    usageTime: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    currentCost: {
        fontSize: 14,
        color: "#132330",
        marginTop: 5,
        fontWeight: "bold",
    },
});
