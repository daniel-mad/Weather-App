import { Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCards/WeatherCard';

const WeatherDetails = () => {
  const { current, forecast } = useSelector(store => store.weather);

  return (
    <>
      <SearchBar />
      <Container>
        <WeatherCard current={current} forecast={forecast} />
      </Container>
    </>
  );
};

export default WeatherDetails;
