import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

const WeatheCardItem = ({ forecast }) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednsday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let imageIcon = '';
  const today = new Date();

  if (today.getHours() > 17) {
    imageIcon = forecast.Night.Icon;
  } else {
    imageIcon = forecast.Day.Icon;
  }
  if (imageIcon < 10) imageIcon = '0' + imageIcon;

  const img = `https://developer.accuweather.com/sites/default/files/${imageIcon}-s.png`;

  return (
    <Grid item xs={12} sm={2}>
      <Card style={{ height: '200px' }}>
        <CardContent>
          <Typography variant="h6" align="center">
            {days[new Date(forecast.Date).getDay()]}
          </Typography>
          <Typography align="center">
            Max: {forecast.Temperature.Maximum.Value}{' '}
            {forecast.Temperature.Maximum.Unit}
          </Typography>
          <Typography align="center">
            Min: {forecast.Temperature.Minimum.Value}{' '}
            {forecast.Temperature.Maximum.Unit}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{
            width: 100,
            heigth: 100,
            margin: 'auto',
          }}
          image={img}
        />
      </Card>
    </Grid>
  );
};

export default WeatheCardItem;
