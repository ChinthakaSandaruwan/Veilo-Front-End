import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors"; // Ensure the path to your Colors file is correct

export default function signUp() {

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function signupRequest() {

    if(fname!="" && lname!="" && mobile!="" && password!=""){

      const data = {
        fname: fname,
        lname: lname,
        mobile: mobile,
        password: password,
      };

      try {
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        const response = await fetch(apiUrl+'/user/signUp', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const resData = await response.json();
          alert(response.status + " " + resData.msg);
          router.back();
          
        } else {
          const resData = await response.json();
          alert(response.status + " " + resData.msg);
        }

      } catch (error) {
        console.log(error);
      }

    } else {
      alert("Please fill all the fields");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.img}
          />

          <View style={styles.textView}>
            <Text style={styles.titleTxt}>Register</Text>
            <Text style={styles.descriptionTxt}>Please register to login.</Text>
          </View>

          <View style={styles.inputView}>
            <AntDesign name="user" size={20} color={Colors.light.secondary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your First Name"
              placeholderTextColor={Colors.brand.denim}
              onChangeText={setFname}
            />
          </View>

          <View style={styles.inputView}>
            <AntDesign name="user" size={20} color={Colors.light.secondary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your Last Name"
              placeholderTextColor={Colors.brand.denim}
              onChangeText={setLname}
            />
          </View>

          <View style={styles.inputView}>
            <AntDesign name="phone" size={20} color={Colors.light.secondary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your Mobile"
              placeholderTextColor={Colors.brand.denim}
              onChangeText={setMobile}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputView}>
            <MaterialIcons name="lock-outline" size={22} color={Colors.light.secondary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your Password"
              placeholderTextColor={Colors.brand.denim}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <Pressable
            style={styles.btn}
            onPress={() => {
              signupRequest();
            }}
          >
            <Text style={styles.btnTxt}>Sign Up</Text>
          </Pressable>

          <View style={styles.footerRow}>
            <Text style={styles.footerTxt}>Already have an account?</Text>
            <Pressable
              style={{ height: 30 }}
              onPress={() => {
                router.back();
              }}
            >
              <Text style={styles.signInTxt}>Sign In</Text>
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
    backgroundColor: Colors.light.background, // Canvas background light blue tone (#caf0f8)
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
    color: Colors.light.secondary, // Denim tint for readable, secondary text mapping
    marginTop: 5,
  },
  titleTxt: {
    fontWeight: "bold",
    fontSize: 22,
    color: Colors.light.text, // Deep Navy (#003049)
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
    backgroundColor: Colors.light.primary, // Brand primary royal blue (#0077b6)
    borderRadius: 50,
    padding: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  inputView: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: Colors.light.card, // Card surface color pure white (#ffffff)
    borderColor: Colors.light.border, // Pale blue border accentuation
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
    color: Colors.light.text, // User-typed text displays in deep navy
  },
  footerRow: {
    flexDirection: "row", 
    gap: 10, 
    marginTop: 10,
  },
  footerTxt: {
    color: Colors.light.secondary,
  },
  signInTxt: {
    fontWeight: "bold", 
    fontSize: 15,
    color: Colors.light.primary, // Formatted the 'Sign In' fallback text highlight link color
  }
});