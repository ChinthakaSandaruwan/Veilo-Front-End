import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
    const colorScheme = useColorScheme() ?? 'light';
    const currentColors = Colors[colorScheme];

    return (
        <Tabs screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: currentColors.tabIconSelected,
            tabBarInactiveTintColor: currentColors.tabIconDefault,
            tabBarStyle: {
                backgroundColor: currentColors.background,
                borderTopColor: colorScheme === 'dark' ? '#2c2e30' : '#e5e5e5',
            }
        }}>

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