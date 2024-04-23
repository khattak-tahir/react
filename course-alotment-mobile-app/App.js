import { StyleSheet } from "react-native";
import Login from "./src/screens/Login";
// import Signup from "./src/screens/Signup";
import Welcome from "./src/screens/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import main from "./src/screens/main";
import Verification from "./src/screens/Verification";
import CoursesScreen from "./src/HomeScreens/CoursesScreen";
import TeachersScreen from "./src/HomeScreens/TeachersScreen"
import SettingsScreen from "./src/HomeScreens/SettingsScreen"
import ContactScreen from "./src/HomeScreens/ContactScreen"


// import { Feedback } from "./src/layouts/feedback.layout";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        /> */}

        <Stack.Screen
          name="main"
          component={main}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="verification"
          component={Verification}
          options={{
            headerShown: false,
          }}
        />

        {/* <Stack.Screen name="feedback" component={Feedback} /> */}
        
        <Stack.Screen
          name="TeachersScreen"
          component={TeachersScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CoursesScreen"
          component={CoursesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{
            headerShown: false,
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
