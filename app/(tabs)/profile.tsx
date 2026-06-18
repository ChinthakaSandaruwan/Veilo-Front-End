import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {

    const [profileImage, setProfileImage] = useState("");
    const [fname,setFname] = useState("");
    const [lname,setlname] = useState("");
    const [password,setPassword] = useState("");
    const [mobile,setMobile] = useState("");

    useEffect(()=>{
        getUserData();
    },[]);

    async function getUserData(){
        const userJson = await AsyncStorage.getItem("user");
        
        if(userJson){
            const user = JSON.parse(userJson);
            setFname(user.fname);
            setlname(user.lname);
            setPassword(user.password);
            setMobile(user.mobile);
        }

    }

    async function imagePick() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
        });

        if(!result.canceled){

            const uri = result.assets[0].uri;
            setProfileImage(uri);

        }

    }

    async function update(){

        const formData = new FormData();

        formData.append("fname",fname);
        formData.append("lname",lname);
        formData.append("password",password);
        formData.append("mobile",mobile);

        formData.append("image",{

            uri:profileImage,
            name:"profile.jpg",
            type:"image/jpeg"
            
        } as any );

        
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;

        const response = await fetch("http://192.168.8.155:3000/user/update",{
            method:"POST",
            body: formData,
        });

        const data = await response.json();

        console.log(data);

    }

    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 18, alignItems: "center" }}>

                    <Pressable onPress={imagePick}>
                        <Image
                            source={{ uri: (profileImage) ? profileImage : "https://cdn-icons-png.flaticon.com/512/4140/4140073.png" }}
                            style={styles.img}
                        />
                    </Pressable>

                    <View style={styles.textView}>
                        <Text style={styles.titleTxt}>{mobile}</Text>
                    </View>

                    <View style={styles.inputView}>
                        <AntDesign name="user-add" size={20} color="#696969" />
                        <TextInput style={styles.input} value={fname} onChangeText={setFname}/>
                    </View>

                    <View style={styles.inputView}>
                        <AntDesign name="user-add" size={20} color="#696969" />
                        <TextInput style={styles.input} value={lname} onChangeText={setlname}/>
                    </View>

                    <View style={styles.inputView}>
                        <MaterialIcons name="lock-outline" size={22} color="#696969" />
                        <TextInput style={styles.input} value={password} onChangeText={setPassword}/>
                    </View>

                    <Pressable style={[styles.btn, { marginTop: 30 }]} onPress={() => {
                        update();
                    }}>
                        <Text style={styles.btnTxt}>Update</Text>
                    </Pressable>

                    <Pressable style={[styles.btn, { backgroundColor: "red" }]} onPress={() => {

                    }}>
                        <Text style={styles.btnTxt}>Logout</Text>
                    </Pressable>



                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({

    descriptionTxt: {
        color: "#707070",
        marginTop: 5,
    },

    titleTxt: {
        fontWeight: "bold",
        fontSize: 22,
    },

    textView: {
        alignItems: "center",
        marginBottom: 20,
    },

    btnTxt: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    btn: {
        backgroundColor: "#0066ff",
        borderRadius: 50,
        padding: 10,
        width: "100%",
        alignItems: "center",
    },
    inputView: {
        width: "100%",
        height: "auto",
        flexDirection: "row",
        backgroundColor: "#ececec",
        borderRadius: 50,
        paddingHorizontal: 18,
        paddingVertical: 8,
        justifyContent: "center",
        gap: 5,
    },

    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",
        gap: 18,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    input: {
        width: "90%",
        padding: 5,
    },
});