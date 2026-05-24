import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
} from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";

import { useWeatherContext } from "../contexts/WeatherContext";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="right" ref={ref} {...props} timeout={700} />
));

export default function About() {
  const { openAbout, setOpenAbout } = useWeatherContext();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  return (
    <>
      <Dialog
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        open={openAbout}
        onClose={() => setOpenAbout(false)}
        TransitionComponent={Transition}
        aria-labelledby="about-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            border: `2px solid ${theme.palette.secondary.main}`,
            borderRadius: "12px",
            margin: { xs: 2, sm: "auto" },
            maxWidth: "500px",
            backgroundColor: theme.palette.primary.main,
            backgroundImage: "none",
          },
        }}
      >
        <DialogTitle
          id="about-dialog-title"
          color={theme.palette.secondary.main}
          sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
        >
          {t("about.title")}{" "}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              letterSpacing: "4px",
              cursor: "default",
              color: theme.palette.text.main,
              display: "inline-block",
            }}
          ></Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: "1rem", mb: 2 }}
          >
            {t("about.description")}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9rem", lineHeight: 2 }}
          >
            <strong>{t("about.dataSource")}:</strong> OpenWeatherMap API
            <br />
            <strong>{t("about.techStack")}:</strong> React, Material UI, Context
            API
            <br />
            <strong>{t("about.developer")}:</strong> {t("about.devName")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpenAbout(false)}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
              border: `2px solid ${theme.palette.secondary.main}`,
              fontWeight: "bold",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            {t("about.closeBtn")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
