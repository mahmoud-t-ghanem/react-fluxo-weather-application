import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ViewListIcon from "@mui/icons-material/ViewList";
import SunnyIcon from "@mui/icons-material/Sunny";
import NearMeIcon from "@mui/icons-material/NearMe";
import { getUserLocation } from "../utils/getUserLocation";
import { useWeatherContext } from "../contexts/WeatherContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from "@mui/icons-material/Language";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import { useTheme } from "@emotion/react";

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const {
    setInputValue,
    setSelectedCity,
    setCurrentCoords,
    setSidebarVisible,
    mode,
    setMode,
    setWeatherNotification,
    setLoading,
  } = useWeatherContext();
  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.8),
          color: theme.palette.secondary.main,
          borderBottom: `2px solid ${theme.palette.secondary.main}`,
          borderRadius: "0 0 20px 20px",
        }}
        elevation={0}
      >
        <Toolbar sx={{ py: 1 }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              color: theme.palette.secondary.main,
              filter: (theme) =>
                `drop-shadow(0px 0px 8px ${theme.palette.secondary.main}99)`,
            }}
            onClick={() => window.location.reload()}
          >
            <SunnyIcon />
          </IconButton>

          <Typography
            onClick={() => window.location.reload()}
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 900,
              letterSpacing: "5px",
              color: theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            FLU
            <Box component="span" sx={{ color: theme.palette.secondary.main }}>
              X
            </Box>
            O
          </Typography>

          <Tooltip
            title={
              i18n.language === "ar" ? t("languages.en") : t("languages.ar")
            }
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="Language"
              onClick={toggleLanguage}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={mode === "light" ? t("navbar.dark") : t("navbar.light")}
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="mode"
              onClick={() =>
                mode === "light" ? setMode("dark") : setMode("light")
              }
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip
            title="Locate Me"
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="location"
              onClick={async (event) => {
                event.preventDefault();
                try {
                  setLoading(true);
                  setSelectedCity(null);
                  setInputValue("");
                  const coords = await getUserLocation();
                  setCurrentCoords(coords);
                } catch (error) {
                  console.error("Location Fetch Error Key: ", error);
                  setWeatherNotification({
                    open: true,
                    severity: "error",
                    message: t(error),
                  });
                } finally {
                  setLoading(false);
                }
              }}
            >
              <NearMeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            title="Menu"
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setSidebarVisible(true)}
            >
              <ViewListIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
