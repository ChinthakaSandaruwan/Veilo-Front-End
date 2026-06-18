import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts } from '../constants/theme';

export default function GhostChat() {

    const [chatData, setChatData] = useState();
    const [isRefresh, setIsRefresh] = useState(false);
    const [userMobile, setUserMobile] = useState("");
    const [newChatMobile, setNewChatMobile] = useState("");

    const router = useRouter();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const colorScheme = useColorScheme() ?? 'light';
    const currentColors = Colors[colorScheme];

    async function loadChats(mobile: string) {
        setIsRefresh(true);
        try {
            const response = await fetch(apiUrl + "/ghost-chat/get-chats?mobile=" + mobile);
            const data = await response.json();
            setIsRefresh(false);

            if (response.ok) {
                setChatData(data);
            } else {
                alert(response.status + " : " + data.msg);
            }
        } catch (err) {
            console.log(err);
            setIsRefresh(false);
        }
    }

    async function getUser() {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
            const userObj = JSON.parse(userString);
            setUserMobile(userObj.mobile);
            loadChats(userObj.mobile);
        }
    }

    async function startGhostChat() {
        if (newChatMobile === "") return;

        try {
            const response = await fetch(apiUrl + "/ghost-chat/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_1: userMobile, user_2: newChatMobile })
            });

            const data = await response.json();

            if (response.ok || response.status === 200) {
                setNewChatMobile("");
                router.push({
                    pathname: "/ghost_chat_room",
                    params: { chatId: data.chat_id }
                });
            } else {
                alert(data.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getUser();
        }, [])
    );

    function timeFormat(time: string) {
        const formattedTime = new Date(time).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        return formattedTime;
    }

    const dynamicStyles = {
        container: {
            backgroundColor: currentColors.background,
        },
        text: {
            color: currentColors.text,
            fontFamily: Fonts.sans,
        },
        inputView: {
            backgroundColor: colorScheme === 'dark' ? '#242729' : '#f3f3f3',
        },
        searchInput: {
            color: currentColors.text,
            fontFamily: Fonts.sans,
            flex: 1,
        }
    };

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>

            <View style={styles.headerView}>
                <Pressable onPress={() => router.back()}>
                    <Entypo name="chevron-left" size={24} color={currentColors.text} />
                </Pressable>
                <MaterialCommunityIcons name="ghost-outline" size={22} color={currentColors.text} />
                <Text style={[styles.headerTitle, dynamicStyles.text]}>Ghost Chat</Text>
            </View>

            <View style={[styles.inputView, dynamicStyles.inputView]}>
                <Octicons name="search" size={20} color={currentColors.icon} />
                <TextInput
                    placeholder='Enter mobile to start ghost chat'
                    placeholderTextColor={currentColors.tabIconDefault}
                    style={dynamicStyles.searchInput}
                    value={newChatMobile}
                    onChangeText={setNewChatMobile}
                    keyboardType="phone-pad"
                />
                <Pressable onPress={startGhostChat}>
                    <MaterialCommunityIcons name="ghost" size={22} color={currentColors.tint} />
                </Pressable>
            </View>

            <FlatList
                data={chatData}
                keyExtractor={(item, index) => item.chat_id?.toString() || index.toString()}
                renderItem={({ item }) => {
                    const lastMsg = item.last_message;
                    return (
                        <Pressable style={styles.chatView} onPress={() => {
                            router.push({
                                pathname: "/ghost_chat_room",
                                params: { chatId: item.chat_id }
                            });
                        }}>
                            <View style={styles.ghostIcon}>
                                <MaterialCommunityIcons name="ghost-outline" size={30} color={currentColors.tabIconDefault} />
                            </View>
                            <View style={{ gap: 3, flex: 1 }}>
                                <Text style={[styles.nameTxt, { color: currentColors.text, fontFamily: Fonts.sans }]}>
                                    Anonymous
                                </Text>
                                <Text numberOfLines={1} style={[styles.msgTxt, { color: currentColors.tabIconDefault, fontFamily: Fonts.sans }]}>
                                    {lastMsg ? lastMsg.message : "No Messages Yet"}
                                </Text>
                            </View>
                            <Text style={[styles.time, { color: currentColors.tabIconDefault, fontFamily: Fonts.sans }]}>
                                {lastMsg ? timeFormat(lastMsg.sent_at) : ""}
                            </Text>
                        </Pressable>
                    );
                }}
                refreshing={isRefresh}
                onRefresh={() => {
                    if (userMobile) {
                        loadChats(userMobile);
                    }
                }}
            />

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        gap: 15,
        flex: 1
    },
    headerView: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        gap: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    inputView: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 50,
        gap: 10,
    },
    ghostIcon: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
    },
    chatView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingBottom: 15,
    },
    msgTxt: {
        fontSize: 14,
    },
    nameTxt: {
        fontSize: 16,
        fontWeight: "600"
    },
    time: {
        textAlign: 'right',
        fontSize: 12,
    }
});