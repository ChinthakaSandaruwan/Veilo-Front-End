import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../constants/Colors'; // Make sure the path to your Colors file is correct

export default function signIn() {

    const router = useRouter();
    const [mobile, setMobile] = useState("");
    const [password, setPassworde] = useState("");

    const [isloading, setIsLoading] = useState(false);

     


    useEffect(() => {
        async function checkUser() {
            const user = await AsyncStorage.getItem("user");
            if (user) {
                router.replace("/(tabs)/home");
            }else{
                setIsLoading(false);
            }
            
        }
        checkUser();
    }, []);



    async function signInRequest() {

        if (mobile !== "" && password !== "") {

            const loginData = {
                mobile: mobile,
                password: password
            };

            try {
                const apiUrl = process.env.EXPO_PUBLIC_API_URL;
                const response = await fetch(apiUrl + '/user/signIn', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginData)
                });

                if (response.ok) {

                    const data = await response.json();
                    console.log(data.user);

                    await AsyncStorage.setItem("user", JSON.stringify(data.user));

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

    if (!isloading) {
        return (
            <SafeAreaView style={styles.container}>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardView}
                >

                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                        <Image
                            source={require("../assets/images/logo.png")}
                            style={styles.img}
                        />

                        <View style={styles.textView}>
                            <Text style={styles.titleTxt}>SignIn</Text>
                            <Text style={styles.descriptionTxt}>Please Sign in to continue.</Text>
                        </View>

                        <View style={styles.inputView}>
                            {/* Using Colors.light.secondary for icons to fit nicely in the input container */}
                            <AntDesign name="user" size={20} color={Colors.light.secondary} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder='Enter your Mobile'
                                placeholderTextColor={Colors.brand.denim} // Optional addition for readable placeholder text
                                onChangeText={setMobile}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <View style={styles.inputView}>
                            <MaterialIcons name="lock-outline" size={22} color={Colors.light.secondary} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder='Enter your Password'
                                placeholderTextColor={Colors.brand.denim}
                                onChangeText={setPassworde}
                                secureTextEntry={true}
                            />
                        </View>

                        <Pressable style={styles.btn} onPress={() => {
                            signInRequest();
                        }}>
                            <Text style={styles.btnTxt}>Sign In</Text>
                        </Pressable>

                        <View style={styles.footerRow}>
                            <Text style={styles.footerTxt}>{"Don't have account?"}</Text>
                            <Pressable style={{ height: 30 }} onPress={() => {
                                router.push("/signup");
                            }}>
                                <Text style={styles.signUpTxt}>Sign Up</Text>
                            </Pressable>
                        </View>

                    </ScrollView>

                </KeyboardAvoidingView>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background, // Used backgroundLight (#caf0f8)
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        gap: 18,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    descriptionTxt: {
        color: Colors.light.secondary, // Uses denim to blend with light theme accents
        marginTop: 5,
    },
    titleTxt: {
        fontWeight: "bold",
        fontSize: 22,
        color: Colors.light.text, // Uses deepNavy (#003049)
    },
    textView: {
        alignItems: "center",
        marginBottom: 20,
    },
    btnTxt: {
        color: Colors.light.card, // Fallback to white (#ffffff)
        fontSize: 16,
        fontWeight: "bold",
    },
    btn: {
        backgroundColor: Colors.light.primary, // Swapped blue with royalBlue (#0077b6)
        borderRadius: 50,
        padding: 14,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    inputView: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: Colors.light.card, // Replaced gray with pure white (#ffffff) to stand out against background light blue canvas
        borderColor: Colors.light.border, // Replaced hardcoded color with paleBlue border
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 18,
        alignItems: "center",
        gap: 10,
    },
    icon: {
        alignSelf: "center",
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        marginBottom: 10,
        borderRadius: 25,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
        color: Colors.light.text, // Text entered inside the input fields will be deepNavy
    },
    footerRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },
    footerTxt: {
        color: Colors.light.secondary,
    },
    signUpTxt: {
        fontWeight: "bold",
        fontSize: 15,
        color: Colors.light.primary, // Highlights 'Sign Up' with royalBlue primary theme color
    }
});