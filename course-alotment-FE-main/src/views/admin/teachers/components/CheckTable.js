import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Select from "react-select";

// Custom components
import Card from "components/card/Card";

export default function CheckTable(props) {
  const { columnsData } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [teacherid, setTeacherid] = useState("");
  const [qualification, setQualification] = useState("");
  const [gender, setGender] = useState("");
  const [operationType, setOperationType] = useState("add");
  const [teacherId, setTeacherId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    fetchTeachers();
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3001/courses");
      setCourses(response.data);
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/teachers");
      setTeachersData(response.data);
    } catch (error) {
      toast.error("Failed to fetch teachers");
    }
  };

  const handleSubmit = async () => {
    try {
      const teacherData = {
        name,
        cnic: cnic.toString(),
        teacherid,
        qualification,
        gender: gender.value,
        courses: selectedCourses.map((option) => option.value),
      };
      if (operationType === "add") {
        await axios.post("http://localhost:3001/teachers", teacherData);
        toast.success("Teacher added successfully");
      } else if (operationType === "update") {
        await axios.put(
          `http://localhost:3001/teachers/${teacherId}`,
          teacherData
        );
        toast.success("Teacher updated successfully");
      }
      fetchTeachers();
      setIsOpen(false);
      setName("");
      setCnic("");
      setTeacherid("");
      setQualification("");
      setGender("");
      setOperationType("add");
      setTeacherId(null);
      setSelectedCourses([]);
    } catch (error) {
      toast.error("Failed to perform operation");
    }
  };

  const deleteTeacher = async (teacherId) => {
    try {
      await axios.delete(`http://localhost:3001/teachers/${teacherId}`);
      toast.success("Teacher deleted successfully");
      fetchTeachers();
    } catch (error) {
      toast.error("Failed to delete teacher");
    }
  };

  const openModalForUpdate = (teacher) => {
    setOperationType("update");
    setTeacherId(teacher.id);
    setName(teacher.name);
    setCnic(teacher.cnic);
    setTeacherid(teacher.teacherid);
    setQualification(teacher.qualification);
    setGender({
      label: teacher.gender,
      value: teacher.gender,
    });
    const selectedCourseObjects = teacher.courses.map((item) => {
      return {
        value: item,
        label: item,
      };
    });
    setSelectedCourses(selectedCourseObjects);

    setIsOpen(true);
  };

  const [passwordModal, setPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const openModalForPasswordUpdate = (teacher) => {
    const { id } = teacher;

    if (id) {
      setTeacherId(id);
      setPasswordModal(true);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      if (newPassword === "") {
        toast.warning("Please type your new password!");
        return;
      }

      await axios.put(`http://localhost:3001/teachers/password/${teacherId}`, {
        password: newPassword,
      });
      toast.success("Password updated successfully");

      fetchTeachers();
      setPasswordModal(false);
      setTeacherId(null);
      setNewPassword("");
    } catch (error) {
      toast.error("Failed to perform operation");
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
        <Button colorScheme="blue" size="sm" onClick={() => setIsOpen(true)}>
          + Add
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Table for all the teachers</TableCaption>
          <Thead>
            <Tr>
              {columnsData.map((items) => {
                return <Th key={items.Header}>{items.Header}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {teachersData.map((items) => (
              <Tr key={items.name}>
                <Td>{items.id}</Td>
                <Td>{items.name}</Td>
                <Td>{items.password}</Td>
                <Td>{items.cnic}</Td>
                <Td>{items.teacherid}</Td>
                <Td>{items.qualification}</Td>
                <Td>{items.gender}</Td>
                <Td>
                  {items.courses.map((course, index) => (
                    <span
                      key={index}
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      • {course}
                    </span>
                  ))}
                </Td>
                <Td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => openModalForUpdate(items)}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="green"
                      size="sm"
                      onClick={() => openModalForPasswordUpdate(items)}
                    >
                      Change Password
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => deleteTeacher(items.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {operationType === "add" ? "Add Teacher" : "Update Teacher"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>CNIC</FormLabel>
              <NumberInput
                value={cnic}
                onChange={(valueString, value) => {
                  const filteredValue = valueString.replace(/[-+]/g, "");
                  setCnic(filteredValue);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Teacher ID</FormLabel>
              <Input
                value={teacherid}
                onChange={(e) => setTeacherid(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Qualification</FormLabel>
              <Input
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Select
                value={gender}
                name="gender"
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                isSearchable={false}
                onChange={(e) => setGender(e)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Course Code</FormLabel>
              <Select
                value={selectedCourses}
                name="course_code"
                options={courses.map((items) => ({
                  value: items.course_code,
                  label: items.course_code,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) => setSelectedCourses(e)}
                isMulti
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              {operationType === "add" ? "Add" : "Update"}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={passwordModal} onClose={() => setPasswordModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handlePasswordUpdate}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setPasswordModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
