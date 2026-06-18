import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts } from '../constants/theme';

export default function Signup() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const systemFont = Fonts?.sans || 'normal';

    async function signupRequest() {
        if (fname !== "" && lname !== "" && mobile !== "" && password !== "") {
            const data = {
                fname: fname,
                lname: lname,
                mobile: mobile,
                password: password
            };

            try {
                const apiUrl = process.env.EXPO_PUBLIC_API_URL;
                const response = await fetch(apiUrl + "/user/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const resData = await response.json();
                alert(response.status + " : " + resData.msg);
            } catch (err) {
                console.log(err);
            }
        }
    }

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
                        <Text style={[styles.titleTxt, { color: theme.text, fontFamily: systemFont }]}>Register</Text>
                        <Text style={[styles.descriptionTxt, { color: theme.icon, fontFamily: systemFont }]}>Please register to login.</Text>
                    </View>

                    <View style={[styles.inputView, { backgroundColor: colorScheme === 'dark' ? '#25282a' : '#ececec' }]}>
                        <AntDesign name="user-add" size={20} color={theme.icon} style={styles.iconStyle} />
                        <TextInput 
                            style={[styles.input, { color: theme.text, fontFamily: systemFont }]} 
                            placeholder='Enter your First Name' 
                            placeholderTextColor={theme.icon}
                            onChangeText={setFname} 
                        />
                    </View>

                    <View style={[styles.inputView, { backgroundColor: colorScheme === 'dark' ? '#25282a' : '#ececec' }]}>
                        <AntDesign name="user-add" size={20} color={theme.icon} style={styles.iconStyle} />
                        <TextInput 
                            style={[styles.input, { color: theme.text, fontFamily: systemFont }]} 
                            placeholder='Enter your Last Name' 
                            placeholderTextColor={theme.icon}
                            onChangeText={setLname} 
                        />
                    </View>

                    <View style={[styles.inputView, { backgroundColor: colorScheme === 'dark' ? '#25282a' : '#ececec' }]}>
                        <AntDesign name="user-add" size={20} color={theme.icon} style={styles.iconStyle} />
                        <TextInput 
                            style={[styles.input, { color: theme.text, fontFamily: systemFont }]} 
                            placeholder='Enter your Mobile' 
                            placeholderTextColor={theme.icon}
                            keyboardType="phone-pad"
                            onChangeText={setMobile} 
                        />
                    </View>

                    <View style={[styles.inputView, { backgroundColor: colorScheme === 'dark' ? '#25282a' : '#ececec' }]}>
                        <MaterialIcons name="lock-outline" size={22} color={theme.icon} style={styles.iconStyle} />
                        <TextInput 
                            style={[styles.input, { color: theme.text, fontFamily: systemFont }]} 
                            placeholder='Enter your Password' 
                            placeholderTextColor={theme.icon}
                            secureTextEntry
                            onChangeText={setPassword} 
                        />
                    </View>

                    <Pressable style={[styles.btn, { backgroundColor: theme.tint }]} onPress={signupRequest}>
                        <Text style={[styles.btnTxt, { fontFamily: systemFont, color: colorScheme === 'dark' ? '#151718' : 'white' }]}>Sign Up</Text>
                    </Pressable>

                    <View style={styles.footerRow}>
                        <Text style={{ color: theme.icon, fontFamily: systemFont }}>{"Already have an account?"}</Text>
                        <Pressable style={{ height: 30 }} onPress={() => router.back()}>
                            <Text style={{ fontWeight: "bold", fontSize: 15, color: theme.tint, fontFamily: systemFont }} >Sign In</Text>
                        </Pressable>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
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
        gap: 16,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 20,
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