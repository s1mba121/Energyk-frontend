import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    Animated,
    Easing,
    DrawerLayoutAndroid,
    ActivityIndicator,
    Pressable,
    Modal,
    TextInput,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/HomeScreenStyles";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "@env";

const HomeScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [animation] = useState(new Animated.Value(0));
    const [locationSubscription, setLocationSubscription] = useState(null);
    const [isMapFocused, setIsMapFocused] = useState(true);
    const drawer = useRef(null);
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [qrCode, setQrCode] = useState("");
    const [code, setCode] = useState(["", "", "", "", ""]);
    const inputs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const handleChange = (text, index) => {
        if (/^\d?$/.test(text)) {
            const newCode = [...code];
            newCode[index] = text;
            setCode(newCode);

            if (text && index < 4) {
                inputs[index + 1].current.focus();
            }
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
            inputs[index - 1].current.focus();
        }
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleQRCodeSubmit = () => {
        Alert.alert("QR Код", `Вы ввели: ${qrCode}`);
        setQrCode("");
        setIsModalVisible(false);
    };

    const updateLocationAndMarkers = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Разрешение на доступ к геолокации отклонено");
            return;
        }

        const userLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });
        setLocation({
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
        });

        setIsLoading(false);
    };

    const formatPhoneNumber = (phone) => {
        if (phone.length === 13) {
            return `${phone.slice(0, 4)} (${phone.slice(4, 6)}) ${phone.slice(6, 9)}-${phone.slice(9, 11)}-${phone.slice(11, 13)}`;
        }
        return phone;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem("userData");
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    const email = userData.email || "";
                    const phone = userData.phone || "";

                    const name = email.split("@")[0];

                    setUserName(name);
                    setUserPhone(formatPhoneNumber(phone));
                }
            } catch (error) {
                console.error("Ошибка получения данных пользователя:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Разрешение на доступ к геолокации отклонено");
                return;
            }

            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 1,
                },
                (userLocation) => {
                    setLocation({
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                    });
                }
            );

            setLocationSubscription(subscription);
        })();

        return () => {
            locationSubscription?.remove();
        };
    }, []);

    useEffect(() => {
        if (location) {
            setIsLoading(false);
        }
    }, [location]);

    const updateUser = async () => {
        try {
            const userDataString = await AsyncStorage.getItem("userData");
            if (!userDataString) {
                Alert.alert("Ошибка", "Пользовательские данные не найдены");
                return;
            }

            const userId = JSON.parse(userDataString).id;
            console.log("userId", userId);
            const response = await axios.get(`${API_BASE_URL}/users/${userId}`);

            if (response.status === 200) {
                console.log(
                    "Данные пользователя успешно обновлены",
                    response.data
                );

                const { user } = response.data;
                await AsyncStorage.setItem("userData", JSON.stringify(user));
                return response.data;
            } else {
                console.log("Ошибка", "Что-то пошло не так, попробейте снова");
            }
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    const respondToMachine = async () => {
        try {
            const userDataString = await AsyncStorage.getItem("userData");
            if (!userDataString) {
                Alert.alert("Ошибка", "Пользовательские данные не найдены");
                return;
            }

            const userId = JSON.parse(userDataString).id;
            const enteredCode = code.join("");

            if (enteredCode.length !== 5) {
                Alert.alert("Ошибка", "Код должен состоять из 5 цифр");
                return;
            }

            const response = await axios.post(
                `${API_BASE_URL}/machines/respond-to-machine`,
                {
                    userId: userId,
                    kod: enteredCode,
                }
            );

            if (response.status === 200) {
                Alert.alert("Успех", "Операция успешно выполнена");
            } else {
                Alert.alert("Ошибка", "Что-то пошло не так, попробуйте снова");
            }
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            Alert.alert("Ошибка", "Не удалось отправить данные");
        }
    };

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -30],
    });

    const handleLogout = async () => {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userData");
        navigation.replace("Auth");
    };

    const fetchAndSaveOrdersCount = async () => {
        try {
            const userDataString = await AsyncStorage.getItem("userData");
            if (!userDataString) {
                Alert.alert("Ошибка", "Пользовательские данные не найдены");
                return;
            }

            const userId = JSON.parse(userDataString).id;
            const response = await axios.get(
                `${API_BASE_URL}/orders/active/${userId}`
            );

            if (response.status === 200 && response.data.orders) {
                const ordersCount = response.data.orders.length;
                await AsyncStorage.setItem(
                    "ordersCount",
                    JSON.stringify(ordersCount)
                );
                console.log(`Количество заказов: ${ordersCount}`);
                setOrdersCount(ordersCount);
            } else {
                await AsyncStorage.setItem("ordersCount", JSON.stringify(0));
                setOrdersCount(0);
            }
        } catch (error) {
            console.error("Ошибка при получении заказов:", error);
        }
    };

    const [ordersCount, setOrdersCount] = useState(0);

    useEffect(() => {
        const initializeOrdersCount = async () => {
            try {
                const savedOrdersCount =
                    await AsyncStorage.getItem("ordersCount");
                setOrdersCount(
                    savedOrdersCount ? JSON.parse(savedOrdersCount) : 0
                );
            } catch (error) {
                console.error(
                    "Ошибка при инициализации счетчика заказов:",
                    error
                );
            }
        };

        initializeOrdersCount();
        fetchAndSaveOrdersCount();
    }, []);

    const navigationView = () => (
        <View style={styles.drawerContainer}>
            <View>
                <Text style={styles.drawerHeader}>{userName}</Text>
                <Text style={styles.drawerSubheader}>{userPhone}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Text style={styles.drawerItem}>Профиль</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Payment")}
                >
                    <Text style={styles.drawerItem}>Способы оплаты</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Tariffs")}
                >
                    <Text style={styles.drawerItem}>Тарифы</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={updateLocationAndMarkers}>
                    <Text style={styles.drawerItem}>Документация</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Support")}
                >
                    <Text style={styles.drawerItem}>Служба поддержки</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Settings")}
                >
                    <Text style={styles.drawerItem}>Настройки</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={fetchAndSaveOrdersCount}>
                    <Text style={styles.drawerItem}>Информация</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.lightningBarContainer}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <Image
                        source={require("../assets/Untitled-1.png")}
                        style={styles.lightningBar}
                    />
                    <Text style={styles.lightningBarText}>myenergyk.com</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text>RU</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    if (errorMsg) {
        Alert.alert("Ошибка", errorMsg);
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                {/* <ActivityIndicator size="large" color="#0000ff" />
                <Text>Загрузка...</Text> */}
            </View>
        );
    }

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={navigationView}
        >
            <View style={styles.container}>
                <View style={styles.topPanel}>
                    <TouchableOpacity
                        style={styles.hamburgerButton}
                        onPress={() => drawer.current.openDrawer()}
                    >
                        <View style={styles.hamburgerLine} />
                        <View style={styles.hamburgerLine} />
                        <View style={styles.hamburgerLine} />
                    </TouchableOpacity>
                    <Pressable
                        style={styles.orderButton}
                        onPress={() => navigation.navigate("Orders")}
                    >
                        <Text style={styles.orderButtonText}>
                            {ordersCount}
                        </Text>
                    </Pressable>
                </View>

                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 53.652199,
                        longitude: 23.853917,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    {location && (
                        <Circle
                            center={location}
                            radius={30}
                            fillColor="rgba(0, 0, 255, 0.3)"
                            strokeColor="rgba(0, 0, 255, 0.8)"
                        />
                    )}
                    <Marker
                        coordinate={{
                            latitude: 53.65,
                            longitude: 23.855861,
                        }}
                    >
                        <Image
                            source={require("../assets/15988926.png")}
                            style={styles.lightning}
                        />
                    </Marker>
                    <Marker
                        coordinate={{
                            latitude: 53.66371936614512,
                            longitude: 23.832681974797836,
                        }}
                    >
                        <Image
                            source={require("../assets/15988926.png")}
                            style={styles.lightning}
                        />
                    </Marker>
                    <Marker
                        coordinate={{
                            latitude: 53.67953740806974,
                            longitude: 23.829886194289116,
                        }}
                    >
                        <Image
                            source={require("../assets/15988926.png")}
                            style={styles.lightning}
                        />
                    </Marker>
                    <Marker
                        coordinate={{
                            latitude: 53.67962484192967,
                            longitude: 23.829512273546527,
                        }}
                    >
                        <Image
                            source={require("../assets/15988926.png")}
                            style={styles.lightning}
                        />
                    </Marker>
                    <Marker
                        coordinate={{
                            latitude: 53.69399270822111,
                            longitude: 23.839800475766413,
                        }}
                    >
                        <Image
                            source={require("../assets/15988926.png")}
                            style={styles.lightning}
                        />
                    </Marker>
                </MapView>

                <View style={styles.bottomPanel}>
                    <Pressable
                        onPress={toggleModal}
                        style={styles.button}
                        // onPress={startAnimation}
                    >
                        <Text style={styles.buttonText}>Зарядись ϟ</Text>
                        <Text style={styles.buttonTextSubtitle}>
                            Введи код с автомата
                        </Text>
                    </Pressable>
                </View>

                <Modal
                    visible={isModalVisible}
                    transparent
                    animationType="slide"
                    animationDuration={600}
                    onRequestClose={toggleModal}
                >
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.header}>
                                <Text style={styles.title}>Введите код</Text>
                                <TouchableOpacity
                                    onPress={toggleModal}
                                    style={styles.closeButton}
                                >
                                    <Text style={styles.closeText}>✖</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.codeContainer}>
                                {code.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        style={styles.input}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        value={digit}
                                        onChangeText={(text) =>
                                            handleChange(text, index)
                                        }
                                        onKeyPress={(e) =>
                                            handleKeyPress(e, index)
                                        }
                                        ref={inputs[index]}
                                    />
                                ))}
                            </View>

                            <TouchableOpacity
                                onPress={respondToMachine}
                                style={styles.submitButton}
                            >
                                <Text style={styles.submitText}>
                                    Подтвердить
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </DrawerLayoutAndroid>
    );
};

export default HomeScreen;
