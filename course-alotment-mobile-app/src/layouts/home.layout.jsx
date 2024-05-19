import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import SVGWave from '../component/SVGWave';
import { useNavigation } from "../context/NavigationContext";
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    // marginTop: 0,
  },
  container1:{
    alignItems: "center",
    marginTop: 150,
  },
  card: {
    width: 200,
    height: 100,
    margin: 10,
    backgroundColor: "#1a8739",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    elevation:10,
    borderRadius: 18,
  },
  cardText: {
    fontSize: 20,
    color: "white",
  },
  svgCurve: {
    // position: 'absolute',
    width: width,
    
  },
});

export const Home = () => {
   const { navigateTo } = useNavigation();
  const digits = [
    { label: "Teachers", icon: "graduation-cap", screen: "teachers" },
    { label: "Courses", icon: "book", screen: "courses" },
    { label: "Contact Us", icon: "phone", screen: "contact" },
    { label: "Settings", icon: "cog", screen: "settings" }
  ];
  
  const handleCardPress = (screen) => {
    navigateTo(screen);
  };
  return (
    <View style={styles.container}>
      <SVGWave customStyles={styles.svgCurve} />

      <View style={styles.container1}>
        {digits.map(({ label, icon, screen }) => (
          <TouchableOpacity
            key={label}
            style={styles.card}
            onPress={() => handleCardPress(screen)}
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
