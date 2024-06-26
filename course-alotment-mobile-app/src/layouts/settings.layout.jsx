import React, { useState, useEffect } from "react";
import { TouchableOpacity, Linking } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
// import { useRoute } from '@react-navigation/native';
// import { useNavigation } from '../context/NavigationContext';
// import { useNavigation } from '@react-navigation/native';
export const Settings = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  // const route = useRoute();
  // const { role } = route.params;
  const [captionIndex, setCaptionIndex] = useState(0); // State for current caption index
  const captions = [
    "Real-time updates for a dynamic academic experience.",
    "Effortless course management, anytime, anywhere.",
    "Stay ahead with real-time course updates.",
    "Optimize your timetable, maximize your potential.",
  ];

  useEffect(() => {
    // Automatically slide to the next caption after 0.5 seconds
    const interval = setInterval(() => {
      setCaptionIndex((prevIndex) =>
        prevIndex === captions.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [captionIndex]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  // const { navigateTo } = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  const handleSupportEmailPress = () => {
    const email = "tahirkhattak456@gmail.com"; // Replace this with the actual email address
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkModeContainer]}
    >
      {/* Container for heading and image */}
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, darkMode && styles.darkModeText]}>
          Settings
        </Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../component/setting2.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Container for settings fields */}
      <View
        style={[styles.settingsContainer, darkMode && styles.darkModeSettings]}
      >
        <View
          style={[
            styles.settingsContainer1,
            darkMode && styles.darkModeSettings,
          ]}
        >
          <View style={styles.setting}>
            <View style={styles.settingIcon}>
              <Icon
                name="user"
                size={20}
                color={darkMode ? "white" : "#1a8739"}
              />

              <Text
                style={[styles.settingLabel, darkMode && styles.darkModeText]}
              >
                Profile
              </Text>
            </View>
            <TouchableOpacity onPress={handleProfilePress}>
              <View style={styles.settingValueContainer}>
                <Text
                  style={[
                    styles.settingValue,
                    !darkMode && { color: "#525252" },
                  ]}
                >
                  Go to profile
                </Text>
                <View style={styles.iconarrow}>
                  <Icon name="chevron-right" size={12} color="#525252" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingIcon}>
              <Icon
                name="envelope"
                size={20}
                color={darkMode ? "white" : "#1a8739"}
              />
              <Text
                style={[styles.settingLabel, darkMode && styles.darkModeText]}
              >
                Support Email
              </Text>
            </View>
            <TouchableOpacity onPress={handleSupportEmailPress}>
              <View style={styles.settingValueContainer}>
                <Text style={styles.settingValue}>
                tahirkhattak456@gmail.com
                </Text>
                <View style={styles.iconarrow1}>
                  <Icon name="chevron-right" size={12} color="#525252" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingValueContainer1}>
              <View style={styles.textSizeContainer}>
                <Text
                  style={[styles.settingLabel, !darkMode && { color: "black" }]}
                >
                  Dark mode
                </Text>
                <View style={styles.switchButton}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={darkMode ? "#f5dd4b" : "#1a8739"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleDarkMode}
                    value={darkMode}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingIcon}>
              <Icon
                name="info-circle"
                size={20}
                color={darkMode ? "white" : "#1a8739"}
              />
              <Text
                style={[styles.settingLabel, darkMode && styles.darkModeText]}
              >
                About Us
              </Text>
            </View>
            <View style={styles.settingValueContainer}>
              <Text style={styles.sliderCaption}>{captions[captionIndex]}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerText}>PMAS ARID UNIVERSITY</Text>
        <Text style={styles.footerText1}>(UIIT)</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a8739",
  },
  headerContainer: {
    paddingLeft: 20,
    marginTop: 35,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black', // Default text color
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: "lightgray",
    borderTopLeftRadius: 80,
    borderBottomRightRadius: 80,
    padding: 20,
    height: 450,
    elevation: 20,
    borderColor: "#1a8739",
  },
  settingsContainer1: {
    flex: 1,
    backgroundColor: "lightgray",
    borderTopLeftRadius: 80,
    borderBottomRightRadius: 80,
    padding: 20,
    height: 450,
  },
  darkModeContainer: {
    backgroundColor: "black", // Background color for dark mode
  },
  darkModeSettings: {
    backgroundColor: "#333", // Background color for settings in dark mode
  },
  darkModeText: {
    color: "white", // Text color for dark mode
  },
  setting: {
    flexDirection: "column",
    marginBottom: 30,

    // marginTop:20,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  settingValueContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    elevation: 10,
  },
  settingValueContainer1: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 13,
    elevation: 10,
  },
  settingValue: {
    fontSize: 14,
    color: "#525252",
  },
  sliderCaption: {
    // marginTop: 10,
    fontSize: 16,
    color: "#525252",
  },
  textSizeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textSizeButton: {
    fontSize: 16,
    marginHorizontal: 8,
  },

  switchButton: {
    marginLeft: 120,
  },
  settingIcon: {
    // marginRight: ,
    flexDirection: "row",
  },
  iconarrow: {
    marginLeft: 160,
    marginTop: 4,
  },
  iconarrow1: {
    marginLeft: 58,
    marginTop: 4,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
    // marginBottom:60,
    height: 150,
    backgroundColor: "#000",
  },
  footerLine: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: "100%",
    marginBottom: 10,
  },
  footerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText1: {
    color: "white",
    fontSize: 16,
  },
});

export default Settings;
