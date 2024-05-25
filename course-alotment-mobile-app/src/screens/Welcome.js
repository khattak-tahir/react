import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import welcomelogo from '../../assets/images/mainlogo.png';
import { RadioButton } from 'react-native-paper';

// import { useNavigation } from '@react-navigation/native';

const Welcome = ({ navigation }) => {
    const [role, setRole] = useState('');
    const handleContinue = () => {
        navigation.navigate('Login_Screen', { role });
    };
    return (
        <View style={styles.container}>
          <View style={styles.upperHalf}></View>
            <View style={styles.container1}>
                <Image style={[styles.logo]} source={welcomelogo} />
                <View style={styles.radioContainer}>
                    <View style={styles.radioOption}>
                        <RadioButton
                            value="teacher"
                            color='black'
                            status={role === 'teacher' ? 'checked' : 'unchecked'}
                            onPress={() => setRole('teacher')}
                        />
                        <Text style={styles.radioText}>Continue as Teacher</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton
                            value="student"
                            color='black'
                            status={role === 'student' ? 'checked' : 'unchecked'}
                            onPress={() => setRole('student')}
                        />
                        <Text style={styles.radioText}>Continue as Student</Text>
                    </View>
                </View>
                {role !== '' && (
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleContinue}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // height: '100%',
        // display: 'flex',
         backgroundColor: '#1a8739',
        flex:1,
        position:'relative',
    },
    upperHalf: {
      position: 'absolute',
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderRightWidth: 980,
      borderTopWidth: 550,
      borderRightColor: "transparent",
      borderTopColor: "black",
  },

    container1: {
        // display: 'flex',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    logo: {
        height: '60%',
        width: '180%',
        resizeMode: 'contain',
        alignItems:'center',
        marginBottom: 30,
    },

    radioContainer: {
        marginBottom: 30,
    },
   
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15, 
    },
    radioText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#ffffff',
    },
    continueButton: {
        backgroundColor: "#000",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    continueButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Welcome;
