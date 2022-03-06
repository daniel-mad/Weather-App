import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCity } from '../../app/store/weather';

const FavoriteCard = ({ favorite }) => {
  const dispatch = useDispatch();
  const changeCity = () => {
    dispatch(updateCity({ Key: favorite.Key, name: favorite.name }));
  };
  return (
    <Grid item md={4} xl={2} xs={12}>
      <Link to={`/`} style={{ textDecoration: 'none' }} onClick={changeCity}>
        <Card style={{ maxWidth: '300px', height: '200px' }}>
          <CardContent style={{ maxWidth: '300px' }}>
            <Typography align="center">{favorite.name}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default FavoriteCard;
