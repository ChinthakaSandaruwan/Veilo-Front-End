import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <SafeAreaView style={style.container}>
            {/* Header */}
            <View style={style.headerView}>
                <Text style={style.userNameText}>User Name </Text>
                {/* Bell icon */}
                <AntDesign name="bell" size={20} color={"#a1a1a1"} />
            </View>

            {/* Search Bar */}
            <View style={style.searchBarView}>
                <AntDesign name="search" size={20} color={"#a1a1a1"} />
                <TextInput placeholder="Search" style={style.searchInput} autoFocus={false} />
            </View>

            {/* Chat Item View */}
            <View style={style.chatView}>
                {/* Profile Picture */}
                <Image 
                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} 
                    style={style.profilePicture} 
                />
                
                {/* Center Content: Name and Message stacked vertically */}
                <View style={style.chatMiddleContent}>
                    <Text style={style.chatUserNameText} numberOfLines={1}>Pabasara Bathrajith</Text>
                    <Text style={style.userReceivedMessageText} numberOfLines={1}>Hi Chinthaka How Are You?</Text>
                </View>

                {/* Right Content: Time stamp */}
                <View style={style.chatRightContent}>
                    <Text style={style.timeText}>10:30 PM</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userNameText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchBarView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,
        height: 40,
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: "#9e9e9e50"
    },
    searchInput: {
        flex: 1,
        height: '100%',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    chatView: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chatMiddleContent: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    chatUserNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    userReceivedMessageText: {
        color: "#666666",
        fontSize: 14,
        marginTop: 4,
    },
    chatRightContent: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginLeft: 10,
    },
    timeText: {
        color: "#999999",
        fontSize: 12,
    }
});
