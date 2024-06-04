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
  const [studentsData, setStudentsData] = useState([]);
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [aridno, setAridno] = useState("");
  const [degree, setDegree] = useState("");
  const [shift, setShift] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [operationType, setOperationType] = useState("add");
  const [studentId, setStudentId] = useState(null);
  const [classesData, setClassesData] = useState([]);
  const [courses, setCourses] = useState([]);

  const [shiftOptions, setShiftOptions] = useState([
    { value: "MORNING", label: "MORNING" },
    { value: "EVENING", label: "EVENING" },
  ]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  const [classesInfo, setClassesInfo] = useState([]);

  const updateSemesterOptions = (e = null) => {
    let newE = e ? e : shift;
    setSection("");
    setCourses([]);
    setSectionOptions([]);
    setCourseOptions([]);
    setSemester("");
    setSemesterOptions([]);

    const uniqueSemesters = [
      ...new Set(
        classesData.filter((c) => c.shift === newE.value).map((c) => c.semester)
      ),
    ];
    setSemesterOptions(uniqueSemesters.map((s) => ({ value: s, label: s })));
  };

  const updateSectionOptions = (e) => {
    let newE = e ? e : semester;
    setCourses([]);
    setCourseOptions([]);

    const uniqueSections = [
      ...new Set(
        classesData
          .filter((c) => c.shift === shift.value && c.semester === newE.value)
          .map((c) => c.section)
      ),
    ];
    setSectionOptions(uniqueSections.map((s) => ({ value: s, label: s })));
  };

  const updateCourseOptions = (e) => {
    const uniqueCourses = [
      ...new Set(
        classesData
          .filter(
            (c) =>
              c.shift === shift.value &&
              c.semester === semester.value &&
              c.e === section.value
          )
          .map((c) => c.course)
      ),
    ];
    setCourseOptions(uniqueCourses.map((c) => ({ value: c, label: c })));
  };

  const filterAndExtractCourseInfo = (e) => {
    const selectedCourseNames = e.map((course) => course.value);

    const filteredClasses = classesData.filter(
      (classItem) =>
        classItem.shift === shift.value &&
        classItem.semester === semester.value &&
        classItem.section === section.value &&
        selectedCourseNames.includes(classItem.course)
    );

    const courseInfo = filteredClasses.map((classItem) => ({
      name: classItem.name,
      classroom: classItem.classroom,
      classtime: classItem.classtime,
      course: classItem.course,
    }));

    console.log(courseInfo);
    setClassesInfo(courseInfo);
  };

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:3001/classes");
      setClassesData(response.data);
    } catch (error) {
      toast.error("Failed to fetch classes");
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/students");
      setStudentsData(response.data);
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  const handleSubmit = async () => {
    try {
      const studentData = {
        name,
        cnic: cnic.toString(),
        aridno,
        degree,
        shift: shift.value,
        semester: semester.value,
        section: section.value,
        courses,
        classes_info: classesInfo,
      };
      if (operationType === "add") {
        await axios.post("http://localhost:3001/students", studentData);
        toast.success("Student added successfully");
      } else if (operationType === "update") {
        await axios.put(
          `http://localhost:3001/students/${studentId}`,
          studentData
        );
        toast.success("Student updated successfully");
      }
      fetchStudents();
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to perform operation");
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3001/students/${studentId}`);
      toast.success("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      toast.error("Failed to delete student");
    }
  };

  const resetForm = () => {
    setName("");
    setCnic("");
    setAridno("");
    setDegree("");
    setShift("");
    setSemester("");
    setSection("");
    setOperationType("add");
    setStudentId(null);
    setClassesInfo([]);
    setCourses([]);
  };

  const openModalForUpdate = (student) => {
    setOperationType("update");
    setStudentId(student.id);
    setName(student.name);
    setCnic(student.cnic);
    setAridno(student.aridno);
    setDegree(student.degree);
    setSemester({ value: student.semester, label: student.semester });
    setSection({ value: student.section, label: student.section });

    updateSemesterOptions();
    updateSectionOptions();

    setIsOpen(true);
  };

  const [passwordModal, setPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const openModalForPasswordUpdate = (student) => {
    const { id } = student;

    if (id) {
      setStudentId(id);
      setPasswordModal(true);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      if (newPassword === "") {
        toast.warning("Please type your new password!");
        return;
      }

      await axios.put(`http://localhost:3001/students/password/${studentId}`, {
        password: newPassword,
      });
      toast.success("Password updated successfully");

      fetchStudents();
      setPasswordModal(false);
      setStudentId(null);
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
          All Students
        </Text>
        <Button colorScheme="blue" size="sm" onClick={() => setIsOpen(true)}>
          + Add
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Table for all the students</TableCaption>
          <Thead>
            <Tr>
              {columnsData.map((items) => {
                return <Th key={items.Header}>{items.Header}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {studentsData.map((items) => (
              <Tr key={items.name}>
                <Td>{items.id}</Td>
                <Td>{items.name}</Td>
                <Td>{items.password}</Td>
                <Td>{items.cnic}</Td>
                <Td>{items.aridno}</Td>
                <Td>{items.degree}</Td>
                <Td>{items.shift}</Td>
                <Td>{items.semester}</Td>
                <Td>{items.section}</Td>
                <Td>
                  {items.courses.map((course, index) => (
                    <span
                      key={index}
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      • {course.value}
                    </span>
                  ))}
                </Td>
                <Td>
                  {items.classes_info.length > 0 && (
                    <Table variant="striped" size="sm" colorScheme="facebook">
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Classroom</Th>
                          <Th>Class Time</Th>
                          <Th>Course Code</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {items.classes_info.map((classItem, index) => (
                          <Tr key={index}>
                            <Td>{classItem.name}</Td>
                            <Td>{classItem.classroom}</Td>
                            <Td>{classItem.classtime}</Td>
                            <Td>{classItem.course}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  )}
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
                      onClick={() => deleteStudent(items.id)}
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
            {operationType === "add" ? "Add Student" : "Update Student"}
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
              <FormLabel>ARID No.</FormLabel>
              <Input
                value={aridno}
                onChange={(e) => setAridno(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Degree</FormLabel>
              <Input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Shift</FormLabel>
              <Select
                value={shift}
                onChange={(e) => {
                  setShift(e);
                  updateSemesterOptions(e);
                }}
                options={shiftOptions}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Semester</FormLabel>
              <Select
                isDisabled={!shift}
                value={semester}
                onChange={(e) => {
                  setSemester(e);
                  updateSectionOptions(e);
                }}
                options={semesterOptions}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Section</FormLabel>
              <Select
                isDisabled={!semester}
                value={section}
                onChange={(e) => {
                  setSection(e);
                  updateCourseOptions(e);
                }}
                options={sectionOptions}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Courses</FormLabel>
              <Select
                isDisabled={!section}
                value={courses}
                name="courseds"
                options={courseOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) => {
                  setCourses(e);
                  filterAndExtractCourseInfo(e);
                }}
                isMulti
              />
            </FormControl>

            {classesInfo.length > 0 && (
              <div style={{ marginTop: "30px", marginBottom: "20px" }}>
                <FormLabel>Classes Info</FormLabel>
                <Table variant="striped" size="sm" colorScheme="facebook">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Classroom</Th>
                      <Th>Class Time</Th>
                      <Th>Course Code</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {classesInfo.map((classItem, index) => (
                      <Tr key={index}>
                        <Td>{classItem.name}</Td>
                        <Td>{classItem.classroom}</Td>
                        <Td>{classItem.classtime}</Td>
                        <Td>{classItem.course}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            )}
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
