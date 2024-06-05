import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  ScrollView,
} from "react-native";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    const recipientEmail = "tahirkhattak456@gmail.com";
    const subject = "New Message from " + name;
    const body =
      "Name: " + name + "\nEmail: " + email + "\nMessage: " + message;
    const mailTo = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    Linking.openURL(mailTo)
      .then(() => {
        // Email app opened
        console.log("Email app opened");
      })
      .catch((err) => {
        // Error handling
        console.error("Failed to open email app:", err);
        Alert.alert(
          "Error",
          "Failed to open email app. Please ensure that you have an email app installed and configured on your device."
        );
      });
  };

  const openWebsite = () => {
    const websiteURL = "http://www.uaar.edu.pk";
    Linking.openURL(websiteURL)
      .then(() => {
        // Website opened
        console.log("Website opened");
      })
      .catch((err) => {
        // Error handling
        console.error("Failed to open website:", err);
        Alert.alert("Error", "Failed to open website. Please try again later.");
      });
  };

  const openEmail = () => {
    const emailAddress = "cms@uaar.edu.pk";
    Linking.openURL(`mailto:${emailAddress}`)
      .then(() => {
        // Email app opened
        console.log("Email app opened");
      })
      .catch((err) => {
        // Error handling
        console.error("Failed to open email app:", err);
        Alert.alert(
          "Error",
          "Failed to open email app. Please ensure that you have an email app installed and configured on your device."
        );
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.blackTop}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../component/contact4.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="person"
                size={24}
                color="#1a8739"
                style={styles.icon}
              />
              <Text style={styles.label}>Name</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="email"
                size={24}
                color="#1a8739"
                style={styles.icon}
              />
              <Text style={styles.label}>Email</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="message"
                size={24}
                color="#1a8739"
                style={styles.icon}
              />
              <Text style={styles.label}>Message</Text>
            </View>
            <TextInput
              style={styles.messageInput}
              placeholder="Message"
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={sendEmail}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.contactText}>Contact Us</Text>
          <TouchableOpacity style={styles.footerItem} onPress={openEmail}>
            <MaterialIcons name="email" size={24} color="#1a8739" />
            <Text
              style={[styles.footerText, { textDecorationLine: "underline" }]}
            >
              cms@uaar.edu.pk
            </Text>
          </TouchableOpacity>
          <View style={styles.footerItem}>
            <FontAwesome name="phone" size={24} color="#1a8739" />
            <Text style={styles.footerText}>
              +92-51-9292195, +92-51-9062301{" "}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <MaterialIcons name="location-on" size={24} color="#1a8739" />
            <Text style={styles.footerText}>
              PMAS-Arid Agriculture University Rawalpindi, Shamsabad, Muree Road
              Rawalpindi - Pakistan.{" "}
            </Text>
          </View>
          <TouchableOpacity style={styles.footerItem} onPress={openWebsite}>
            <FontAwesome name="globe" size={24} color="#1a8739" />
            <Text
              style={[styles.footerText, { textDecorationLine: "underline" }]}
            >
              www.uaar.edu.pk
            </Text>
          </TouchableOpacity>
          <View style={styles.footerLine}></View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerEndText}>PMAS ARID University</Text>
            <Text style={styles.footercampusText}>(UIIT)</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a8739",
  },
  blackTop: {
    backgroundColor: "#1a8739",
    width: "100%",
    height: 300,
    alignItems: "center",
    borderRadius: 10,
  },
  imageContainer: {
    backgroundColor: "#1a8739",
    width: "100%",
    height: 300,
    marginTop: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    flex: 1,
    height: 250,
    width: 300,
    zIndex: 0,
  },
  formWrapper: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 80,
    borderBottomRightRadius: 80,
    elevation: 20,
    borderColor: "black",
    padding: 50,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#2c3e50",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 6,
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 120,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
    paddingTop: 10,
    elevation: 6,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1a8739",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
  footer: {
    backgroundColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 30,
    borderTopLeftRadius: 80,
    height: 400,
  },
  contactText: {
    textAlign: "center",
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    marginLeft: 10,
  },
  footerText: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
  footerLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 20,
  },
  footerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  footerEndText: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
  footercampusText: {
    fontSize: 16,
    color: "white",
  },
});

export default Contact;
