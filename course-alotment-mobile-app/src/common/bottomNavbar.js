import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Text,
  Box,
  HStack,
  Pressable,
  Center,
  Icon,
} from "native-base";
import { useNavigation } from "../context/NavigationContext";

export function BottomNav({ navigation }) {
  const { navigateTo, currentPage } = useNavigation();

  return (
    <NativeBaseProvider>
      <Box
        safeAreaTop
        width="100%"
        alignSelf="center"
        position="absolute"
        bottom={0}
      >
        <HStack bg="green.700" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable
            cursor="pointer"
            opacity={currentPage === "home" ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => navigateTo("home")}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={currentPage === "home" ? "home" : "home-outline"}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Home
              </Text>
            </Center>
          </Pressable>

          <Pressable
            cursor="pointer"
            opacity={currentPage === "timetable" ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => navigateTo("timetable")}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={
                      currentPage === "timetable" ? "timetable" : "timetable"
                    }
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Timetable
              </Text>
            </Center>
          </Pressable>

          <Pressable
            cursor="pointer"
            opacity={currentPage === "profile" ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => navigateTo("profile")}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={
                      currentPage === "profile" ? "account" : "account-outline"
                    }
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Profile
              </Text>
            </Center>
          </Pressable>

          <Pressable
            cursor="pointer"
            opacity={0.5}
            py="2"
            flex={1}
            onPress={() => navigation.navigate("login")}
          >
            <Center>
              <Icon
                mb="1"
                as={<MaterialIcons name="logout" />}
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Logout
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}
