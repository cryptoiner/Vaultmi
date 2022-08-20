import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./additions/card/card";
import { buttonStyles } from "./components/button";
import { inputStyles } from "./components/input";
import { breakpoints } from "./foundations/breakpoints";
import { globalStyles } from "./styles";
export default extendTheme(
  { breakpoints },   globalStyles,
  buttonStyles,
  inputStyles,
  CardComponent
);
