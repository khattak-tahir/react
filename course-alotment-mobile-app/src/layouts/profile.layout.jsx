import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Profile = ({ route }) => {
  const [profileData, setProfileData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { role } = route.params;

  const fetchProfileData = async () => {
    const endpoint = role === 'teacher' ? 'teachers' : 'students';
    try {
      const response = await fetch(`http://192.168.242.85:3001/${endpoint}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const pickImage = async () => {
    console.log("Pick image function called");
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
                <Image source={require('../component/avatar.png')} style={styles.avatar} />
              )}
              <View style={styles.editIconContainer}>
                <AntDesign name="edit" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.designation}>({role.charAt(0).toUpperCase() + role.slice(1)})</Text>
        </View>

        <View style={styles.container2}>
          <View style={styles.infoRow}>
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoField}>Email:</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Ionicons name="mail" size={24} color="#1a8739" />
              <Text style={styles.infoText}>{profileData.email}</Text>
            </View>
          </View>
          <View style={styles.rowLine}></View>
          <View style={styles.infoRow}>
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoField}>Phone no:</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <FontAwesome name="phone" size={24} color="#1a8739" />
              <Text style={styles.infoText}>{profileData.phone}</Text>
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
                  <Text style={styles.infoText}>{profileData.aridNo}</Text>
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
                  <Text style={styles.infoField}>Year:</Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Ionicons name="calendar" size={24} color="#1a8739" />
                  <Text style={styles.infoText}>{profileData.year}</Text>
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
                  <Text style={styles.infoText}>{profileData.teacherId}</Text>
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
                  <Text style={styles.infoField}>Department:</Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <Ionicons name="briefcase" size={24} color="#1a8739" />
                  <Text style={styles.infoText}>{profileData.department}</Text>
                </View>
              </View>
            </>
          )}
          <View style={styles.rowLine}></View>
          <View style={styles.infoRow}>
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoField}>CNIC:</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <FontAwesome name="id-card" size={24} color="#1a8739" />
              <Text style={styles.infoText}>{profileData.cnic}</Text>
            </View>
          </View>
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
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  container1: {
    backgroundColor: '#1a8739',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomRightRadius: 80,
    width: '100%',
  },
  container2: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 80,
    width: '100%',
    marginTop: 30,
  },
  avatarContainer: {
    backgroundColor: '#c8e6c9',
    borderRadius: 75,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#2c3e50',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 70,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginTop: 40,
    textAlign: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  designation: {
    fontSize: 18,
    color: 'black',
  },
  infoRow: {
    marginBottom: 10,
    marginTop: 20,
  },
  infoField: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoTextContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#2c3e50',
    marginLeft: 10,
  },
  rowLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  footerLine: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  footerText: {
    fontSize: 16,
    color: 'white',
  },
  footercampusText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Profile;
