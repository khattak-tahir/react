import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const CoursesScreen = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://192.168.225.85:3001/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses: ", error);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>All Courses</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Course Code</Text>
        <Text style={styles.headerText}>Description</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.text}>{item.id}</Text>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.course_code}</Text>
      <Text style={styles.text}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>PMAS ARID UNIVERSITY</Text>
        <View style={styles.uiitContainer}>
          <Text style={styles.uiitText}>(UIIT)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    // flex:0.5,
    backgroundColor: "green",
  },
  heading: {
    backgroundColor: "green",
    marginTop: 35,
    padding: 10,
    alignItems: "center",
  },
  headingText: {
    color: 'black',
    fontSize: 27,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  text: {
    flex: 1,
    textAlign: "center",
  },
  footer: {
    backgroundColor: "black",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
  },
  footerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  uiitContainer: {
    backgroundColor: "black",
  },
  uiitText: {
    color: "white",
    fontSize: 18,
  },
});

export default CoursesScreen;
