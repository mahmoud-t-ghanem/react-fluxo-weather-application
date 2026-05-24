import "./App.css";
import { WeatherProvider } from "./contexts/WeatherContext";
import AppContent from "./components/AppContent";

function App() {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
}

export default App;
