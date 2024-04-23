import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import SVGWave from '../component/SVGWave';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 120,
  },
  container1:{
    alignItems: "center",
    marginTop: 150,
  },
  card: {
    width: 200,
    height: 100,
    margin: 10,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 20,
    color: "white",
  },
  svgCurve: {
    position: 'absolute',
    width: width,
  },
});

export const Home = ({ navigation }) => {
  const digits = [
    { label: "Teachers", icon: "graduation-cap", screen: "TeachersScreen" },
    { label: "Courses", icon: "book", screen: "CoursesScreen" },
    { label: "Contact Us", icon: "contact", screen: "ContactScreen" },
    { label: "Settings", icon: "cog", screen: "SettingsScreen" }
  ];

  return (
    <View style={styles.container}>
      <SVGWave customStyles={styles.svgCurve} />
      <View style={styles.container1}>
        {digits.map(({ label, icon, screen }) => (
          <TouchableOpacity
            key={label}
            style={styles.card}
            onPress={() => navigation.navigate(screen)}
          >
            <Icon name={icon} size={30} color="white" />
            <Text style={styles.cardText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Home;
