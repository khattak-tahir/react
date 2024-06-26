import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useUser } from "../context/UserContext";



export const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user, role } = useUser(); // Use the useUser hook to get user and role


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const endpoint = role === "teacher" ? "/teachers" : "/students";
        const url = `http://192.168.225.85:3001${endpoint}`;
        console.log(`Fetching profile data from URL: ${url}`); // Log the URL

        const response = await axios.get(url);
        const data = response.data;
        console.log('Profile data fetched:', data);
        const userProfile = data.find(item => item.name === user.name);
        if (userProfile) {

        if (role === "teacher") {
          const { name, cnic, teacherid, qualification, gender } = userProfile;
          setProfileData({
            name,
            cnic,
            teacherId: teacherid,
            qualification,
            gender,
          });
        } else {
          const { name, cnic, aridno, degree, semester } = userProfile;
          setProfileData({
            name,
            cnic,
            aridno,
            degree,
            semester,
          });
        }
      }
      else{
        Alert.alert(
          "Error",
          "User profile not found."
        );
      }
    }
       catch (error) {
        console.error("Error fetching profile data:", error);
        Alert.alert(
          "Error",
          "Failed to fetch profile data. Please try again later."
        );
      }
    };

    if (role) {
      fetchProfileData();
    }
  }, [role,user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      console.log("Image picking cancelled");
    }
  };

  if (!profileData) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.container1}>
          <Text style={styles.text}>Details</Text>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={pickImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.avatar} />
              ) : (
                <Image
                  source={require("../component/avatar.png")}
                  style={styles.avatar}
                />
              )}
              <View style={styles.editIconContainer}>
                <AntDesign name="edit" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.designation}>
            ({role.charAt(0).toUpperCase() + role.slice(1)})
          </Text>
        </View>

        <View style={styles.container2}>
          <View style={styles.infoRow}>
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoField}>CNIC:</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <FontAwesome name="id-card" size={24} color="#1a8739" />
              <Text style={styles.infoText}>{profileData.cnic}</Text>
            </View>
          </View>
        
        <View style={styles.rowLine}></View>
        {role === 'student' ? (
          <>
          
            <View style={styles.infoRow}>
              <View style={styles.infoFieldContainer}>
                <Text style={styles.infoField}>Arid no:</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <MaterialCommunityIcons name="badge-account" size={24} color="#1a8739" />
                <Text style={styles.infoText}>{profileData.aridno}</Text>
              </View>
            </View>
            <View style={styles.rowLine}></View>
            <View style={styles.infoRow}>
              <View style={styles.infoFieldContainer}>
                <Text style={styles.infoField}>Degree:</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Ionicons name="school" size={24} color="#1a8739" />
                <Text style={styles.infoText}>{profileData.degree}</Text>
              </View>
            </View>
            <View style={styles.rowLine}></View>
            <View style={styles.infoRow}>
              <View style={styles.infoFieldContainer}>
                <Text style={styles.infoField}>Semester:</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Ionicons name="school" size={24} color="#1a8739" />
                <Text style={styles.infoText}>{profileData.semester}</Text>
              </View>
            </View>
            
          </>
          
        ) : (
          <>
            <View style={styles.infoRow}>
              <View style={styles.infoFieldContainer}>
                <Text style={styles.infoField}>Teacher ID:</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <MaterialCommunityIcons name="badge-account" size={24} color="#1a8739" />
                <Text style={styles.infoText}>{profileData.teacherid}</Text>
              </View>
            </View>
            <View style={styles.rowLine}></View>
            <View style={styles.infoRow}>
              <View style={styles.infoFieldContainer}>
                <Text style={styles.infoField}>Qualification:</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Ionicons name="school" size={24} color="#1a8739" />
                <Text style={styles.infoText}>{profileData.qualification}</Text>
              </View>
            </View>
            <View style={styles.rowLine}></View>
            <View style={styles.infoRow}>
              <View style={styles.infoFieldContainer}>
                <Text style={styles.infoField}>Gender:</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Ionicons name="school" size={24} color="#1a8739" />
                <Text style={styles.infoText}>{profileData.gender}</Text>
              </View>
            </View>
          </>
          
        )}
        </View>
        {/* Footer */}
        <View style={styles.footerLine}></View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>PMAS ARID University</Text>
          <Text style={styles.footercampusText}>(UIIT)</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  container1: {
    backgroundColor: "#1a8739",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomRightRadius: 80,
    width: "100%",
  },
  container2: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 80,
    width: "100%",
    marginTop: 30,
  },
  avatarContainer: {
    backgroundColor: "#c8e6c9",
    borderRadius: 75,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 3,
    borderColor: "#2c3e50",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 70,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginTop: 40,
    textAlign: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  designation: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "white", // Adjusted to apply background color to infoRow
    paddingHorizontal: 20, // Added paddingHorizontal for spacing
    paddingVertical: 10, // Added paddingVertical for spacing
    borderRadius: 10, // Added borderRadius for rounded corners
  },
  infoFieldContainer: {
    marginRight: 10,
    flex: 1,
    backgroundColor: "white", // Adjusted to apply background color to infoFieldContainer
  },
  infoField: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  infoTextContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white", // Adjusted to apply background color to infoTextContainer
  },
  infoText: {
    fontSize: 16,
    color: "#34495e",
    marginLeft: 10,
  },
  rowLine: {
    height: 1,
    backgroundColor: "#dcdcdc",
    marginVertical: 10,
  },
  footerLine: {
    height: 3,
    backgroundColor: "black",
    marginVertical: 10,
  },
  footerContainer: {
    backgroundColor: "#0000",
    alignItems: "center",
    paddingVertical: 5,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  footercampusText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default Profile;
