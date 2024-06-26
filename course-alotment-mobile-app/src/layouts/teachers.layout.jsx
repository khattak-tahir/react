import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";

const TeachersScreen = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://192.168.225.85:3001/teachers");
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Failed to fetch teachers: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={[styles.cell, styles.idCell]}>
        <Text style={styles.text}>{item.id}</Text>
      </View>
      <View style={[styles.cell, styles.nameCell]}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <View style={[styles.cell, styles.qualificationCell]}>
        <Text style={styles.text}>{item.qualification}</Text>
      </View>
      <View style={[styles.cell, styles.genderCell]}>
        <Text style={styles.text}>{item.gender}</Text>
      </View>
      <View style={[styles.cell, styles.courseCell]}>
        <ScrollView horizontal>
          <Text style={styles.courseText}>{JSON.stringify(item.courses)}</Text>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} horizontal={false}>
        <View>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>All Teachers</Text>
          </View>
        </View>
        <ScrollView horizontal={true}>
          <View>
            <View style={styles.row}>
              <View style={[styles.cell, styles.idCell]}>
                <Text style={styles.headerText}>ID</Text>
              </View>
              <View style={[styles.cell, styles.nameCell]}>
                <Text style={styles.headerText}>Name</Text>
              </View>
              <View style={[styles.cell, styles.qualificationCell]}>
                <Text style={styles.headerText}>Qualification</Text>
              </View>
              <View style={[styles.cell, styles.genderCell]}>
                <Text style={styles.headerText}>Gender</Text>
              </View>
              <View style={[styles.cell, styles.courseCell]}>
                <Text style={styles.headerText}>Course Code</Text>
              </View>
            </View>
            <FlatList
              data={teachers}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>PMAS ARID UNIVERSITY</Text>
        <Text style={styles.footerSubText}>(UIIT)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    backgroundColor: "green",
    padding: 20,
    paddingTop: 45,
    paddingLeft: 45,
    alignItems: 'flex-start',
    borderBottomLeftRadius: 60,
  },
  headingText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign:'center'
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  cell: {
    padding: 10,
    alignItems: "center",
    flex: 1,
  },
  idCell: {
    minWidth: 60,
    alignItems: "center",
  },
  nameCell: {
    minWidth: 150,
    alignItems: "center",
  },
  qualificationCell: {
    minWidth: 150,
    alignItems: "center",
  },
  genderCell: {
    minWidth: 100,
    alignItems: "center",
  },
  courseCell: {
    minWidth: 200,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    flexWrap: "wrap",
  },
  courseText: {
    // textAlign: 'left',
    textAlign: "center",

    flexWrap: "wrap",
  },
  footerContainer: {
    backgroundColor: "black",
    alignItems: "center",
    paddingVertical: 15,
    // borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  footerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  footerSubText: {
    color: "white",
    fontSize: 16,
  },
});

export default TeachersScreen;
