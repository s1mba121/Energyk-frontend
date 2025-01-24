// authService.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@env";

export const registerUser = async (email, phone, password) => {
    console.log("Регистрация пользователя начата");
    console.log("Данные для регистрации:", { email, phone });

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            email,
            phone,
            password,
        });
        console.log("Ответ от сервера при регистрации:", response.data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при регистрации пользователя:");

        if (error.response) {
            console.error("Ответ сервера с ошибкой:", {
                status: error.response.status,
                data: error.response.data,
            });
            throw error.response.data;
        } else if (error.request) {
            console.error("Сервер не ответил на запрос:", error.request);
            throw { message: "Ошибка сети или сервер недоступен" };
        } else {
            console.error("Произошла другая ошибка:", error.message);
            throw { message: "Произошла неизвестная ошибка" };
        }
    }
};

export const loginUser = async (emailOrPhone, password) => {
    console.log("Авторизация пользователя начата");
    console.log("Данные для авторизации:", {
        emailOrPhone,
        password: "скрыт для безопасности",
    });

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: emailOrPhone.includes("@") ? emailOrPhone : undefined,
            phone: emailOrPhone.includes("@") ? undefined : emailOrPhone,
            password,
        });

        console.log("Ответ от сервера при авторизации:", response.data);

        const { token, user } = response.data;
        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("userData", JSON.stringify(user));

        console.log("Данные сохранены в AsyncStorage:", { token, user });

        return response.data;
    } catch (error) {
        console.error("Ошибка при авторизации пользователя:");

        if (error.response) {
            console.error("Ответ сервера с ошибкой:", {
                status: error.response.status,
                data: error.response.data,
            });
            throw error.response.data;
        } else if (error.request) {
            console.error("Сервер не ответил на запрос:", error.request);
            throw { message: "Ошибка сети или сервер недоступен" };
        } else {
            console.error("Произошла другая ошибка:", error.message);
            throw { message: "Произошла неизвестная ошибка" };
        }
    }
};
