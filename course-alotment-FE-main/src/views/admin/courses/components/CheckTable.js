import React, { useState, useEffect, useMemo } from 'react';
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
  Tfoot,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import {
  useTable,
} from "react-table";
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Custom components
import Card from "components/card/Card";

export default function CheckTable(props) {
  const { columnsData } = props;
  const [isOpen, setIsOpen] = useState(false)
  const [coursesData, setCoursesData] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [operationType, setOperationType] = useState('add');
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/courses');
      setCoursesData(response.data);
    } catch (error) {
      toast.error('Failed to fetch courses');
    }
  };

  const handleSubmit = async () => {
    try {
      if (operationType === 'add') {
        const newCourse = {
          name,
          description,
        };
        await axios.post('http://localhost:3001/courses', newCourse);
        toast.success('Course added successfully');
      } else if (operationType === 'update') {
        const updatedCourse = {
          name,
          description,
        };
        await axios.put(`http://localhost:3001/courses/${courseId}`, updatedCourse);
        toast.success('Course updated successfully');
      }
      fetchCourses();
      setIsOpen(false);
      setName("");
      setDescription("");
      setOperationType('add');
      setCourseId(null);
    } catch (error) {
      toast.error('Failed to perform operation');
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:3001/courses/${courseId}`);
      toast.success('Course deleted successfully');
      fetchCourses(); // Refresh the courses list
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const openModalForUpdate = (course) => {
    setOperationType('update');
    setCourseId(course.id);
    setName(course.name);
    setDescription(course.description);
    setIsOpen(true);
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
        <Button colorScheme="blue" size="sm" onClick={() => setIsOpen(true)}>+ Add</Button>
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
                <Td>{items.description}</Td>
                <Td>{items.createdAt}</Td>
                <Td>{items.updatedAt}</Td>
                <Td>
                  <div style={{ display: 'flex', gap: "10px" }}>
                    <Button colorScheme="blue" size="sm" onClick={() => openModalForUpdate(items)}>Update</Button>
                    <Button colorScheme="red" size="sm" onClick={() => deleteCourse(items.id)}>Delete</Button>
                  </div>
                </Td>
              </Tr>)
            }

          </Tbody>
          <Tfoot>
            <Tr>
              {
                columnsData.map(items => {
                  return (
                    <Th key={items.Header}>{items.Header}</Th>
                  )
                })
              }
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{operationType === 'add' ? 'Add Course' : 'Update Course'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              {operationType === 'add' ? 'Add' : 'Update'}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
