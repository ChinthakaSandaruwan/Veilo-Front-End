import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons'; // Imported for eye toggle icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useColorScheme, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function Login() {
    const [mobile, setMobile] = useState("");
    const [password, setPassworde] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [secureText, setSecureText] = useState(true); // State to manage password visibility

    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const systemFont = Fonts?.sans || 'normal';

    useEffect(() => {
        async function checkUser() {
            const user = await AsyncStorage.getItem("user");
            if (user) {
                router.replace("/(tabs)/home");
            } else {
                setIsLoading(false);
            }
        }
        checkUser();
    }, []);

    async function signIn() {
        if (mobile !== "" && password !== "") {
            const loginData = {
                mobile: mobile,
                password: password
            };

            try {
                const apiUrl = process.env.EXPO_PUBLIC_API_URL;
                const response = await fetch(apiUrl + "/user/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginData)
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.user);
                    await AsyncStorage.setItem("user", JSON.stringify(data.user));
                    router.push("/(tabs)/home");
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

    if (!isLoading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardView}
                >
                    <ScrollView 
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        
                        <Image
                            source={require("../assets/images/icon.png")}
                            style={styles.img}
                        />

                        <View style={styles.textView}>
                            <Text style={[styles.titleTxt, { color: theme.text, fontFamily: systemFont }]}>SignIn</Text>
                            <Text style={[styles.descriptionTxt, { color: theme.icon, fontFamily: systemFont }]}>Please Sign in to continue.</Text>
                        </View>

                        <View style={[styles.inputView, { backgroundColor: colorScheme === 'dark' ? '#25282a' : '#ececec' }]}>
                            <AntDesign name="user-add" size={20} color={theme.icon} style={styles.iconStyle} />
                            <TextInput 
                                style={[styles.input, { color: theme.text, fontFamily: systemFont }]} 
                                placeholder='Enter your Mobile' 
                                placeholderTextColor={theme.icon}
                                onChangeText={setMobile} 
                            />
                        </View>

                        <View style={[styles.inputView, { backgroundColor: colorScheme === 'dark' ? '#25282a' : '#ececec' }]}>
                            <MaterialIcons name="lock-outline" size={22} color={theme.icon} style={styles.iconStyle} />
                            <TextInput 
                                style={[styles.input, { color: theme.text, fontFamily: systemFont }]} 
                                placeholder='Enter your Password' 
                                placeholderTextColor={theme.icon}
                                secureTextEntry={secureText} // Controlled by state variable
                                onChangeText={setPassworde} 
                            />
                            {/* Toggle Button */}
                            <Pressable onPress={() => setSecureText(!secureText)} style={styles.eyeIconStyle}>
                                <Ionicons 
                                    name={secureText ? "eye-off-outline" : "eye-outline"} 
                                    size={20} 
                                    color={theme.icon} 
                                />
                            </Pressable>
                        </View>

                        <Pressable style={[styles.btn, { backgroundColor: theme.tint }]} onPress={signIn}>
                            <Text style={[styles.btnTxt, { fontFamily: systemFont, color: colorScheme === 'dark' ? '#151718' : 'white' }]}>Sign In</Text>
                        </Pressable>

                        <View style={styles.footerRow}>
                            <Text style={{ color: theme.icon, fontFamily: systemFont }}>{"Don't have account?"}</Text>
                            <Pressable style={{ height: 30 }} onPress={() => router.push("/signup")}>
                                <Text style={{ fontWeight: "bold", fontSize: 15, color: theme.tint, fontFamily: systemFont }} >Sign Up</Text>
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
    },
    keyboardView: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        flexGrow: 1,
        gap: 18,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    descriptionTxt: {
        marginTop: 5,
    },
    titleTxt: {
        fontWeight: "bold",
        fontSize: 24,
    },
    textView: {
        alignItems: "center",
        marginBottom: 10,
    },
    btnTxt: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    btn: {
        borderRadius: 50,
        padding: 14,
        width: "100%",
        alignItems: "center",
        marginTop: 5,
    },
    inputView: {
        width: "100%",
        flexDirection: "row",
        borderRadius: 50,
        paddingHorizontal: 18,
        paddingVertical: Platform.OS === 'ios' ? 12 : 4,
        alignItems: "center",
        gap: 10,
    },
    iconStyle: {
        alignSelf: 'center',
    },
    eyeIconStyle: {
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 110,
        height: 110,
        borderRadius: 25,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 15,
    },
    footerRow: {
        flexDirection: "row", 
        gap: 5, 
        alignItems: "center", 
        marginTop: 5
    }
});