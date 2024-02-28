import { Box, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {  MdBugReport, MdCoPresent, MdOutlineSchool, MdOutlineTableChart,  } from "react-icons/md";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
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
          value="3"
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
          value="4"
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
          value="6"
        />

        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBugReport} color={brandColor} />
              }
            />
          }
          name="Total Reports"
          value="3"
        />
      </SimpleGrid>

      {/*Calender*/}
      <SimpleGrid columns={{ base: 1, md: 3, xl: 3 }} gap="20px">
        <MiniCalendar h="100%" minW="100%" selectRange={false} />
      </SimpleGrid>
    </Box>
  );
}
