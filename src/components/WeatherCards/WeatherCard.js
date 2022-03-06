import { Favorite } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { height } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  cityDetails,
  getForecast,
  getWeather,
  toggleFavorite,
  updateCity,
} from '../../app/store/weather';
import WeatheCardItem from './WeatheCardItem';

const useStyles = makeStyles(theme => ({
  weatherImage: {
    width: '100%',
    height: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderDisabled: {
    border: 'none !important',
    boxShadow: 'none !important',
    width: '200px',
  },
  favorite: {
    width: 50,
    height: 50,
  },
  text: {
    textTransform: 'uppercase',
    color: '#1976d2',
  },
  weatherDetails: {
    display: 'flex',
    alignItems: 'center',
    height: '40vh',
  },
  forecast: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const WeatherCard = ({ current, forecast }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const favorites = useSelector(state => state.weather.favorites);

  useEffect(() => {
    if (current.Key != null) {
      dispatch(getWeather(current.Key));
      dispatch(getForecast(current.Key));
    }
  }, [current.Key]);

  const { Key, name, WeatherText, WeatherIcon, IUnit, IValue, MUnit, MValue } =
    useSelector(state => cityDetails(state));

  const handleFavorite = (Key, name) => {
    dispatch(toggleFavorite({ Key, name }));
  };
  return (
    <Paper elevation={1} style={{ height: '80vh', padding: '20px' }}>
      <Grid container>
        <Grid item className={classes.header} xs={12}>
          <Box sx={{ display: 'flex' }} component="div">
            <img
              src={`https://developer.accuweather.com/sites/default/files/${WeatherIcon}-s.png`}
              className={classes.weatherImage}
            />
            <Card className={classes.borderDisabled}>
              <CardContent>
                <Typography>{name}</Typography>
                <Typography>{MValue}</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" className={classes.text}>
              Add to Favorites
            </Typography>
            <Button
              onClick={() => handleFavorite(Key, name)}
              className={classes.favorite}
            >
              <Favorite
                style={{
                  color: favorites.find(f => f.Key === Key) ? 'red' : 'grey',
                  fontSize: '50px',
                }}
              />
            </Button>
          </Box>
        </Grid>
        <Grid item className={classes.weatherDetails} xs={12}>
          <Typography
            variant="h2"
            style={{ textAlign: 'center', width: '100%' }}
          >
            {WeatherText}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.forecast}>
        {forecast ? (
          forecast.map(forecast => (
            <WeatheCardItem key={forecast.EpochDate} forecast={forecast} />
          ))
        ) : (
          <Box
            sx={{
              height: '40vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </Paper>
  );
};

export default WeatherCard;
