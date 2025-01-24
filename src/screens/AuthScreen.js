// AuthScreen.js
import React, { useState, useEffect, useContext } from "react";
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import styles from "../styles/AuthScreenStyles";
import { registerUser, loginUser } from "../services/authService";
import { useNavigation } from "@react-navigation/native";
import { DrawerContext } from "../context/DrawerContext";

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigation();

    const { drawerRef } = useContext(DrawerContext);

    useEffect(() => {
        drawerRef.current = React.createRef();
    }, []);

    const handleSwitchMode = () => {
        setIsLogin((prev) => !prev);
    };

    const handleSubmit = async () => {
        try {
            if (isLogin) {
                const response = await loginUser(emailOrPhone, password);
                console.log("Login successful:", response);
                navigate.replace("Home");
            } else {
                const response = await registerUser(
                    emailOrPhone,
                    phone,
                    password
                );
                console.log("Registration successful:", response);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.background}>
                    <Image
                        source={require("../assets/authLogo.png")}
                        style={styles.backgroundImage}
                    />
                    <Image
                        source={require("../assets/Untitled-1.png")}
                        style={styles.backgroundImage2}
                    />
                </View>
                <View style={styles.form}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {isLogin ? "Вход" : "Регистрация"}
                            </Text>
                            <TouchableOpacity style={styles.languageButton}>
                                <Text style={styles.languageButtonText}>
                                    EN
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={
                                isLogin ? "Email или Телефон" : "Email"
                            }
                            value={emailOrPhone}
                            onChangeText={setEmailOrPhone}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Пароль"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        {!isLogin && (
                            <TextInput
                                style={styles.input}
                                placeholder="Телефон"
                                value={phone}
                                onChangeText={setPhone}
                            />
                        )}
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>
                                {isLogin ? "Войти" : "Зарегистрироваться"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSwitchMode}>
                            <Text style={styles.signInText}>
                                {isLogin
                                    ? "Нет аккаунта? Зарегистрироваться"
                                    : "Есть аккаунт? Войти"}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.agreementText}>
                            Даю согласие на обработку{" "}
                            <Text style={styles.link}>персональных данных</Text>{" "}
                            и принимаю{" "}
                            <Text style={styles.link}>
                                условия пользовательского соглашения
                            </Text>
                            .
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AuthScreen;
