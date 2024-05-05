import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
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


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* First Container */}
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
          <Text style={styles.name}>Muhammad Tahir Hussain Khattak</Text>
          <Text style={styles.designation}>(Student)</Text>
        </View>

        {/* Second Container */}
        <View style={styles.container2}>
          <View style={styles.infoRow}>
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoField}>Email:</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <AntDesign name="mail" size={24} color="black" />
              <Text style={styles.infoText}>tahirkhattak456.com</Text>
            </View>
          </View>
          <View style={styles.rowLine}></View> 
          <View style={styles.infoRow}>
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoField}>Phone no:</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Feather name="phone" size={24} color="black" />
              <Text style={styles.infoText}>555-555-5555</Text>
            </View>
          </View>
          <View style={styles.rowLine}></View> 
          <View style={styles.infoRow}>
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoField}>Arid no: </Text>  
            </View>
            <View style={styles.infoTextContainer}>
              <MaterialCommunityIcons name="badge-account-outline" size={24} color="black" />
              <Text style={styles.infoText}>20-Arid-628</Text>
            </View>
          </View>
          <View style={styles.rowLine}></View> 
          <View style={styles.infoRow}>
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoField}>CNIC:</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <AntDesign name="idcard" size={24} color="black" />
              <Text style={styles.infoText}>123123123</Text>
            </View>
          </View>
          <View style={styles.rowLine}></View> 
          <View style={styles.infoRow}>
            <View style={styles.infoFieldContainer}>
              <Text style={styles.infoField}>Degree:</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Ionicons name="school-outline" size={24} color="black" />
              <Text style={styles.infoText}>BSCS 8/B (evening)</Text>
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
    backgroundColor: '#fff',
  },
  container1: {
    backgroundColor: 'green',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
    width: '100%',
  },
  container2: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  footerText: {
    fontSize: 16,
    color: '#2c3e50',
    marginTop: 10,
  },
  footercampusText: {
    fontSize: 16,
    color: '#2c3e50',
  },
});


