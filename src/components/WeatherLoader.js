import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { keyframes } from "@mui/system";
import { deepOrange } from "@mui/material/colors";
import SunnyIcon from "@mui/icons-material/Sunny";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const pulse = keyframes`
  0% { opacity: 0.4; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.4; transform: scale(0.95); }
`;

const WeatherLoader = ({ open }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.5),
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        pointerEvents: "all",
      }}
    >
      <SunnyIcon
        sx={{
          fontSize: 110,
          color: deepOrange[500],
          animation: `${pulse} 2.5s infinite ease-in-out`,
          filter: (theme) =>
            `drop-shadow(0px 0px 20px ${alpha(theme.palette.secondary.main, 0.5)})`,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          mt: 4,
          fontWeight: 900,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: theme.palette.text.main,
          animation: `${pulse} 2.5s infinite ease-in-out`,
        }}
      >
        {t("weatherLoader.text")}
      </Typography>
    </Box>
  );
};

export default WeatherLoader;
