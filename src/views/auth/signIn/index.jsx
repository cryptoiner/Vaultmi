import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";

function SignIn() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const history = useHistory();

  const getMinaAccounts = async () => await window.mina.requestAccounts();

  React.useEffect(async () => {
    const accounts = await getMinaAccounts();
    if (accounts?.length > 0) {
      history.push("/default");
    }
  }, []);

  const connectWallet = async () => {
    let accounts;
    try {
      accounts = await window.mina.requestAccounts();
      if (accounts?.length > 0) {
        history.push("/default");
      }
    } catch (error) {
      console.log(error.message, error.code);
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "50px", md: "30vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Connect wallet
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Unlock your wallet to connect!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            variant="lightBrand"
            fontWeight="500"
            w="60%"
            style={{ display: "flex", justifyContent: "space-evenly" }}
            onClick={connectWallet}
          >
            <img alt={""}
              src={
                "https://www.aurowallet.com/wp-content/uploads/2022/02/icon-svg-1.svg"
              }
              width="20px"
              height="20px"
            />
            <span>Connect Auro wallet</span>
          </Button>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Not installed yet?
              <a href={"https://www.aurowallet.com/"}>
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Download extension
                </Text>
              </a>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
