// import { StyleSheet } from "react-native";
import Login from "./src/screens/Login";
import Welcome from "./src/screens/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import main from "./src/screens/main";
import Verification from "./src/screens/Verification";
import { NavigationProvider } from "./src/context/NavigationContext";

import { MyNativeStack } from "./src/navigation/NativeStack";
import { UserProvider } from './src/context/UserContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <MyNativeStack />
    </UserProvider>
  );
}


