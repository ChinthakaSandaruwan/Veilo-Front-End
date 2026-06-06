import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signin() {


    const router = useRouter();
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");

    async function signInPresse() {

        if (mobileNumber !== "" && password !== "") {

            const loginData = {
                mobile: mobileNumber,
                password: password
            };

            try {
                const apiUrl = process.env.EXPO_PUBLIC_API_URL;
                const response = await fetch(apiUrl+'/user/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginData)
                });

                if (response.ok) {

                    const data = await response.json();
                    console.log(data.user);

                        await AsyncStorage.setItem("user", JSON.stringify(data.user) );

                        router.replace("/home");

                } else {

                    const data = await response.json();
                    console.log(data.msg);
                    alert(data.msg);

                }

            } catch (err) {
                console.error(err);
            }

        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image 
                        source={require("../assets/images/logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Header section */}
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome</Text>
                    <Text style={styles.subtitle}>Sign in to your account</Text>
                </View>

                {/* Input fields */}
                <View style={styles.form}>
                    <Text style={styles.label}>Mobile Number</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter your mobile number"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad" // Shows numeric keypad with phone symbols
                        autoCapitalize="none"
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="••••••••"
                        placeholderTextColor="#999"
                        secureTextEntry
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                {/* Action button */}
                <TouchableOpacity style={styles.button} onPress={signInPresse}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Footer link */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/signUp')}>
                        <Text style={styles.footerLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 20, // Optional: gives corners a smooth look
    },
    header: {
        marginBottom: 32,
        alignItems: "center", // Standard centered look to align with the logo
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666666",
    },
    form: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        height: 50,
        backgroundColor: "#F5F5F7",
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#1A1A1A",
        borderWidth: 1,
        borderColor: "#E5E5EA",
    },
    button: {
        height: 52,
        backgroundColor: "#007AFF",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        shadowColor: "#007AFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 32,
    },
    footerText: {
        fontSize: 14,
        color: "#666666",
    },
    footerLink: {
        fontSize: 14,
        color: "#007AFF",
        fontWeight: "600",
    },
});
