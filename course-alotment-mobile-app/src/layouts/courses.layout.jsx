import React, { useEffect, useState } from 'react';
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
import Card from "../component/Card";


export default function Courses(props) {
    const { columnsData } = props;
    const [coursesData, setCoursesData] = useState([]);
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://192.168.242.85:3001/courses');
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
                
              </Tr>)
            }

          </Tbody>
        </Table>
      </TableContainer>
      </Card>
      );
}
