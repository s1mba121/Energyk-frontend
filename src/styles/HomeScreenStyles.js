import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    map: {
        flex: 1,
    },
    bottomPanel: {
        position: "absolute",
        bottom: 5,
        width: width,
        alignItems: "center",
        padding: 10,
    },
    button: {
        width: "95%",
        height: 55,
        backgroundColor: "#132330",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonTextSubtitle: {
        color: "#fff",
        fontSize: 14,
    },
    topPanel: {
        width: "90%",
        position: "absolute",
        top: 40,
        left: 18,
        zIndex: 1000,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    hamburgerButton: {
        padding: 10,
        borderRadius: 10,
    },
    hamburgerLine: {
        width: 20,
        height: 2,
        backgroundColor: "#000",
        marginVertical: 2.2,
    },
    orderButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#132330",
    },
    orderButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    lightning: {
        width: 30,
        height: 30,
    },
    drawerContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 50,
        justifyContent: "space-between",
    },
    drawerHeader: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#132330",
    },
    drawerSubheader: {
        fontSize: 14,
        color: "gray",
        marginBottom: 50,
    },
    drawerItem: {
        fontSize: 16,
        marginVertical: 15,
        color: "#132330",
    },
    lightningBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    lightningBar: {
        width: 30,
        height: 30,
    },
    lightningBarText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#132330",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#132330",
        opacity: 0.6,
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#132330",
    },
    closeButton: {
        padding: 5,
    },
    closeText: {
        fontSize: 18,
        color: "#132330",
    },
    codeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        textAlign: "center",
        fontSize: 18,
    },
    submitButton: {
        backgroundColor: "#132330",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    submitText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});

export default styles;
