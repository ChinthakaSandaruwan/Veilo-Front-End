import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";

export default function TabLayout() {

    return (
        <Tabs screenOptions={{ headerShown: false }}>

            <Tabs.Screen name="home" options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => {
                    return (
                        <MaterialIcons name="home" size={size} color={color} />
                    );
                }
            }} />

            <Tabs.Screen name="profile" options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => {
                    return (
                        <FontAwesome name="user-circle-o" size={size} color={color} />
                    );
                }
            }} />

            <Tabs.Screen name="settings" options={{
                tabBarLabel: "Settings",
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Ionicons name="settings-sharp" size={size} color={color} />
                    );
                }
            }} />

        </Tabs>
    );

}