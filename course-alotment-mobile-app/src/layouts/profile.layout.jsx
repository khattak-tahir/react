// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const styles = StyleSheet.create({
//   centeredContainer: {
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     color: "black",
//   },
// });

// export const Profile = () => {
//   return (
//     <View style={styles.centeredContainer}>
//       <Text style={styles.text}>Profile</Text>
//     </View>
//   );
// };
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  standard: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  bio: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  contactLabel: {
    fontSize: 16,
    color: '#333',
    marginTop: 30,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008CBA',
    marginTop: 5,
  },
  emailLabel: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  emailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008CBA',
    marginTop: 5,
  },
});
export const Profile = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: Profile.image }} />
      <Text style={styles.name}>{Profile.name}</Text>
      <Text style={styles.standard}>STD-{Profile.standard} ({Profile.section})</Text>
      <Text style={styles.bio}>{Profile.bio}</Text>
      <Text style={styles.contactLabel}>Contact:</Text>
      <Text style={styles.contactValue}>{Profile.contact}</Text>
      <Text style={styles.emailLabel}>Email:</Text>
      <Text style={styles.emailValue}>{Profile.email}</Text>
      
    </View>
  );
};



