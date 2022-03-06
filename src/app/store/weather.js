import axios from 'axios';
import {
  API_CURRENT_WEATHER,
  API_FORECAST_5_DAYS,
  API_KEY,
} from '../../config';

const { createSlice } = require('@reduxjs/toolkit');

const slice = createSlice({
  name: 'weather',
  initialState: {
    current: {
      Key: '212482',
      name: 'Tel Aviv',

      details: [
        {
          WeatherText: '',
          WeatherIcon: 13,
          Temperature: {
            Metric: {
              Value: 20.4,
              Unit: 'C',
              UnitType: 17,
            },
            Imperial: {
              Value: 69,
              Unit: 'F',
              UnitType: 18,
            },
          },
        },
      ],
    },
    metric: true,
    forecast: null,
    loading: false,
    hasError: false,
    favorites: [],
  },
  reducers: {
    currentRequested: (state, action) => {
      state.loading = true;
    },
    currenrReceived: (state, action) => {
      if (action.payload.Key) {
        state.current.Key = action.payload.Key;
        state.current.name = action.payload.name;
      } else if (action.payload.forecast) {
        state.forecast = action.payload.forecast;
      } else {
        state.current.details = { ...action.payload };
      }
      state.loading = false;
      state.hasError = false;
    },
    currentFailed: (state, action) => {
      state.loading = false;
      state.hasError = true;
    },
    toggleFavorite: (state, action) => {
      const idx = state.favorites.findIndex(f => f.Key === action.payload.Key);
      idx !== -1
        ? state.favorites.splice(idx, 1)
        : state.favorites.push(action.payload);
    },
  },
});

export const {
  currentRequested,
  currenrReceived,
  currentFailed,
  toggleFavorite,
} = slice.actions;
export default slice.reducer;

//Selector
export const cityDetails = ({ weather }) => {
  let { Key, name } = weather.current;
  let {
    WeatherText,
    WeatherIcon,
    Temperature: { Imperial, Metric },
  } = weather.current.details[0];
  let { Unit: IUnit, Value: IValue } = Imperial;
  let { Unit: MUnit, Value: MValue } = Metric;
  if (WeatherIcon < 10) {
    WeatherIcon = '0' + WeatherIcon;
  }

  return {
    Key,
    name,
    WeatherText,
    WeatherIcon,
    IUnit,
    IValue,
    MUnit,
    MValue,
  };
};

export const updateCity = city => currenrReceived(city);

export const getWeather = key => async dispatch => {
  dispatch(currentRequested());
  try {
    const response = await axios.get(
      `${API_CURRENT_WEATHER}/${key}?apikey=${API_KEY}`
    );

    dispatch(currenrReceived(response.data));
  } catch (error) {
    dispatch(currentFailed());
  }
};

export const getForecast = key => async (dispatch, getState) => {
  dispatch(currentRequested());
  try {
    const response = await axios.get(
      `${API_FORECAST_5_DAYS}/${key}?apikey=${API_KEY}&metric=${
        getState().weather.metric
      }`
    );
    console.log(response.data.DailyForecasts);
    dispatch(currenrReceived({ forecast: response.data.DailyForecasts }));
  } catch (error) {
    dispatch(currentFailed());
  }
};
