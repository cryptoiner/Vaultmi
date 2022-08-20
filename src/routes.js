import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome, MdOutlineAccountBalanceWallet
} from "react-icons/md";
import Profile from "views/admin/dashboard";
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Connect wallet",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdOutlineAccountBalanceWallet} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
];

export default routes;
