import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";

export default function TabsLayout(){

    return(

        <Tabs screenOptions={{headerShown:false}}>
            <Tabs.Screen name="home" options={{
                tabBarLabel:"Home",
                tabBarIcon: ({color,size})=>{
                    return <AntDesign name="home" size={size} color={color} />
                }

            }}/>
            <Tabs.Screen name="profile" options={{
                tabBarLabel:"Profile",
                tabBarIcon: ({color,size})=>{
                    return <AntDesign name="user" size={size} color={color} />
                }
            }}/>
            <Tabs.Screen name="settings" options={{
                tabBarLabel:"Settings",
                tabBarIcon: ({color,size})=>{
                    return <AntDesign name="setting" size={size} color={color} />
                }
            }}/>
        </Tabs>
    
    );

}