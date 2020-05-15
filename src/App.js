import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// App Bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LocationPicker from './components/LocationPicker'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  // App Bar
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  // Grid
  grid_main: {
    flexGrow: 1,
    marginTop: 40,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            HousingHelper
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <LocationPicker />

    </div>
  );
}