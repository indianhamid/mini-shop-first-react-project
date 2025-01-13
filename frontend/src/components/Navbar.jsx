import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import { LuPlus, LuSun, LuMoon } from "react-icons/lu";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"11/12"} px={4} py={4}>
      <Flex
        h={"auto"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ md: "row", sm: "column" }}
        gap={4}
      >
        <Text
          fontSize={{ sm: "2xl", md: "3xl" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack gap={2} alignItems={"center"}>
          <Link to={"/create"}>
            <IconButton aria-label="create page">
              <LuPlus />
            </IconButton>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <LuMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}
