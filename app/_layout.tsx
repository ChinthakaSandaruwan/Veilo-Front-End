import { Stack } from "expo-router";

export default function RootLayout(){

    return(

        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="index" />
            <Stack.Screen name="signup"/>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="chat"/>
            <Stack.Screen name="ghost_chat"/>
            <Stack.Screen name="ghost_chat_room"/>
        </Stack>

    );

}