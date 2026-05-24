import React from "react";
import { Box, Typography, Container, Fade, Divider } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useTheme } from "@mui/material";
import { blue, deepPurple, grey, red, yellow } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DevicesIcon from "@mui/icons-material/Devices";
import PsychologyIcon from "@mui/icons-material/Psychology";
const WeatherTips = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const weatherTips = [
    {
      id: 1,
      title: t("weatherTips.items.hydration.title"),
      content: t("weatherTips.items.hydration.content"),
      icon: (
        <WaterDropIcon
          sx={{ color: blue[500], fontSize: { xs: "2rem", md: "2.5rem" } }}
        />
      ),
    },
    {
      id: 2,
      title: t("weatherTips.items.visibility.title"),
      content: t("weatherTips.items.visibility.content"),
      icon: (
        <DirectionsCarIcon
          sx={{ color: yellow[500], fontSize: { xs: "2rem", md: "2.5rem" } }}
        />
      ),
    },
    {
      id: 3,
      title: t("weatherTips.items.devices.title"),
      content: t("weatherTips.items.devices.content"),
      icon: (
        <DevicesIcon
          sx={{ color: red[500], fontSize: { xs: "2rem", md: "2.5rem" } }}
        />
      ),
    },
    {
      id: 4,
      title: t("weatherTips.items.productivity.title"),
      content: t("weatherTips.items.productivity.content"),
      icon: (
        <PsychologyIcon
          sx={{
            color: deepPurple[500],
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        />
      ),
    },
  ];

  return (
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
        {t("weatherTips.subTitle")}
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
        {t("weatherTips.mainTitle")}
      </Typography>
      <Divider
        sx={{
          bgcolor: theme.palette.secondary.main,
          width: "80px",
          height: "4px",
          mb: 4,
        }}
      />
      {weatherTips.map((tip) => (
        <Box
          key={tip.id}
          sx={{
            width: "100%",
            minHeight: "20vh",
            bgcolor: theme.palette.primary.main,
            borderLeft: `10px solid ${theme.palette.secondary.main}`,
            color: theme.palette.text.main,
            borderRadius: "20px",
            py: 4,
            mb: "2vh",
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-3px)",
            },
            "&:last-child": {
              mb: 0,
            },
          }}
        >
          <Container maxWidth="lg">
            <Fade in={true} timeout={1500}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: {
                    xs: "center",
                    md: i18n.language === "ar" ? "right" : "left",
                  },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", md: "flex-start" },
                      mb: 2,
                    }}
                  >
                    <LightbulbIcon
                      sx={{
                        color: theme.palette.secondary.main,
                        fontSize: "2rem",
                        marginInlineEnd: 2,
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 900,
                        letterSpacing: "1px",
                      }}
                    >
                      {tip.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 300,
                      maxWidth: "800px",
                      lineHeight: 1.6,
                    }}
                  >
                    {tip.content}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  {tip.icon}
                </Typography>
              </Box>
            </Fade>
          </Container>
        </Box>
      ))}
    </Container>
  );
};

export default WeatherTips;
