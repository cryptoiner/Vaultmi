import React from "react";

import { Flex, useColorModeValue } from "@chakra-ui/react";

import Logo from "../../../assets/img/layout/logo.png";
import LogoWhite from "../../../assets/img/layout/logoWhite.png";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
    let logoColor = useColorModeValue("navy.700", "white");

  return (
    <>
      <Flex align="center">
        <img alt=""
          src={logoColor === "white" ? LogoWhite : Logo}
          height="40px"
          width="220px"
          color={logoColor}
        />
      </Flex>
      <Flex align="center">
        <HSeparator mb="20px" />
      </Flex>
    </>
  );
}

export default SidebarBrand;
