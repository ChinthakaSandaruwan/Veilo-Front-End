import Octicons from '@expo/vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {

    const [chatData, setChatData] = useState();
    const [isRefresh, setIsRefresh] = useState(false);
    const [userName, setUserName] = useState("");
    const [userMobile, setUserMobile] = useState("");

    const router = useRouter();

    async function loadChats(mobile: string) {

        setIsRefresh(true);

        try {

            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            const response = await fetch(apiUrl + "/chat/get-chats?mobile=" + mobile);

            const data = await response.json();
            setIsRefresh(false);

            if (response.ok) {

                setChatData(data);

            } else {

                alert(response.status + " : " + data.msg);
            }

        } catch (err) {
            console.log(err);
        }

    }


    async function getUser() {

        const userString = await AsyncStorage.getItem("user");

        if (userString) {

            const userObj = JSON.parse(userString);
            setUserName(userObj.fname);
            setUserMobile(userObj.mobile);

            loadChats(userObj.mobile);

        }

    }

    useFocusEffect( ()=>{
        getUser();
    } );

    function timeFormat(time: string) {

        const formattedTime = new Date(time).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        return formattedTime;

    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerView}>
                <Text style={{ fontSize: 18 }}>{userName}</Text>
                <Octicons name="bell" size={20} color="#a1a1a1" />
            </View>

            <View style={styles.searchView}>
                <Octicons name="search" size={20} color="#a1a1a1" />
                <TextInput placeholder='Search' autoFocus={false} />
            </View>

            <FlatList
                data={chatData}
                renderItem={({ item }) => {
                    return (
                        <Pressable style={styles.chatView} onPress={() => {
                            router.push({
                                pathname: "/chat",
                                params: {
                                    chatId: item.last_message.chat_chat_id,
                                    userName: item.user.fname + " " + item.user.lname,
                                    userMobile: item.user.mobile

                                }
                            });
                        }}>
                            <Image
                                source={{ uri: item.user.img ? "http://192.168.8.155:3000"+item.user.img : "https://cdn-icons-png.flaticon.com/512/4140/4140073.png" }}
                                style={styles.profilePic}
                            />
                            <View style={{ gap: 3 }}>
                                <Text style={styles.nameTxt}>{item.user.fname + " " + item.user.lname}</Text>
                                <Text style={styles.msgTxt}>{item.last_message.message}</Text>
                            </View>
                            <Text style={styles.time}>{timeFormat(item.last_message.sent_at)}</Text>
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
        backgroundColor: "white",
        flex: 1
    },
    headerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    searchView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        paddingHorizontal: 15,
        borderRadius: 50,
        gap: 5,
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    chatView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingBottom: 15,
    },
    msgTxt: {
        fontSize: 14,
        color: "#a1a1a1"
    },
    nameTxt: {
        fontSize: 16,
        fontWeight: "600"
    },
    time: {
        flex: 1,
        textAlign: 'right',
        color: "#979797"
    }
});