import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationProvider } from '../context/NavigationContext';
import { LayoutController } from './layoutController';
import { BottomNav } from '../common/bottomNavbar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    // marginBottom: 60, // Adjust this value based on the height of your bottom navigation
  },
  navContainer: {
    height: 60, // Adjust this value based on the height of your bottom navigation
  },
});

const Main = ({ navigation }) => {


  return (
    <NavigationProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>

          <LayoutController />
        </View>
        <View style={styles.navContainer}>
          <BottomNav navigation={navigation} />
        </View>
      </SafeAreaView>
    </NavigationProvider>
  );
};

export default Main;
