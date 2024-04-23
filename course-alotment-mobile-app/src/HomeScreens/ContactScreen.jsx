import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {button1}from '../common/button';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    fetch('http://localhost:3306/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Message Sent', 'Thank you for contacting us!');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to send message. Please try again later.');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wavyBackground} />
      <Text style={styles.header}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message"
        value={message}
        onChangeText={text => setMessage(text)}
        multiline
        numberOfLines={4}
      />
      {/* <Button style={button1}  title="Send Message" onPress={handleSendMessage} /> */}
      <Text style={button1} onPress={handleSendMessage}>
            Send Message
          </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative', // Needed for absolute positioning of wavy background
  },
  wavyBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'green', // Set background color
    borderBottomLeftRadius: 200, // Adjust radius to create waves
    borderBottomRightRadius: 200, // Adjust radius to create waves
    zIndex: -1, // Ensure the background stays behind other content
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    zIndex: 1, // Ensure the text stays above the background
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white', // Set input background color
    zIndex: 1, // Ensure inputs stay above the background
  },
  messageInput: {
    height: 100,
  },
  
});

export default ContactUs;