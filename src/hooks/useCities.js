import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useWeatherContext } from "../contexts/WeatherContext";

export function useCities(inputValue) {
  const { t, i18n } = useTranslation();
  const [options, setOptions] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { setWeatherNotification } = useWeatherContext();
  const USERNAME = process.env.REACT_APP_GEONAMES_USERNAME;
  const LANG = i18n.language;

  useEffect(() => {
    if (inputValue.length > 1) {
      const getCities = async () => {
        try {
          setSearchLoading(true);
          const URL = `https://secure.geonames.org/searchJSON?name_startsWith=${encodeURIComponent(inputValue)}&featureClass=P&cities=cities1000&orderby=population&maxRows=50&lang=${LANG}&username=${USERNAME}`;
          const response = await axios.get(URL);

          console.log(response);
          if (response.data.geonames && response.data.geonames.length > 0) {
            setOptions(response.data.geonames);
          }
        } catch (error) {
          console.error("Cities Fetch Error: ", error);
          setWeatherNotification({
            open: true,
            severity: "error",
            message: t("errors.network"),
          });
        } finally {
          setSearchLoading(false);
        }
      };
      const delay = setTimeout(() => {
        getCities();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      setOptions([]);
    }
  }, [inputValue, LANG, setWeatherNotification, t, USERNAME]);
  return { options, searchLoading };
}
