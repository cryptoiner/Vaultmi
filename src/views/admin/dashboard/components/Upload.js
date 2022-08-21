import {
  Flex,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useState } from "react";
import { Input, Button } from '@chakra-ui/react'
import { uploadFile } from "../../../../utils/uploadFile";

export default function Upload(props) {
  const { used, total, ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  const changeHandler = (event) => {
    setUploadStatus('');
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = async () => {
    setIsLoading(true)
    const cid = await uploadFile(selectedFile)
    setIsLoading(false)
    if(!!cid) {
      setUploadStatus('Uploaded')
    }else{
      setUploadStatus('Failed')
    }
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
            Upload a file
          </Text>
          <div style={{paddingTop:'20px'}}>
            <Input variant="filled" type="file" name="file" onChange={changeHandler} />
            {isSelected && (
              <div>
                <p>Size: {(selectedFile.size/1048576).toFixed(2)} Mb</p>
              </div>
            )}
            <div>
              <Button variant="brand" onClick={handleSubmission}>
                {isLoading ? 'Loading' : 'Upload'}
              </Button>
            </div>
          </div>
          <Flex>
            <Text align={"center"}>
              {uploadStatus}
            </Text>
          </Flex>
          <Flex w="100%">
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
