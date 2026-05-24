import React from "react";
import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <Box
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      component="footer"
      sx={{
        py: 5,
        px: 2,
        mt: "auto",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.main,
        borderTop: `2px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center">
          <Typography
            onClick={() => window.location.reload()}
            variant="h4"
            sx={{
              fontWeight: 900,
              letterSpacing: "4px",
              cursor: "pointer",
            }}
          >
            FLU
            <Box component="span" sx={{ color: theme.palette.secondary.main }}>
              X
            </Box>
            O
          </Typography>

          <Stack direction="row" spacing={2} dir="ltr">
            <IconButton
              component="a"
              href="mailto:mahmoud.taha.ghanem@gmail.com"
              target="_blank"
              sx={{
                color: theme.palette.text.main,
                transition: "0.3s",
                "&:hover": {
                  color: theme.palette.secondary.main,
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
                color: theme.palette.text.main,
                transition: "0.3s",
                "&:hover": {
                  color: theme.palette.secondary.main,
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
                color: theme.palette.text.main,
                transition: "0.3s",
                "&:hover": {
                  color: theme.palette.secondary.main,
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
                color: theme.palette.text.main,
                transition: "0.3s",
                "&:hover": {
                  color: theme.palette.secondary.main,
                  transform: "translateY(-3px)",
                },
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>

          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.main, mb: 0.5 }}
            >
              © {currentYear}{" "}
              <strong
                onClick={() => window.location.reload()}
                style={{
                  color: theme.palette.secondary.main,
                  cursor: "pointer",
                }}
              >
                FLUXO
              </strong>
              . {t("footer.rights")}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.main, display: "block" }}
            >
              {t("footer.credits")}
            </Typography>
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.main,
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {t("footer.techTag")}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
