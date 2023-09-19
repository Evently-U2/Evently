import React, { useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { section1Content } from "../utils/content";
import LaunchButton from "./LaunchButton";
import themeTypography from "../utils/typography";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const {
  // MainBG,
  // SecondaryBG,
  // TreesImage,
  // CliffImage,
  // HorseImage,
  // ShootingStarImage,
  title,
  subtitle,
} = section1Content;

function LandingPage() {
  

  const isAuth = useSelector((state) => {
    return state.users.isAuthenticated;
  });

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {!isLoading ? (
        <Loading />
      ) : (
        <Box>
          <Container sx={{ height: "80vh", border: "2px solid black" }}>
            <Stack sx={{ height: "inherit" }} justifyContent="center">
              <Typography
                sx={{ ...themeTypography.h1, letterSpacing: "0.02em", mb: 1 }}
              >
                {title}
              </Typography>
              <Typography
                sx={{ ...themeTypography.h2, letterSpacing: "0.05em", mb: 5 }}
              >
                {subtitle}
              </Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
              >
                {!isAuth ? (
                  <LaunchButton value={"Join Us"} />
                ) : (
                  <>
                    <LaunchButton value={"Organize Events"} />
                    <LaunchButton value={"Participate in Events"} />
                  </>
                )}
              </Stack>
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
}

export default LandingPage;
