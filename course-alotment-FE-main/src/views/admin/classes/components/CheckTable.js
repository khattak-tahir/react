import React, { useState, useEffect } from 'react';
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Select from 'react-select';

// Custom components
import Card from "components/card/Card";

export default function CheckTable(props) {
  const { columnsData } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [classesData, setClassesData] = useState([]);
  const [classId, setClassId] = useState(null);
  const [name, setName] = useState('');
  const [operationType, setOperationType] = useState('add');
  const [teachers, setTeachersData] = useState([]);
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [shift, setShift] = useState('');
  const [classroom, setClassroom] = useState('');
  const [classTime, setClassTime] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchTeachers();
    fetchClasses()
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/classes');
      setClassesData(response.data);
    } catch (error) {
      toast.error('Failed to fetch courses');
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getTeachers');
      setTeachersData(response.data);
    } catch (error) {
      toast.error('Failed to fetch teachers');
    }
  };

  const handleSubmit = async () => {
    try {
      const classData = {
        name,
        semester,
        section: section.value,
        shift: shift.value,
        classroom,
        classtime: classTime,
        teacher: selectedTeacher.value,
        course: selectedCourse.value,
      };
      if (operationType === 'add') {
        await axios.post('http://localhost:3001/classes', classData);
        toast.success('Class added successfully');
      } else if (operationType === 'update') {
        await axios.put(`http://localhost:3001/classes/${classId}`, classData);
        toast.success('Class updated successfully');
      }
      fetchClasses();
      setIsOpen(false);
      setName("");
      setSemester("");
      setSection("");
      setShift("");
      setClassroom("");
      setClassTime("");
      setSelectedTeacher(null);
      setSelectedCourse(null);
      setOperationType('add');
      setClassId(null);
    } catch (error) {
      toast.error('Failed to perform operation');
    }
  };

  const deleteClass = async (classId) => {
    try {
      await axios.delete(`http://localhost:3001/classes/${classId}`);
      toast.success('Class deleted successfully');
      fetchClasses();
    } catch (error) {
      toast.error('Failed to delete class');
    }
  };

  const openModalForUpdate = (classData) => {
    setOperationType('update');
    setClassId(classData.id);
    setName(classData.name);
    setSemester(classData.semester);
    setSection({ value: classData.section, label: classData.section });
    setShift({ value: classData.shift, label: classData.shift });
    setClassroom(classData.classroom);
    setClassTime(classData.classtime);
    setSelectedTeacher({ value: classData.teacher, label: classData.teacher });
    setSelectedCourse({ value: classData.course, label: classData.course });
    setIsOpen(true);
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  const generateCourses = () => {
    const { courses } = teachers.find(teacher => teacher.name === selectedTeacher.value) || { courses: [] };

    return courses.map(course => ({ value: course, label: course }));
  }
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
          All Classes
        </Text>
        <Button colorScheme="blue" size="sm" onClick={() => setIsOpen(true)}>+ Add</Button>
      </Flex>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Table for all the classes</TableCaption>
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
              classesData && classesData.map(items => <Tr key={items.name}>
                <Td>{items.id}</Td>
                <Td>{items.name}</Td>
                <Td>{items.semester}</Td>
                <Td>{items.section}</Td>
                <Td>{items.shift}</Td>
                <Td>{items.classroom}</Td>
                <Td>{items.classtime}</Td>
                <Td>{items.teacher}</Td>
                <Td>{items.course}</Td>
                <Td>
                  <div style={{ display: 'flex', gap: "10px" }}>
                    <Button colorScheme="blue" size="sm" onClick={() => openModalForUpdate(items)}>Update</Button>
                    <Button colorScheme="red" size="sm" onClick={() => deleteClass(items.id)}>Delete</Button>
                  </div>
                </Td>
              </Tr>)
            }

          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{operationType === 'add' ? 'Add Class' : 'Update Class'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Class Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Semester</FormLabel>
              <Input value={semester} onChange={(e) => setSemester(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Section</FormLabel>
              <Select
                value={section}
                onChange={(e) => setSection(e)}
                options={[{ value: "A", label: "A" }, { value: "B", label: "B" }, { value: "C", label: "C" }, { value: "D", label: "D" }]}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Shift</FormLabel>
              <Select
                value={shift}
                onChange={(e) => setShift(e)}
                options={[{ value: "Morning", label: "Morning" }, { value: "Evening", label: "Evening" }]}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Classroom</FormLabel>
              <Input value={classroom} onChange={(e) => setClassroom(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Class Time</FormLabel>
              <Input value={classTime} onChange={(e) => setClassTime(e.target.value)} type='time' placeholder='Select Time' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Teacher</FormLabel>
              <Select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e)}
                options={teachers.map(teacher => ({ value: teacher.name, label: teacher.name }))}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Course</FormLabel>
              <Select
                isDisabled={selectedTeacher ? false : true}
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e)}
                options={selectedTeacher && generateCourses()}
              />
              {!selectedTeacher && <small style={{ color: 'red', fontSize: "10px" }}>Please select teacher first</small>}
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
