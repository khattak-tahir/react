import { Box, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {  MdBook, MdCoPresent, MdOutlineSchool, MdOutlineTableChart,  } from "react-icons/md";

export default function UserReports() {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [dashboardData, setDashboardData] = useState([])

  const getDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      toast.error('Failed to fetch classes');
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/*Cards*/}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdOutlineSchool} color={brandColor} />
              }
            />
          }
          name="Total Students"
          value={dashboardData.students}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdCoPresent} color={brandColor} />
              }
            />
          }
          name="Total Teachers"
          value={dashboardData.teachers}

        />

        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
      
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdOutlineTableChart} color={brandColor} />
              }
            />
          }
          name="Total Classes"
          value={dashboardData.classes}
        />

        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBook} color={brandColor} />
              }
            />
          }
          name="Total Courses"
          value={dashboardData.courses}
        />
      </SimpleGrid>

      {/*Calender*/}
      {/* <SimpleGrid columns={{ base: 1, md: 3, xl: 3 }} gap="20px">
        <MiniCalendar h="100%" minW="100%" selectRange={false} />
      </SimpleGrid> */}
    </Box>
  );
}
