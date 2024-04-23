import { StyleSheet, View, Text } from "react-native";
import { Home } from "../layouts/home.layout";
import { Profile } from "../layouts/profile.layout";
import { Timetable } from "../layouts/timetable.layout";
import { TeachersScreen } from "../HomeScreens/TeachersScreen";
import { CoursesScreen } from "../HomeScreens/CoursesScreen";
import { ContactScreen } from "../HomeScreens/ContactScreen";
import { SettingsScreen } from "../HomeScreens/SettingsScreen";
// import { Feedback } from "../layouts/feedback.layout";
import { useNavigation } from "../context/NavigationContext";

export const LayoutController = () => {
  const { currentPage } = useNavigation();

  return (
    <View>
      {currentPage === "home" && <Home />}
      {currentPage === "profile" && <Profile />}
      {currentPage === "timetable" && <Timetable />}
      {currentPage === "teachers" && <TeachersScreen />}
      {currentPage === "courses" && <CoursesScreen />}
      {currentPage === "contact" && <ContactScreen />}
      {currentPage === "settings" && <SettingsScreen />}
      {/* {currentPage === "feedback" && <Feedback />} */}
    </View>
  );
};
