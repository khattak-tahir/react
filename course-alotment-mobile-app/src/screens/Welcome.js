import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import welcomelogo from '../../assets/images/mainlogo.png';
import { RadioButton } from 'react-native-paper';

const Welcome = ({ navigation }) => {
    const [role, setRole] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image style={styles.logo} source={welcomelogo} />
                <View style={styles.radioContainer}>
                    <View style={styles.radioOption}>
                        <RadioButton
                            value="teacher"
                            color='green'
                            status={role === 'teacher' ? 'checked' : 'unchecked'}
                            onPress={() => setRole('teacher')}
                        />
                        <Text style={styles.radioText}>Continue as Teacher</Text>
                    </View>
                    <View style={styles.radioOption}>
                        <RadioButton
                            value="student"
                            color='green'
                            status={role === 'student' ? 'checked' : 'unchecked'}
                            onPress={() => setRole('student')}
                        />
                        <Text style={styles.radioText}>Continue as Student</Text>
                    </View>
                </View>
                {role !== '' && (
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => navigation.navigate('login', { role })}
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
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#000',
    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    logo: {
        height: '55%',
        width: '180%',
        resizeMode: 'contain',
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
        backgroundColor: "#1a8739",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    continueButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Welcome;
