import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";

import Button from "@mui/material/Button";

import { getUserLocation } from "../utils/getUserLocation";

import { useWeatherContext } from "../contexts/WeatherContext";

import { useTranslation } from "react-i18next";

import ThermostatIcon from "@mui/icons-material/Thermostat";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NearMeIcon from "@mui/icons-material/NearMe";
import LanguageIcon from "@mui/icons-material/Language";

export default function WeatherSidebar() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const {
    setInputValue,
    setSelectedCity,
    setCurrentCoords,
    sidebarVisible,
    setSidebarVisible,
    units,
    setUnits,
    setOpenAbout,
    mode,
    setMode,
    setWeatherNotification,
    setLoading,
  } = useWeatherContext();

  const toggleDrawer = (newOpen) => () => {
    setSidebarVisible(newOpen);
  };
  const toggleUnit = () => {
    units === "metric" ? setUnits("imperial") : setUnits("metric");
  };
  const toggleMode = () => {
    mode === "light" ? setMode("dark") : setMode("light");
  };
  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };
  const handleGetLocation = async () => {
    try {
      setLoading(true);
      setInputValue("");
      setSelectedCity(null);
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
  };

  const menuItems = [
    {
      id: "unit-toggle",
      text: t("sidebar.unitSystem"),
      icon: <ThermostatIcon />,
    },
    {
      id: "theme-toggle",
      text: t("sidebar.theme"),
      icon: mode === "light" ? <LightModeIcon /> : <DarkModeIcon />,
    },
    {
      id: "language-toggle",
      text: t("languages.title"),
      icon: <LanguageIcon />,
    },
    { id: "my-location", text: t("sidebar.locateMe"), icon: <NearMeIcon /> },
    {
      id: "about",
      text: t("sidebar.about"),
      icon: <InfoIcon />,
    },
  ];

  const DrawerList = (
    <Box
      sx={{
        width: { xs: "75vw", sm: "350px" },
        "@media (max-width: 450px)": {
          width: "100vw",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.main,
      }}
      role="presentation"
    >
      <Box>
        <Button
          fullWidth
          variant="outlined"
          onClick={toggleDrawer(false)}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            justifyContent: "center",
            px: 1,
            py: 1,
            borderRadius: "0 0 20px 20px",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 700,
            border: `2px solid ${theme.palette.secondary.main}`,
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
            },
          }}
        >
          {t("sidebar.closeMenu")}
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.id === "unit-toggle") {
                    toggleUnit();
                  } else if (item.id === "theme-toggle") {
                    toggleMode();
                  } else if (item.id === "language-toggle") {
                    toggleLanguage();
                  } else if (item.id === "my-location") {
                    handleGetLocation();
                    setSidebarVisible(false);
                  } else if (item.id === "about") {
                    setSidebarVisible(false);
                    setOpenAbout(true);
                  } else {
                    setSidebarVisible(false);
                  }
                }}
              >
                <ListItemIcon
                  sx={{ color: theme.palette.secondary.main, minWidth: "35px" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}
                />
                {item.id === "unit-toggle" && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={units === "imperial"}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleUnit();
                        }}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: theme.palette.secondary.main,
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.08)",
                            },
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: theme.palette.secondary.main,
                            },
                        }}
                      />
                    }
                    label={
                      units === "metric"
                        ? t("sidebar.metric")
                        : t("sidebar.imperial")
                    }
                  />
                )}

                {item.id === "theme-toggle" && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={mode === "dark"}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleMode();
                        }}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: theme.palette.secondary.main,
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.08)",
                            },
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: theme.palette.secondary.main,
                            },
                        }}
                      />
                    }
                    label={
                      mode === "light" ? t("sidebar.light") : t("sidebar.dark")
                    }
                  />
                )}
                {item.id === "language-toggle" && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={i18n.language === "ar"}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleLanguage();
                        }}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: theme.palette.secondary.main,
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.08)",
                            },
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: theme.palette.secondary.main,
                            },
                        }}
                      />
                    }
                    label={
                      i18n.language === "en"
                        ? t("languages.en")
                        : t("languages.ar")
                    }
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          textAlign: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          {t("sidebar.contact")}
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "center", gap: 2 }}
          dir="ltr"
        >
          <IconButton
            component="a"
            href="mailto:mahmoud.taha.ghanem@gmail.com"
            target="_blank"
            sx={{
              color: theme.palette.secondary.main,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
              },
            }}
          >
            <EmailIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://wa.me/963968139188"
            target="_blank"
            sx={{
              color: theme.palette.secondary.main,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
              },
            }}
          >
            <WhatsAppIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://github.com/mahmoud-t-ghanem"
            target="_blank"
            sx={{
              color: theme.palette.secondary.main,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
              },
            }}
          >
            <GitHubIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://www.linkedin.com/in/mahmoud-ghanem-133245314?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            sx={{
              color: theme.palette.secondary.main,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
              },
            }}
          >
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={sidebarVisible}
        onClose={toggleDrawer(false)}
        anchor="right"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
