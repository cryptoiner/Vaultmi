import { Box, Flex, Icon } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import Footer from "components/footer/Footer";
import { NavLink } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

function AuthIllustration(props) {
  const { children, illustrationBackground } = props;
    return (
    <Flex position="relative" h="max-content">
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh",
        }}
        w="100%"
        maxW={{ md: "66%", lg: "1313px" }}
        mx="auto"
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent="start"
        direction="column"
      >
        <NavLink
          to="/admin"
          style={() => ({
            width: "fit-content",
            marginTop: "40px",
          })}
        >
          <Flex
            align="center"
            ps={{ base: "25px", lg: "0px" }}
            pt={{ lg: "0px", xl: "0px" }}
            w="fit-content"
          >
            <Icon
              as={FaChevronLeft}
              me="12px"
              h="13px"
              w="8px"
              color="secondaryGray.600"
            />
          </Flex>
        </NavLink>
        {children}
        <Box
          display={{ base: "none", md: "block" }}
          h="100%"
          minH="100vh"
          w={{ lg: "50vw", "2xl": "44vw" }}
          position="absolute"
          right="0px"
        >
          <Flex
            bg={`url(${illustrationBackground})`}
            justify="center"
            align="end"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderTopLeftRadius={{ lg: "120px", xl: "200px" }}
            borderBottomLeftRadius={{ lg: "120px", xl: "200px" }}
          ></Flex>
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
}

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any,
};

export default AuthIllustration;
