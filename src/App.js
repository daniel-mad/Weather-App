import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherDetails from './pages/WeatherDetails';
import FavoritesScreen from './pages/FavoritesScreen';
import NotFound from './pages/NotFound';
import AppNavigator from './components/AppNavigator';
import { Container } from '@mui/material';

function App() {
  return (
    <Router>
      <AppNavigator />
      <Routes>
        <Route path="/" element={<WeatherDetails />} />
        <Route path="/favorite" element={<FavoritesScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
