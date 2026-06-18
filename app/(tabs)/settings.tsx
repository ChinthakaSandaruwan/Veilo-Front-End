import { Pressable, StyleSheet, Text, View, useColorScheme, Alert, Platform } from "react-native";
import { Colors, Fonts } from '../../constants/theme'; 
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Settings() {

    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const currentColors = Colors[colorScheme];

    async function handleLogout() {
        try {
            await AsyncStorage.removeItem('user');
            router.replace('/');
        } catch (error) {
            console.error("Logout error: ", error);
        }
    }

    function clearChats() {
        if (Platform.OS === 'web') {
            const consent = confirm("Are you sure you want to clear all your chats?");
            if (consent) performClearChats();
        } else {
            Alert.alert(
                "Confirm Clear",
                "Are you sure you want to clear all your chats?",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "OK", onPress: performClearChats }
                ]
            );
        }
    }

    async function performClearChats() {
        try {
            const userJson = await AsyncStorage.getItem('user');
            if (!userJson) return;
            const user = JSON.parse(userJson);
            const mobile = user.mobile;

            const apiUrl = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(apiUrl + "/chat/clear-all", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile })
            });

            if (response.ok) {
                if (Platform.OS === 'web') {
                    alert("All regular chats cleared successfully");
                } else {
                    Alert.alert("Success", "All regular chats cleared successfully");
                }
            } else {
                const data = await response.json();
                const msg = data.msg || "Unknown error";
                if (Platform.OS === 'web') {
                    alert("Error: " + msg);
                } else {
                    Alert.alert("Error", msg);
                }
            }
        } catch (error) {
            console.error("Clear chats error: ", error);
            if (Platform.OS === 'web') {
                alert("Something went wrong");
            } else {
                Alert.alert("Error", "Something went wrong");
            }
        }
    }

    function clearGhostChats() {
        if (Platform.OS === 'web') {
            const consent = confirm("Are you sure you want to clear all your ghost chats?");
            if (consent) performClearGhostChats();
        } else {
            Alert.alert(
                "Confirm Clear",
                "Are you sure you want to clear all your ghost chats?",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "OK", onPress: performClearGhostChats }
                ]
            );
        }
    }

    async function performClearGhostChats() {
        try {
            const userJson = await AsyncStorage.getItem('user');
            if (!userJson) return;
            const user = JSON.parse(userJson);
            const mobile = user.mobile;

            const apiUrl = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(apiUrl + "/ghost-chat/clear-all", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile })
            });

            if (response.ok) {
                if (Platform.OS === 'web') {
                    alert("All ghost chats cleared successfully");
                } else {
                    Alert.alert("Success", "All ghost chats cleared successfully");
                }
            } else {
                const data = await response.json();
                const msg = data.msg || "Unknown error";
                if (Platform.OS === 'web') {
                    alert("Error: " + msg);
                } else {
                    Alert.alert("Error", msg);
                }
            }
        } catch (error) {
            console.error("Clear ghost chats error: ", error);
            if (Platform.OS === 'web') {
                alert("Something went wrong");
            } else {
                Alert.alert("Error", "Something went wrong");
            }
        }
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background }]}> 
            <View style={styles.content}>
                
                {/* Clear Chats Button */}
                <Pressable 
                    style={[styles.clearChatBtn, { borderColor: colorScheme === 'dark' ? '#444' : '#ccc' }]}
                    onPress={clearChats}
                >
                    <Text style={[styles.clearChatTxt, { fontFamily: Fonts?.sans || 'System', color: currentColors.text }]}>
                        Clear All My Chats
                    </Text>
                </Pressable>


                 <Pressable 
                    style={[styles.clearChatBtn, { borderColor: colorScheme === 'dark' ? '#444' : '#ccc' }]}
                    onPress={clearGhostChats}
                >
                    <Text style={[styles.clearChatTxt, { fontFamily: Fonts?.sans || 'System', color: currentColors.text }]}>
                        Clear All My Ghost Chats
                    </Text>
                </Pressable>

                {/* Logout Button */}
                <Pressable 
                    style={[styles.logoutBtn, { backgroundColor: "#D32F2F" }]} 
                    onPress={handleLogout}
                >
                    <Text style={[styles.logoutBtnTxt, { fontFamily: Fonts?.sans || 'System' }]}>
                        Logout
                    </Text>
                </Pressable>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        gap: 16, 
    },
    logoutBtn: {
        borderRadius: 50,
        padding: 14,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        elevation: 2, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    logoutBtnTxt: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    clearChatBtn: {
        borderRadius: 50,
        padding: 14,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        backgroundColor: "transparent",
    },
    clearChatTxt: {
        fontSize: 16,
        fontWeight: "600",
    },
});