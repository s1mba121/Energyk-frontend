import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#132330",
    },
    background: {
        backgroundColor: "#132330",
        height: height * 0.6,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    backgroundImage: {
        flex: 1,
        width: 200,
        height: 200,
        resizeMode: "cover",
        position: "absolute",
        top: 50,
        left: "50%",
        transform: [{ translateX: -100 }],
        bottom: 0,
    },
    backgroundImage2: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: "cover",
        position: "absolute",
        top: 200,
        left: "50%",
        transform: [{ translateX: "-50%" }],
        bottom: 0,
    },
    form: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: height * 0.5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: "space-between",
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingRight: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    languageButton: {
        padding: 10,
        backgroundColor: "#132330",
        borderRadius: 10,
    },
    languageButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    footer: {
        justifyContent: "flex-end",
    },
    button: {
        backgroundColor: "#132330",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    signInText: {
        fontSize: 14,
        color: "#132330",
        textAlign: "center",
        marginTop: 0,
    },
    agreementText: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
        marginTop: 10,
    },
    link: {
        color: "#132330",
        textDecorationLine: "underline",
    },
});

export default styles;
