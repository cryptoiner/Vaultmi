import {
  Flex,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useState } from "react";
import { Input, Button } from '@chakra-ui/react'
import { downloadFile } from "../../../../utils/uploadFile";

export default function Download(props) {
  const { used, total, address, ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const [selectedHash, setSelectedHash] = useState();
  const [file, setFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const changeHandlerHash = (event) => {
    setSelectedHash(event.target.value);
  };

  const handleSubmission = async () => {
    setIsLoading(true)
    const cid = await downloadFile(selectedHash)
    setIsLoading(false)
    setFile(cid[0])
  };

  return (
    <Card {...rest} mb="20px" align="center" p="20px">
      <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
        <Flex direction="column" pe="44px">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            textAlign="start"
            fontSize="2xl"
            mt={{ base: "20px", "2xl": "50px" }}
          >
            Verify a file
          </Text>
          <div style={{paddingTop:'20px'}}>
            <Input placeholder={"Hash"} variant="filled" type="text" name="text" onChange={changeHandlerHash} />
            <div>
              <Button variant="brand" onClick={handleSubmission}>
                {isLoading ? 'Loading' : 'Download'}
              </Button>
            </div>
          </div>
          <Flex>
            <Text align={"center"}>
              {file.name} {file.type} {file.size}
            </Text>
          </Flex>
          <Flex w="100%">
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
