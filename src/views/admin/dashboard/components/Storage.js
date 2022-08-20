import {
  Box,
  Flex,
  Progress,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";

export default function Banner(props) {
  const { used, total } = props;
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align="center">
      <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px">
        Storage
      </Text>
      <Text
        color={textColorSecondary}
        fontSize="md"
        maxW={{ base: "100%", xl: "80%", "3xl": "60%" }}
        mx="auto"
      >
        Store your files in the easiest way
      </Text>
      <Box w="100%" mt="auto">
        <Flex w="100%" justify="space-between" mb="10px">
          <Text color={textColorSecondary} fontSize="sm" maxW="40%">
            {used} GB
          </Text>
          <Text color={textColorSecondary} fontSize="sm" maxW="40%">
            {total} GB
          </Text>
        </Flex>
        <Progress
          align="start"
          colorScheme="brandScheme"
          value={(used / total) * 100}
          w="100%"
        />
      </Box>
    </Card>
  );
}
