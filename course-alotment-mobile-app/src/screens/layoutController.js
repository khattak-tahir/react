import React from "react";
import { View } from "react-native";
import { Home } from "../layouts/home.layout";
import { Profile } from "../layouts/profile.layout";
import { Timetable } from "../layouts/timetable.layout";
import { useNavigation } from "../context/NavigationContext";
import TeachersScreen from '../HomeScreens/TeachersScreen';
import CoursesScreen from '../HomeScreens/CoursesScreen';
import ContactScreen from '../HomeScreens/ContactScreen';
import SettingsScreen from '../HomeScreens/SettingsScreen';

export const LayoutController = () => {
  const { currentPage } = useNavigation();

  return (
    <View>
      {currentPage === "home" && <Home />}
      {currentPage === "profile" && <Profile />}
      {currentPage === "timetable" && <Timetable />}
      {currentPage === 'teachers' && <TeachersScreen />}
      {currentPage === 'courses' && <CoursesScreen />}
      {currentPage === 'contact' && <ContactScreen />}
      {currentPage === 'settings' && <SettingsScreen />}
    </View>
  );
};

export default LayoutController;
