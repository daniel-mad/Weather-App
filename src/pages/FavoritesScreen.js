import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteCard from '../components/Favorites/FavoriteCard';

const FavoritesScreen = () => {
  const favorites = useSelector(state => state.weather.favorites);
  return (
    <Grid container spacing={4} margin="20px 0 0 10px">
      {favorites.map(fav => (
        <FavoriteCard favorite={fav} />
      ))}
    </Grid>
  );
};

export default FavoritesScreen;
