import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useWeatherContext } from "../contexts/WeatherContext";
import { useTranslation } from "react-i18next";
import { grey } from "@mui/material/colors";

export default function WeatherNotification() {
  const { weatherNotification, setWeatherNotification } = useWeatherContext();
  const { i18n } = useTranslation();

  const handleCloseNotification = () => {
    setWeatherNotification({ open: false, message: "", severity: "" });
  };
  return (
    <Snackbar
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      open={weatherNotification.open}
      autoHideDuration={4000}
      onClose={handleCloseNotification}
    >
      <Alert
        variant="filled"
        severity={weatherNotification.severity}
        sx={{
          display: "flex",
          alignItems: "center",
          color: grey[200],
          width: { xs: "80vw", md: "100%" },
          "& .MuiAlert-icon": {
            marginRight: "0px",
            marginInlineEnd: "7px",
          },
        }}
      >
        {weatherNotification.message}
      </Alert>
    </Snackbar>
  );
}
