import { Box, Grid } from "@chakra-ui/react";

import Banner from "views/admin/dashboard/components/Banner";
import Storage from "views/admin/dashboard/components/Storage";
import Upload from "views/admin/dashboard/components/Upload";
import banner from "assets/img/auth/banner.png";
import React, { useState } from "react";
import { walletFormat } from "../../../utils/tools";

export default function Overview() {
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("");
  const getMinaAccounts = async () => await window.mina.requestAccounts();
  const getMinaNetwork = async () => await window.mina.requestNetwork();
  React.useEffect(async () => {
    if (window.mina && address === "") {
      const accounts = await getMinaAccounts();
      setAddress(accounts[0]);
      setNetwork(await getMinaNetwork());
    }
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(2, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <Banner
          gridArea="1 / 1 / 2 / 2"
          banner={banner}
          address={address}
          name={walletFormat(address)}
          job={network}
          posts="17"
          followers="9.7k"
          following="274"
        />
        <Storage
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={0}
          total={1000}
        />
        <Upload
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "1 / 3 / 2 / 4",
          }}
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe="20px"
          pb={{ base: "100px", lg: "20px" }}
        />
      </Grid>
      <Grid
        mb="20px"
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
      </Grid>
    </Box>
  );
}
