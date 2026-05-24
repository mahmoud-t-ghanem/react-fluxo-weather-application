import { useMemo } from "react";
import NavBar from "./NavBar";
import Search from "./Search";
import WeatherDisplay from "./WeatherDisplay";
import PopularCities from "./PopularCities";
import WeatherSidebar from "./WeatherSidebar";
import About from "./About";
import { useWeatherContext } from "../contexts/WeatherContext";
import Footer from "./Footer";
import WeatherInsights from "./WeatherTips";
import WeatherNotification from "./WeatherNotification";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { grey, deepOrange } from "@mui/material/colors";

import WeatherLoader from "./WeatherLoader";

export default function AppContent() {
  const { mode, loading } = useWeatherContext();
  const theme = useMemo(() => {
    return createTheme({
      typography: {
        fontFamily: ["IBM"],
      },
      palette: {
        mode: mode,
        primary: {
          main: mode === "light" ? grey[200] : grey[900],
        },
        secondary: {
          main: deepOrange[500],
        },
        text: {
          main: mode === "light" ? grey[900] : grey[300],
        },
      },
    });
  }, [mode]);
  return (
    <ThemeProvider theme={theme}>
      <WeatherLoader open={loading} />
      <div className={`App ${mode === "dark" ? "dark-theme" : "light-theme"}`}>
        <div className={`background`}>
          <div className="overlay"></div>
          <Container
            maxWidth="lg"
            sx={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <WeatherNotification />
            <NavBar />
            <Search />
            <PopularCities />
          </Container>
        </div>
        <WeatherSidebar />
        <WeatherInsights />
        <WeatherDisplay />

        <About />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
