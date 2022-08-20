import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import logo from "assets/img/layout/logo.png";
import logoWhite from "assets/img/layout/logoWhite.png";
import { MdInfoOutline } from "react-icons/md";
import routes from "routes.js";
import { walletFormat, walletName } from "../../utils/tools";
export default function HeaderLinks(props) {
  const { address, secondary } = props;
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const logoImage = useColorModeValue(logo, logoWhite);

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SidebarResponsive routes={routes} />

      <Flex style={{paddingRight:'10px'}} >{walletFormat(address)}</Flex>

      <Menu>
        <MenuButton p="0px">
          <Icon
            mt="6px"
            as={MdInfoOutline}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          me={{ base: "30px", md: "unset" }}
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          minW={{ base: "unset" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          <Image src={logoImage} borderRadius="16px" mb="28px" />
          <Flex flexDirection="column">
            <Link w="100%" href="https://github.com/cryptoiner/PayNow">
              <Button w="100%" h="44px" mb="10px" variant="brand">
                Go to Github
              </Button>
            </Link>
          </Flex>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: "pointer" }}
            color="white"
            name={walletName(address)}
            bg="#0e0e0e"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
  address: PropTypes.string,
};
