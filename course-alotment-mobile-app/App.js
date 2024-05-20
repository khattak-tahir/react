// import { StyleSheet } from "react-native";
import Login from "./src/screens/Login";
import Welcome from "./src/screens/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import main from "./src/screens/main";
import Verification from "./src/screens/Verification";
import { NavigationProvider } from "./src/context/NavigationContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <NavigationProvider>
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

        
  
        
      </Stack.Navigator>
      </NavigationProvider>
    </NavigationContainer>

   
  );
}


