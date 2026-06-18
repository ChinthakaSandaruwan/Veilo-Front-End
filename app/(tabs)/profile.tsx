import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useColorScheme, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts } from '../../constants/theme';

export default function Profile() {
    const [profileImage, setProfileImage] = useState("");
    const [hasNewImage, setHasNewImage] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setlname] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [isRefresh, setIsRefresh] = useState(false);

    // Detect system light or dark mode setting
    const colorScheme = useColorScheme() ?? 'light';
    const currentColors = Colors[colorScheme];

    useEffect(() => {
        getUserData();
    }, []);

    async function handleRefresh() {
        setIsRefresh(true);
        await getUserData();
        setIsRefresh(false);
    }

    async function getUserData() {
        const userJson = await AsyncStorage.getItem("user");
        if (userJson) {
            const user = JSON.parse(userJson);
            setFname(user.fname);
            setlname(user.lname);
            setPassword(user.password);
            setMobile(user.mobile);
            if (user.profile_picture && !user.profile_picture.endsWith("/undefined") && !user.profile_picture.endsWith("/null")) {
                const apiUrl = process.env.EXPO_PUBLIC_API_URL;
                setProfileImage(apiUrl + user.profile_picture);
            }
        }
    }

    async function imagePick() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setProfileImage(uri);
            setHasNewImage(true);
        }
    }

    async function update() {
        const formData = new FormData();
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("password", password);
        formData.append("mobile", mobile);

        if (hasNewImage && profileImage) {
            formData.append("image", {
                uri: profileImage,
                name: "profile.jpg",
                type: "image/jpeg"
            } as any);
        }

        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        try {
            const response = await fetch(apiUrl + "/user/update", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            if (response.ok && data.msg === "success") {
                const userJson = await AsyncStorage.getItem("user");
                if (userJson) {
                    const user = JSON.parse(userJson);
                    user.fname = fname;
                    user.lname = lname;
                    user.password = password;
                    if (data.data) {
                        user.profile_picture = data.data;
                    }
                    await AsyncStorage.setItem("user", JSON.stringify(user));
                    alert("Profile updated successfully!");
                }
            } else {
                alert("Update failed: " + (data.msg || "Unknown error"));
            }
        } catch (err) {
            console.log("Update failed:", err);
            alert("Something went wrong");
        }
    }

    // Runtime styles computed dynamically based on the current theme mode
    const dynamicStyles = {
        container: {
            backgroundColor: currentColors.background,
        },
        text: {
            color: currentColors.text,
            fontFamily: Fonts.sans,
        },
        inputContainer: {
            backgroundColor: colorScheme === 'dark' ? '#242729' : '#ececec',
        },
        input: {
            color: currentColors.text,
            fontFamily: Fonts.sans,
        },
        updateButton: {
            backgroundColor: currentColors.tint,
        }
    };

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, width: "100%" }}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefresh}
                            onRefresh={handleRefresh}
                            colors={[currentColors.tint]}
                            tintColor={currentColors.tint}
                        />
                    }
                >

                    <Pressable onPress={imagePick}>
                        <Image
                            source={{ uri: (profileImage && !profileImage.endsWith("/undefined") && !profileImage.endsWith("/null")) ? profileImage : "https://img.icons8.com/ios-filled/50/user-male-circle.png" }}
                            style={styles.img}
                        />
                    </Pressable>

                    <View style={styles.textView}>
                        <Text style={[styles.titleTxt, dynamicStyles.text]}>{mobile}</Text>
                    </View>

                    <View style={[styles.inputView, dynamicStyles.inputContainer]}>
                        <AntDesign name="user-add" size={20} color={currentColors.icon} />
                        <TextInput 
                            style={[styles.input, dynamicStyles.input]} 
                            value={fname} 
                            onChangeText={setFname}
                            placeholder="First Name"
                            placeholderTextColor={currentColors.tabIconDefault}
                        />
                    </View>

                    <View style={[styles.inputView, dynamicStyles.inputContainer]}>
                        <AntDesign name="user-add" size={20} color={currentColors.icon} />
                        <TextInput 
                            style={[styles.input, dynamicStyles.input]} 
                            value={lname} 
                            onChangeText={setlname}
                            placeholder="Last Name"
                            placeholderTextColor={currentColors.tabIconDefault}
                        />
                    </View>

                    <View style={[styles.inputView, dynamicStyles.inputContainer]}>
                        <MaterialIcons name="lock-outline" size={22} color={currentColors.icon} />
                        <TextInput 
                            style={[styles.input, dynamicStyles.input]} 
                            value={password} 
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholder="Password"
                            placeholderTextColor={currentColors.tabIconDefault}
                        />
                    </View>

                    <Pressable 
                        style={[styles.btn, dynamicStyles.updateButton, { marginTop: 20 }]} 
                        onPress={update}
                    >
                        <Text style={[styles.btnTxt, { fontFamily: Fonts.sans, color: colorScheme === 'dark' ? '#151718' : 'white' }]}>Update</Text>
                    </Pressable>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        flexGrow: 1, 
        gap: 18, 
        alignItems: "center",
        justifyContent: "center", // This centers the elements vertically
        paddingVertical: 20
    },
    titleTxt: {
        fontWeight: "bold",
        fontSize: 22,
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
        padding: 12,
        width: "100%",
        alignItems: "center",
    },
    inputView: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 50,
        paddingHorizontal: 18,
        paddingVertical: Platform.OS === 'ios' ? 12 : 4,
        gap: 10,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    input: {
        flex: 1,
        paddingHorizontal: 5,
        fontSize: 16,
    },
});