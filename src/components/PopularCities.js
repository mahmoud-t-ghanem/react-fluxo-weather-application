import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import { useTheme } from "@emotion/react";

import { useWeatherContext } from "../contexts/WeatherContext";
import { grey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

export default function PopularCities() {
  const { t, i18n } = useTranslation();
  const { selectedCity, setSelectedCity } = useWeatherContext();
  const theme = useTheme();

  const popularCities = [
    {
      name: "Damascus",
      lat: "33.5102",
      lng: "36.29128",
      geonameId: 170654,
      countryCode: "SY",
      countryName: "Syria",
      adminName1: "Damascus",
    },
    {
      name: "Dubai",
      lat: "25.0657",
      lng: "55.17128",
      geonameId: 292223,
      countryCode: "AE",
      countryName: "United Arab Emirates",
      adminName1: "Dubai",
    },
    {
      name: "Paris",
      lat: "48.85341",
      lng: "2.3488",
      geonameId: 2988507,
      countryCode: "FR",
      countryName: "France",
      adminName1: "Île-de-France",
    },
    {
      name: "New York",
      lat: "40.71427",
      lng: "-74.00597",
      geonameId: 5128581,
      countryCode: "US",
      countryName: "United States",
      adminName1: "New York",
    },
    {
      name: "London",
      lat: "51.50853",
      lng: "-0.12574",
      geonameId: 2643743,
      countryCode: "GB",
      countryName: "United Kingdom",
      adminName1: "England",
    },
  ];

  const Cities = popularCities.map((city) => {
    const isSelected = selectedCity?.geonameId === city.geonameId;
    return (
      <Button
        variant="contained"
        size="large"
        key={city.geonameId}
        onClick={(event) => {
          setSelectedCity(city);
        }}
        sx={{
          backgroundColor:
            isSelected === true
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
          color:
            isSelected === true
              ? theme.palette.secondary.main
              : theme.palette.primary.main,
          border:
            isSelected === true
              ? `4px solid ${theme.palette.secondary.main}`
              : `4px solid transparent`,
          fontWeight: "bold",
          fontSize: { xs: "0.8rem", sm: "1rem" },
          textTransform: "uppercase",
          letterSpacing: "1px",
          px: 4,
          py: 1.5,
          borderRadius: "20px",
          boxShadow: `0 8px 20px ${theme.palette.secondary.main}44`,
          transition: "all 0.3s ease-in-out",
          cursor: "pointer",
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
        {t(`popularCities.cities.${city.name}`)}
      </Button>
    );
  });

  return (
    <Box sx={{ mt: 4, mb: 4 }} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Typography
        variant="overline"
        sx={{
          color: theme.palette.secondary.main,
          fontWeight: "bold",
          letterSpacing: "3px",
          fontSize: "0.9rem",
          display: "block",
          mb: 0.5,
        }}
      >
        {t("popularCities.quickAccess")}
      </Typography>

      <Typography
        variant="h4"
        sx={{
          color: grey[300],
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "1px",
          mb: 1.5,
        }}
      >
        {t("popularCities.title")}
      </Typography>

      <Divider
        sx={{
          bgcolor: theme.palette.secondary.main,
          width: "50px",
          height: "3px",
          mb: 4,
          borderRadius: "2px",
        }}
      />
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {Cities}
      </Stack>
    </Box>
  );
}
