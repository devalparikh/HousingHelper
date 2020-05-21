import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

// App Bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LocationPicker from './components/LocationPicker'
import Drawer from '@material-ui/core/Drawer';


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
  list: {
    width: 250,
  },
  drawerButton: {
    fontWeight: 800, 
    fontSize: "30px", 
    marginTop:"20px",

    width: "90%",
    borderBottom: "1px solid rgb(226, 226, 226)",

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
  const [state, setState] = React.useState({
    mobile: false,
  });
  const [mobile, setMobile] = useState(0);



  React.useEffect(() => {
    // Update the document title using the browser API
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    if (mediaQuery.matches) {
      setMobile(false);
    } else {
      setMobile(true);
    }
    mediaQuery.addListener((mq) => {
      if (mq.matches) {
        setMobile(false);
      } else {
        setMobile(true);
      }
    });
  }, []);

  // Toggle Side Bar
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, "left": open });
  };

  function renderTabs() {
    if(mobile === false) {
      return(
        <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                HousingHelper
              </Typography>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Sign Up</Button>
            </Toolbar>
          </AppBar>
      )  
    } else {
      return(
        <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon onClick={toggleDrawer("left", true)}/>
                <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                  <div style={{justifyContent:"center", marginTop: "10px"}} className={classes.list}>
                    {/* <center>
                      <Button style={{backgroundColor: "#3f51b5", color: "white", width:"90%", height:"50px", marginTop: "10px"}} color="inherit">Login</Button>
                      <Button style={{backgroundColor: "#3f51b5", color: "white", width:"90%", height:"50px", marginTop: "10px"}} color="inherit">Sign Up</Button>
                    </center> */}
                    <Button onClick={toggleDrawer("left", false)} style={{backgroundColor: "#3f51b5", color: "white", width:"40px", margin: "10px", marginLeft: "10", borderRadius: "50px"}} color="inherit">X</Button>
                    <Button href="/" className={classes.drawerTitle} color="inherit">HousingHelper</Button>
                    <Button href="/login" className={classes.drawerButton} color="inherit">Login</Button>
                    <Button className={classes.drawerButton} color="inherit">Sign Up</Button>
                  </div>
                </Drawer>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                HousingHelper
              </Typography>

            </Toolbar>
          </AppBar>
      )
    }
  }

  return (
    <Router>
      <div className={classes.root}>
        {renderTabs()}
        <Route path="/login" exact component={LocationPicker} />
        {/* <LocationPicker /> */}

      </div>
    </Router>
  );
}