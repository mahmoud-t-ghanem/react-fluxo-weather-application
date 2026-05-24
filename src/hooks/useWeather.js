import { useEffect } from "react";
import { useWeatherContext } from "../contexts/WeatherContext";
import axios from "axios";
import { useTranslation } from "react-i18next";

export function useWeather() {
  const { t, i18n } = useTranslation();
  const {
    selectedCity,
    currentCoords,
    weatherData,
    setWeatherData,
    forecastData,
    setForecastData,
    units,
    setLoading,
    scrollToResults,
    setWeatherNotification,
  } = useWeatherContext();
  const LANG = i18n.language;

  useEffect(() => {
    if (selectedCity || currentCoords) {
      const latitude = selectedCity?.lat || currentCoords?.lat;
      const longitude = selectedCity?.lng || currentCoords?.lng;
      if (latitude === undefined || longitude === undefined) return;
      const key = process.env.REACT_APP_WEATHER_API_KEY;
      const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&lang=${LANG}&appid=${key}`;
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&lang=${LANG}&appid=${key}`;
      const getAllWeatherData = async () => {
        try {
          setLoading(true);
          const [currentRes, forecastRes] = await Promise.all([
            axios.get(currentWeatherURL),
            axios.get(forecastURL),
          ]);

          if (currentRes.data) {
            setWeatherData(currentRes.data);
          }
          if (forecastRes.data) {
            const todayString = new Date().toISOString().split("T")[0];
            const dailyForecast = forecastRes.data.list.filter((reading) => {
              const dateString = reading.dt_txt.split(" ")[0];
              return (
                dateString !== todayString &&
                reading.dt_txt.includes("12:00:00")
              );
            });
            setForecastData(dailyForecast);
            console.log("Filtered 5 Days Forecast (Noon):", dailyForecast);
          }

          if (currentRes.data && forecastRes.data) {
            scrollToResults();

            setWeatherNotification({
              open: true,
              severity: "success",
              message: t("success.successFetch"),
            });
          }
        } catch (error) {
          console.error("Weather Fetch Error: ", error);
          let errorKey = "errors.serverError";
          if (!error.response && error.request) {
            errorKey = "errors.network";
          }
          setWeatherNotification({
            open: true,
            severity: "error",
            message: t(errorKey),
          });
        } finally {
          setLoading(false);
        }
      };
      getAllWeatherData();
    }
  }, [
    selectedCity,
    setWeatherData,
    setForecastData,
    currentCoords,
    units,
    scrollToResults,
    setLoading,
    LANG,
    setWeatherNotification,
    t,
  ]);
  return { weatherData, forecastData };
}
