import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

// create context :
const WeatherContext = createContext(null);

// create provider :
export function WeatherProvider({ children }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [units, setUnits] = useState("metric");
  const [openAbout, setOpenAbout] = useState(false);
  const [mode, setMode] = useState("dark");
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);
  const resultsSectionRef = useRef(null);
  const scrollToResults = useCallback(() => {
    setTimeout(() => {
      if (resultsSectionRef.current) {
        resultsSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 500);
  }, []);
  const [weatherNotification, setWeatherNotification] = useState({
    open: false,
    severity: "",
    message: "",
  });
  return (
    <WeatherContext.Provider
      value={{
        inputValue,
        setInputValue,
        selectedCity,
        setSelectedCity,
        currentCoords,
        setCurrentCoords,
        weatherData,
        setWeatherData,

        forecastData,
        setForecastData,

        sidebarVisible,
        setSidebarVisible,
        units,
        setUnits,
        openAbout,
        setOpenAbout,
        mode,
        setMode,
        loading,
        setLoading,
        searchInputRef,
        resultsSectionRef,
        scrollToResults,
        weatherNotification,
        setWeatherNotification,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

// custom hook for consumer :
export const useWeatherContext = () => useContext(WeatherContext);
