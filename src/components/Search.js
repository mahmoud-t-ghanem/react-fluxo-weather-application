import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import NearMeIcon from "@mui/icons-material/NearMe";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { useCities } from "../hooks/useCities";
import { useWeatherContext } from "../contexts/WeatherContext";
import { getUserLocation } from "../utils/getUserLocation";
import { useTranslation } from "react-i18next";

const filter = createFilterOptions();

export default function Search() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const {
    inputValue,
    setInputValue,
    selectedCity,
    setSelectedCity,
    setCurrentCoords,
    searchInputRef,
    setWeatherNotification,
    setLoading,
  } = useWeatherContext();

  const { options, searchLoading } = useCities(inputValue);
  const [open, setOpen] = useState(false);

  const isRtl = i18n.language === "ar";

  const locationOption = {
    isMyLocation: true,
    name: t("search.locateMe"),
  };
  return (
    <Stack
      dir={isRtl ? "rtl" : "ltr"}
      spacing={2}
      sx={{
        width: {
          xs: "100%",
          sm: "80%",
          md: "55%",
        },
        backgroundColor: theme.palette.primary.main,
        borderRadius: open ? "20px 20px 0px 0px" : "20px",
        overflow: "hidden",
        marginTop: "20vh",
        transition: "all 0.3s ease",
        boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Autocomplete
        inputValue={inputValue}
        forcePopupIcon={false}
        disableClearable
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "20px !important",
            paddingInlineStart: "8px !important",
            paddingInlineEnd: "12px !important",
            display: "flex",
            alignItems: "center",
            "& fieldset": { border: "none !important" },
            "&:hover fieldset": { border: "none !important" },
            "&.Mui-focused fieldset": { border: "none !important" },
            borderBottomLeftRadius: open ? "0px !important" : "20px !important",
            borderBottomRightRadius: open
              ? "0px !important"
              : "20px !important",
            "& input": {
              color: theme.palette.text.main,
              fontSize: "1rem",
              fontWeight: "500",
              outline: "none !important",
              padding: "12px 4px !important",
              paddingRight: "4px !important",
              paddingLeft: "4px !important",
            },
            "& input::placeholder": {
              color: theme.palette.text.main,
              opacity: 0.7,
            },
            "& input::-webkit-input-placeholder": {
              color: theme.palette.text.main,
              opacity: 0.7,
            },
            outline: "none !important",
          },
          "& .MuiAutocomplete-endAdornment": {
            display: "none !important",
          },
          "& input::-webkit-search-cancel-button": {
            WebkitAppearance: "none",
            display: "none",
          },
        }}
        slotProps={{
          paper: {
            dir: isRtl ? "rtl" : "ltr",
            sx: {
              backgroundColor: theme.palette.primary.main,
              borderTop: `3px solid ${theme.palette.secondary.main}`,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
              borderRadius: "0px !important",
              borderBottomRightRadius: "20px !important",
              borderBottomLeftRadius: "20px !important",
              "& .MuiAutocomplete-listbox": {
                paddingTop: "0px !important",
                paddingBottom: "0px !important",
                "& .MuiAutocomplete-option": {
                  paddingTop: "14px !important",
                  paddingBottom: "14px !important",
                  paddingInlineStart: "20px !important",
                  paddingInlineEnd: "20px !important",
                },
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: theme.palette.text.main,
                },
              },
            },
          },
        }}
        freeSolo
        id="city-search"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={(event, reason) => {
          if (reason === "blur" || reason === "selectOption") {
            setOpen(false);
          }
        }}
        value={selectedCity}
        loading={searchLoading}
        options={options}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          return [locationOption, ...filtered];
        }}
        openOnFocus={true}
        includeInputInList
        getOptionLabel={(option) => {
          if (typeof option === "string") return option;
          if (option.isMyLocation) return "";
          return `${option.name}, ${option.countryName}`;
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={async (event, newValue) => {
          if (newValue?.isMyLocation) {
            try {
              setLoading(true);
              setSelectedCity(null);
              setInputValue("");
              const coords = await getUserLocation();
              setCurrentCoords({ lat: coords.lat, lng: coords.lng });
            } catch (error) {
              console.error("Location Fetch Error Key: ", error);
              setWeatherNotification({
                open: true,
                severity: "error",
                message: t(error),
              });
            }
          } else {
            setSelectedCity(newValue);
          }
        }}
        renderOption={(props, option) => {
          const { key, ...otherProps } = props;
          return (
            <Box
              component="li"
              key={option.isMyLocation ? "static-location" : option.geonameId}
              {...otherProps}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: theme.palette.text.main,
              }}
            >
              {option.isMyLocation ? (
                <>
                  <NearMeIcon
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: "1.2rem",
                    }}
                  />
                  <span
                    style={{
                      fontWeight: "600",
                      color: theme.palette.text.main,
                    }}
                  >
                    {option.name}
                  </span>
                </>
              ) : (
                <span>{`${option.name}, ${option.countryName}`}</span>
              )}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={searchInputRef}
            placeholder={t("search.placeholder")}
            slotProps={{
              input: {
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      margin: 0,
                      marginInlineStart: "4px",
                      marginInlineEnd: "4px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SearchIcon sx={{ color: theme.palette.secondary.main }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {searchLoading && (
                      <CircularProgress
                        size={18}
                        sx={{ color: theme.palette.text.main }}
                      />
                    )}
                    {inputValue && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          setInputValue("");
                          setSelectedCity(null);
                        }}
                        sx={{
                          color: theme.palette.secondary.main,
                          transition: "all 0.2s ease-in-out",
                          padding: "2px !important",
                          "&:hover": {
                            backgroundColor: "rgba(255, 87, 34, 0.4)",
                            transform: "scale(1.1)",
                            color: theme.palette.text.main,
                          },
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ),
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
