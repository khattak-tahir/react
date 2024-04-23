import { StyleSheet } from "react-native";
import Login from "./src/screens/Login";
// import Signup from "./src/screens/Signup";
import Welcome from "./src/screens/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import main from "./src/screens/main";
import Verification from "./src/screens/Verification";
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
