import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const PaymentScreen = () => {
    const navigation = useNavigation();

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
                        Способ оплаты
                    </Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.text}>
                        Добавьте способ оплаты,{"\n"}
                        чтобы начать пользоваться всеми функциями.
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.addPayment}>
                <Text style={styles.paymentText}>Добавить способ оплаты</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PaymentScreen;

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
    infoSection: {
        width: "100%",
    },
    text: {
        fontSize: 18,
        color: "#666",
        textAlign: "center",
    },
    addPayment: {
        width: "100%",
        height: 55,
        backgroundColor: "#132330",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    paymentText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
