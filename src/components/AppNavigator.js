import { Menu } from '@mui/icons-material';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  links: {
    textDecoration: 'none',
    color: 'inherit',
    '&hover': {
      color: 'red !important',
    },
  },
  activeLink: {
    fontWeight: 'bold',
    color: 'inherit',
    borderBottom: '3px solid ',
  },
}));

const AppNavigator = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit">
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link className={classes.links} to="/">
            Weather App
          </Link>
        </Typography>
        <Button color="inherit">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${classes.links} ${classes.activeLink}`
                : classes.links
            }
            to="/"
          >
            Home
          </NavLink>
        </Button>
        <Button color="inherit">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${classes.links} ${classes.activeLink}`
                : classes.links
            }
            to="/favorite"
          >
            Favorite
          </NavLink>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigator;
