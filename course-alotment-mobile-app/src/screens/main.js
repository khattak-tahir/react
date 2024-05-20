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
  },
  navContainer: {
    height: 60,
  },
});

const Main = () => {
  return (
    <NavigationProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Stack.Navigator>
            <Stack.Screen
              name="LayoutController"
              component={LayoutController}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </View>
        <View style={styles.navContainer}>
          <BottomNav />
        </View>
      </SafeAreaView>
    </NavigationProvider>
  );
};

export default Main;
