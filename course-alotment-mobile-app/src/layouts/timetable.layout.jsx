import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import TimeTable from "@mikezzb/react-native-timetable";
import { useUser } from "../context/UserContext";

const styles = StyleSheet.create({
  centeredContainer: {
    height: "100%",
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  timetableContainer: {
    marginTop: 40,
  },
  text: {
    color: "black",
  },
});

export const Timetable = () => {
  const { user, role } = useUser();
  const [data, setData] = useState(null);

  const fetchStudentData = async () => {
    try {
      const response = await fetch(
        `http://192.168.225.85:3001/students/${user.aridno}`
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setData(data);
      }
    } catch (error) {
      console.log("Error:", "Failed to fetch student data");
    }
  };

  const fetchTeacherData = async () => {
    try {
      const response = await fetch(
        `http://192.168.225.85:3001/teachers/${user.name}/classes`
      );
      const data = await response.json();

      if (response.ok) {
        setData(data);
      }
    } catch (error) {
      console.log("Error:", "Failed to fetch teacher data");
    }
  };

  useEffect(() => {
    if (role === "student" && user && user.aridno) {
      fetchStudentData();
    } else if (role === "teacher" && user && user.name) {
      fetchTeacherData();
    }
  }, [user, role]);

  const greenTheme = {
    header: {
      background: "green",
    },
  };

  const transformClassesData = (classesData) => {
    const dayMap = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
    };

    return classesData.map((classData) => {
      const {
        classroom,
        classtime,
        classtime_end,
        course,
        day,
        name,
        section,
        shift,
        semester,
      } = classData;

      const cleanedClasstimeEnd = classtime_end.replace(/AM|PM/, "").trim();
      const sectionKey = `${semester} ${section}`;

      return {
        courseId: course.toUpperCase(),
        title: name,
        sections: {
          [sectionKey]: {
            days: [dayMap[day] ?? 1],
            startTimes: [classtime],
            endTimes: [cleanedClasstimeEnd],
            locations: [classroom],
          },
        },
      };
    });
  };

  return (
    <View style={styles.centeredContainer}>
      <View style={styles.timetableContainer}>
        <TimeTable
          eventGroups={
            data?.classesData ? transformClassesData(data.classesData) : []
          }
          eventOnPress={(event) => {
            alert(
              `${event.courseId} ${event.section} - Start Time:${event.startTime} - End Time:${event.endTime}`
            );
          }}
          theme={greenTheme}
        />
      </View>
    </View>
  );
};
