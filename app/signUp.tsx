import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        // Implement your registration logic here
        console.log("First Name:", firstName, "Last Name:", lastName, "Mobile:", mobileNumber, "Password:", password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={{ flex: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
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
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>Sign up to get started</Text>
                        </View>

                        {/* Input fields */}
                        <View style={styles.form}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Enter your first name"
                                placeholderTextColor="#999"
                                autoCapitalize="words"
                                value={firstName}
                                onChangeText={setFirstName}
                            />

                            <Text style={styles.label}>Last Name</Text>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Enter your last name"
                                placeholderTextColor="#999"
                                autoCapitalize="words"
                                value={lastName}
                                onChangeText={setLastName}
                            />

                            <Text style={styles.label}>Mobile Number</Text>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Enter your mobile number"
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
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
                        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>

                        {/* Footer link */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/')}>
                                <Text style={styles.footerLink}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    header: {
        marginBottom: 24,
        alignItems: "center",
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
        marginBottom: 16,
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
