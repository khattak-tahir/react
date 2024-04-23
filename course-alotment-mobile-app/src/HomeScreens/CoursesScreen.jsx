import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView } from 'react-native';
import {
    Flex,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Button,
    TableCaption,
    TableContainer,
    
  } from "@chakra-ui/react";
   
import axios from 'axios';
// import { Card } from 'react-native-paper';
// import CardTitle from 'react-native-paper/lib/typescript/components/Card/CardTitle';
import Card from "../component/Card";


// const CoursesScreen = () => {
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:3000/api/courses')
//             .then(response => {
//                 setCourses(response.data);
//             })
//             .catch(error => console.error('Error fetching data: ', error));
//     }, []);

//     return (
//         <ScrollView>
//             {courses.map(course => (
//                 <Card key={course.id} style={{margin: 10}}>
//                     <Card.Content>
//                         <Title>{course.title}</Title>
//                         <Paragraph>{course.description}</Paragraph>
//                         <Paragraph>By {course.author}</Paragraph>
//                     </Card.Content>
//                 </Card>
//             ))}
//         </ScrollView>
//     );
// };

export default function CoursesScreen(props) {
    const { columnsData } = props;
    // const [isOpen, setIsOpen] = useState(false)
    const [coursesData, setCoursesData] = useState([]);
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    // const [operationType, setOperationType] = useState('add');
    // const [courseId, setCourseId] = useState(null);
    // const [courseCode, setCourseCode] = useState("");
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/react/course-alotment-FE-main/server/index/courses');
        setCoursesData(response.data);
      } catch (error) {
        toast.error('Failed to fetch courses');
      }
    };

    const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
        
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          All Courses
        </Text>
        {/* <Button colorScheme="blue" size="sm" onClick={() => setIsOpen(true)}>+ Add</Button> */}
      </Flex>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Table for all the courses</TableCaption>
          <Thead>
            <Tr>
              {
                columnsData.map((items) => {
                  return (
                    <Th key={items.Header}>{items.Header}</Th>
                  )
                })
              }
            </Tr>
          </Thead>
          <Tbody>
            {
              coursesData.map(items => <Tr key={items.name}>
                <Td>{items.id}</Td>
                <Td>{items.name}</Td>
                <Td>{items.course_code}</Td>
                <Td>{items.description}</Td>
                <Td>{items.createdAt}</Td>
                <Td>{items.updatedAt}</Td>
                {/* <Td>
                  <div style={{ display: 'flex', gap: "10px" }}>
                    <Button colorScheme="blue" size="sm" onClick={() => openModalForUpdate(items)}>Update</Button>
                    <Button colorScheme="red" size="sm" onClick={() => deleteCourse(items.id)}>Delete</Button>
                  </div>
                </Td> */}
              </Tr>)
            }

          </Tbody>
        </Table>
      </TableContainer>
      </Card>
      );
}
