import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
// import { useNavigation } from "../context/NavigationContext";
import { useNavigation } from "@react-navigation/native";
// import Icon from 'react-native-vector-icons/FontAwesome';
import SVGWave from '../component/SVGWave';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 165,
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
    elevation: 10,
    borderRadius: 18,
  },
  cardText: {
    fontSize: 20,
    color: "white",
  },
  svgCurve: {
    width: width,
  },
});

export const Home = () => {
 const navigation= useNavigation();
  return (
    <View style={styles.container}>
      <SVGWave customStyles={styles.svgCurve} />
      <View style={styles.cardContainer}>
        
          <TouchableOpacity
            
            style={styles.card}
            onPress={() => navigation.navigate('Teachers_Screen')}
          >
            
            <FontAwesome5 name="chalkboard-teacher" size={32} color="white" />
            <Text style={styles.cardText}>Teachers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            
            style={styles.card}
            onPress={() => navigation.navigate('Courses_Screen')}
          >
           
            <FontAwesome name="book" size={34} color="white" />
            <Text style={styles.cardText}>Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            
            style={styles.card}
            onPress={() => navigation.navigate('Contact_Screen')}
          >
           
            <MaterialIcons name="contact-support" size={38} color="white" />
            <Text style={styles.cardText}>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            
            style={styles.card}
            onPress={() => navigation.navigate('Settings_Screen')}
          >
            <Ionicons name="settings-sharp" size={34} color="white" />
            <Text style={styles.cardText}>Settings</Text>
          </TouchableOpacity>
       
      </View>
    </View>
  );
};

export default Home;
