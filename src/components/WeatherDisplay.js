import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Stack,
  Paper,
  Button,
  Container,
} from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";

import { useWeather } from "../hooks/useWeather";
import { useWeatherContext } from "../contexts/WeatherContext";
import { useTheme } from "@emotion/react";

import { useTranslation } from "react-i18next";

import moment from "moment";
import "moment/locale/ar";

function WeatherDetailItem({ icon, label, value }) {
  const theme = useTheme();
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 1.5, md: 2 },
        textAlign: "center",
        borderRadius: "20px",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.main,
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <Box sx={{ mb: 1, display: "flex" }}>{icon}</Box>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight="600"
        sx={{ fontSize: { xs: "0.8rem", md: "1.1rem" }, mb: 0.5 }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
      >
        {value}
      </Typography>
    </Paper>
  );
}

export default function WeatherDisplay() {
  const { weatherData, forecastData } = useWeather();

  const { units, searchInputRef, resultsSectionRef } = useWeatherContext();
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const cityTimeUtc = moment
    .unix(weatherData?.dt)
    .utcOffset(weatherData?.timezone / 60);
  cityTimeUtc.locale(i18n.language);
  const formattedDateTime = cityTimeUtc.format("dddd, D MMMM | hh:mm a");

  const handleBackToSearch = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 600);
  };

  if (!weatherData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", mt: 2, mb: 4 }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<SearchIcon sx={{ fontSize: "1.5rem !important" }} />}
            onClick={handleBackToSearch}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              px: 6,
              py: 2,
              borderRadius: "20px",
              boxShadow: `0 8px 20px ${theme.palette.secondary.main}44`,
              transition: "all 0.3s ease-in-out",
              cursor: "pointer",
              border: `4px solid transparent`,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                transform: "translateY(-5px)",
                boxShadow: `0 12px 25px ${theme.palette.secondary.main}66`,
                "& .MuiButton-startIcon": {
                  transform: "rotate(15deg) scale(1.2)",
                },
              },
              "&:active": {
                transform: "translateY(0)",
              },

              animation: "pulse 2.5s infinite",
              "@keyframes pulse": {
                "0%": {
                  boxShadow: `0 0 0 0 ${theme.palette.secondary.main}77`,
                },
                "70%": {
                  boxShadow: `0 0 0 15px ${theme.palette.secondary.main}00`,
                },
                "100%": {
                  boxShadow: `0 0 0 0 ${theme.palette.secondary.main}00`,
                },
              },
            }}
          >
            {t("weatherDisplay.findCity")}
          </Button>
        </Stack>
      </Box>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ pt: 2, pb: 2 }}
        ref={resultsSectionRef}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <Typography
          variant="overline"
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: "bold",
            letterSpacing: "3px",
            fontSize: "1rem",
          }}
        >
          {t("weatherDisplay.liveReport")}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: grey[900],
            fontWeight: 900,
            mb: 2,
            textTransform: "uppercase",
          }}
        >
          {t("weatherDisplay.currentStatus")}
        </Typography>
        <Divider
          sx={{
            bgcolor: theme.palette.secondary.main,
            width: "80px",
            height: "4px",
          }}
        />

        <Box
          sx={{
            mx: "auto",
            pt: 4,
            width: "100%",
          }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
              backgroundColor: "transparent",
              boxShadow: `0 20px 40px ${theme.palette.secondary.main}22`,
              border: `2px solid ${theme.palette.secondary.main}33`,
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: `0 30px 60px ${theme.palette.secondary.main}33`,
                borderColor: theme.palette.secondary.main,
              },
              animation: "pulse 3s infinite",
              "@keyframes pulse": {
                "0%": {
                  boxShadow: `0 0 0 0 ${theme.palette.secondary.main}44`,
                },
                "70%": {
                  boxShadow: `0 0 0 20px ${theme.palette.secondary.main}00`,
                },
                "100%": {
                  boxShadow: `0 0 0 0 ${theme.palette.secondary.main}00`,
                },
              },
            }}
          >
            <CardContent
              sx={{
                p: { xs: 3, sm: 5 },
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.background.paper} 100%)`,
              }}
            >
              <Box
                display="grid"
                gridTemplateColumns={{
                  xs: "1fr auto 1fr",
                  md: "1fr auto 1fr",
                }}
                alignItems="center"
                justifyContent="center"
                gap={{ xs: 2, md: 3 }}
                sx={{
                  wordBreak: "break-word",
                  textAlign: "center",
                  mb: { xs: 2, md: 3 },
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight="900"
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: { xs: "1.4rem", md: "2.8rem" },
                      letterSpacing: "-1px",
                      textTransform: "uppercase",
                    }}
                  >
                    {weatherData.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.main,
                      textTransform: "capitalize",
                      fontSize: { xs: "0.9rem", md: "1.1rem" },
                      fontWeight: 600,
                      letterSpacing: "1px",
                      mt: 0.5,
                    }}
                  >
                    {weatherData.weather[0].description}
                  </Typography>
                </Box>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    borderRightWidth: 2,
                    borderColor: `${theme.palette.secondary.main}22`,
                  }}
                />

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                >
                  <Box
                    component="img"
                    src={iconUrl}
                    alt="Weather Icon"
                    sx={{
                      width: { xs: 70, md: 110 },
                      height: { xs: 70, md: 110 },
                      filter: "drop-shadow(0px 8px 15px rgba(0,0,0,0.1))",
                    }}
                  />
                  <Typography
                    dir="ltr"
                    variant="h2"
                    fontWeight="900"
                    sx={{
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                      color: theme.palette.text.main,
                      display: "flex",
                      alignItems: "flex-start",
                      margin: "0px !important",
                    }}
                  >
                    {Math.round(weatherData.main.temp)}
                    <span
                      style={{
                        fontSize: "1.5rem",
                        color: theme.palette.secondary.main,
                        marginTop: "8px",
                      }}
                    >
                      {units === "metric" ? "°C" : "°F"}
                    </span>
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.main,
                    fontSize: { xs: "0.8rem", md: "0.95rem" },
                    fontWeight: 500,
                    opacity: 0.8,
                  }}
                >
                  {t("weatherDisplay.lastUpdated")}: {formattedDateTime}
                </Typography>
              </Box>

              <Divider
                sx={{
                  mb: { xs: 2, md: 3 },
                  mt: { xs: 1, md: 2 },
                  borderColor: `${theme.palette.secondary.main}22`,
                }}
              />

              <Box
                display="grid"
                gridTemplateColumns={{
                  xs: "1fr 1fr",
                  md: "1fr 1fr 1fr 1fr",
                }}
                gap={{ xs: 2, md: 3 }}
              >
                {[
                  {
                    icon: <WaterDropIcon />,
                    label: t("weatherDisplay.humidity"),
                    value: `${weatherData.main.humidity}%`,
                    color: "#00b0ff",
                  },
                  {
                    icon: <SpeedIcon />,
                    label: t("weatherDisplay.pressure"),
                    value: `${weatherData.main.pressure} ${t("weatherDisplay.pressureUnit")}`,
                    color: theme.palette.secondary.main,
                  },
                  {
                    icon: <AirIcon />,
                    label: t("weatherDisplay.wind"),
                    value: `${weatherData.wind.speed}${units === "metric" ? t("weatherDisplay.windUnitMetric") : t("weatherDisplay.windUnitImperial")}`,
                    color: "#4db6ac",
                  },
                  {
                    icon: <ThermostatIcon />,
                    label: t("weatherDisplay.maxTemp"),
                    value: `${Math.round(weatherData.main.temp_max)}°`,
                    color: "#ff5252",
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: "20px",
                      backgroundColor: `${theme.palette.background.default}`,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: "0.3s",
                      height: "100%",
                      "& .MuiPaper-root": {
                        height: "100% !important",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      },

                      "&:hover": {
                        borderColor: theme.palette.secondary.main,
                        transform: "scale(1.05)",
                        backgroundColor: `${theme.palette.secondary.main}05`,
                      },
                    }}
                  >
                    <WeatherDetailItem
                      icon={React.cloneElement(item.icon, {
                        sx: {
                          color: item.color,
                          fontSize: "1.5rem",
                        },
                      })}
                      label={item.label}
                      value={item.value}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <Container
        maxWidth="lg"
        sx={{ pt: 2, pb: 2 }}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <Typography
          variant="overline"
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: "bold",
            letterSpacing: "3px",
            fontSize: "1rem",
          }}
        >
          {t("weatherDisplay.extendedForecast")}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: grey[900],
            fontWeight: 900,
            mb: 2,
            textTransform: "uppercase",
          }}
        >
          {t("weatherDisplay.nextDays")}
        </Typography>
        <Divider
          sx={{
            bgcolor: theme.palette.secondary.main,
            width: "80px",
            height: "4px",
          }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            py: 4,
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",

            "&::-webkit-scrollbar": {
              height: "10px",
              display: "block",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: `${theme.palette.secondary.main}11`,
              borderRadius: "20px",
              margin: "0px 40px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "20px",
            },
          }}
        >
          {forecastData &&
            forecastData.map((day, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  scrollSnapAlign: "center",
                  minWidth: { xs: "320px", md: "420px" },
                  borderRadius: "20px",
                  overflow: "hidden",
                  backgroundColor: "transparent",
                  boxShadow: `0 20px 40px ${theme.palette.secondary.main}22`,
                  border: `2px solid ${theme.palette.secondary.main}33`,
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  flexShrink: 0,
                  animation: "pulse 3s infinite",
                  "@keyframes pulse": {
                    "0%": {
                      boxShadow: `0 0 0 0 ${theme.palette.secondary.main}44`,
                    },
                    "70%": {
                      boxShadow: `0 0 0 20px ${theme.palette.secondary.main}00`,
                    },
                    "100%": {
                      boxShadow: `0 0 0 0 ${theme.palette.secondary.main}00`,
                    },
                  },
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 30px 60px ${theme.palette.secondary.main}33`,
                    borderColor: theme.palette.secondary.main,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, sm: 4 },
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.background.paper} 100%)`,
                  }}
                >
                  <Box
                    display="grid"
                    gridTemplateColumns="1fr auto 1fr"
                    alignItems="center"
                    justifyContent="center"
                    gap={{ xs: 2, md: 3 }}
                    sx={{ textAlign: "center" }}
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="900"
                        sx={{
                          color: theme.palette.secondary.main,
                          textTransform: "uppercase",
                          fontSize: { xs: "1.2rem", md: "1.8rem" },
                          letterSpacing: "-1px",
                        }}
                      >
                        {new Date(day.dt * 1000).toLocaleDateString(
                          i18n.language,
                          {
                            weekday: "long",
                          },
                        )}
                      </Typography>
                    </Box>

                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderRightWidth: 2,
                        borderColor: `${theme.palette.secondary.main}22`,
                        height: "60px",
                        alignSelf: "center",
                      }}
                    />

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <Box
                        component="img"
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        sx={{
                          width: { xs: 50, md: 80 },
                          filter: "drop-shadow(0px 8px 15px rgba(0,0,0,0.1))",
                        }}
                      />
                      <Typography
                        dir="ltr"
                        variant="h4"
                        fontWeight="900"
                        sx={{
                          color: theme.palette.text.main,
                          fontSize: { xs: "1.8rem", md: "2.5rem" },
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        {Math.round(day.main.temp)}
                        <span
                          style={{
                            fontSize: "1rem",
                            color: theme.palette.secondary.main,
                            marginTop: "6px",
                          }}
                        >
                          °
                        </span>
                      </Typography>
                    </Stack>
                  </Box>

                  <Divider
                    sx={{
                      my: 3,
                      borderColor: `${theme.palette.secondary.main}22`,
                    }}
                  />

                  <Box
                    display="grid"
                    gridTemplateColumns="1fr 1fr 1fr 1fr"
                    gap={{ xs: 1, md: 2 }}
                  >
                    {[
                      {
                        icon: <WaterDropIcon />,
                        value: `${day.main.humidity}%`,
                        color: "#00b0ff",
                      },
                      {
                        icon: <SpeedIcon />,
                        value: `${day.main.pressure}`,
                        color: theme.palette.secondary.main,
                      },
                      {
                        icon: <AirIcon />,
                        value: `${Math.round(day.wind.speed)}`,
                        color: "#4db6ac",
                      },
                      {
                        icon: <ThermostatIcon />,
                        value: `${Math.round(day.main.temp_max)}°`,
                        color: "#ff5252",
                      },
                    ].map((item, i) => (
                      <Box
                        key={i}
                        sx={{
                          p: 1.5,
                          borderRadius: "20px",
                          backgroundColor: theme.palette.background.default,
                          border: `1px solid ${theme.palette.divider}`,
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "0.3s",
                          "&:hover": {
                            borderColor: theme.palette.secondary.main,
                            backgroundColor: `${theme.palette.secondary.main}05`,
                          },
                        }}
                      >
                        {React.cloneElement(item.icon, {
                          sx: { color: item.color, fontSize: "1.4rem" },
                        })}
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: "800",
                            color: theme.palette.text.primary,
                            mt: 0.5,
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Box>
      </Container>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", mt: 2, mb: 4 }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<SearchIcon sx={{ fontSize: "1.5rem !important" }} />}
            onClick={handleBackToSearch}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              px: 6,
              py: 2,
              borderRadius: "20px",
              boxShadow: `0 8px 20px ${theme.palette.secondary.main}44`,
              transition: "all 0.3s ease-in-out",
              cursor: "pointer",
              border: `4px solid transparent`,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                transform: "translateY(-5px)",
                boxShadow: `0 12px 25px ${theme.palette.secondary.main}66`,
                "& .MuiButton-startIcon": {
                  transform: "rotate(15deg) scale(1.2)",
                },
              },
              "&:active": {
                transform: "translateY(0)",
              },
              animation: "pulse 2.5s infinite",
              "@keyframes pulse": {
                "0%": {
                  boxShadow: `0 0 0 0 ${theme.palette.secondary.main}77`,
                },
                "70%": {
                  boxShadow: `0 0 0 15px ${theme.palette.secondary.main}00`,
                },
                "100%": {
                  boxShadow: `0 0 0 0 ${theme.palette.secondary.main}00`,
                },
              },
            }}
          >
            {t("weatherDisplay.findAnotherCity")}
          </Button>
        </Stack>
      </Box>
    </>
  );
}
