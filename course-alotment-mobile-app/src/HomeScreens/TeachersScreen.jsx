import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    TableCaption,
    TableContainer,
    
  } from "@chakra-ui/react";
// Custom components
import Card from "../component/Card";

export default function CheckTable(props) {
  const { columnsData } = props;
  const [teachersData, setTeachersData] = useState([]);

  useEffect(() => {
    fetchTeachers();
    fetchCourses()
  }, []);
  
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/courses');
      setCourses(response.data);
    } catch (error) {
      toast.error('Failed to fetch courses');
    }
  };
  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/teachers');
      setTeachersData(response.data);
    } catch (error) {
      toast.error('Failed to fetch teachers');
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
          All Teachers
        </Text>
        {/* <Button colorScheme="blue" size="sm" onClick={() => setIsOpen(true)}>+ Add</Button> */}
      </Flex>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Table for all the teachers</TableCaption>
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
              teachersData.map(items => <Tr key={items.name}>

                <Td>{items.name}</Td>
                <Td>{items.qualification}</Td>
                <Td>{items.gender}</Td>
                <Td>
                  {items.courses.map((course, index) => (
                    <span key={index} style={{ display: 'block', marginBottom: '5px' }}>• {course}</span>
                  ))}
                </Td>
                {/* <Td>
                  <div style={{ display: 'flex', gap: "10px" }}>
                    <Button colorScheme="blue" size="sm" onClick={() => openModalForUpdate(items)}>Update</Button>
                    <Button colorScheme="green" size="sm" onClick={() => openModalForPasswordUpdate(items)}>Change Password</Button>
                    <Button colorScheme="red" size="sm" onClick={() => deleteTeacher(items.id)}>Delete</Button>
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