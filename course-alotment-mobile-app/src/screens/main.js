import { StyleSheet, View } from "react-native";
import React from "react";
import { BottomNav } from "../common/bottomNavbar";
import { NavigationProvider } from "../context/NavigationContext";
import { LayoutController } from "./layoutController";

const Main = ({ navigation }) => {
  return (
    <NavigationProvider>
      <View style={styles.container}>
        <LayoutController />
        <BottomNav navigation={navigation} />
      </View>
      
    </NavigationProvider>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
