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
import NewPostPage from './components/NewPostPage'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import ProfilePage from './components/ProfilePage'
import OthersProfilePage from './components/OthersProfilePage'
import HomePage from './components/HomePage'
import LandingPage from './components/LandingPage'
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
  drawerTitle: {    
    fontWeight: 800,
    color: "white",
    textTransform: "initial",
    fontSize: "20px",
    marginLeft: "15px",
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
      if(localStorage.usertoken) {
        return(
          <AppBar position="static">
              <Toolbar className="main-color-bg">
                <a href="/" variant="h6" className={classes.title} style={{color: "white", fontWeight: "800", textDecoration: "none"}}>
                  HousingHelper
                </a>
                <Button href="/new" color="inherit">Post</Button>
                <Button href="/profile" color="inherit">Profile</Button>
                <Button onClick={logOut.bind(this)} color="inherit">Logout</Button>
              </Toolbar>
            </AppBar>
        ) 
      } else {
        return(
          <AppBar position="static">
              <Toolbar className="main-color-bg">
                <a href="/" variant="h6" className={classes.title} style={{color: "white", fontWeight: "800", textDecoration: "none"}}>
                  HousingHelper
                </a>
                <Button href="/login" color="inherit">Login</Button>
                <Button href="/signup" color="inherit">Sign Up</Button>
              </Toolbar>
            </AppBar>
        ) 
      }
       
    } else {
      if(localStorage.usertoken) {
        return(
          <AppBar position="static">
              <Toolbar className="main-color-bg">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon onClick={toggleDrawer("left", true)}/>
                  <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                  <div style={{backgroundColor: "#454c71", minHeight: "56px", width: "100%"}} className={classes.list}>
                      <Button onClick={toggleDrawer("left", false)} style={{backgroundColor: "white", color: "#454c71", width:"40px", margin: "10px", marginLeft: "10", borderRadius: "50px", textTransform: "lowercase"}} color="inherit">x</Button>
                      <Button href="/" className={classes.drawerTitle}>HH</Button>
                  </div>
                    <div style={{marginTop: "10px"}} className={classes.list}>
                      {/* <center>
                        <Button style={{backgroundColor: "#3f51b5", color: "white", width:"90%", height:"50px", marginTop: "10px"}} color="inherit">Login</Button>
                        <Button style={{backgroundColor: "#3f51b5", color: "white", width:"90%", height:"50px", marginTop: "10px"}} color="inherit">Sign Up</Button>
                      </center> */}
                      <center>
                        <Button href="/" className={classes.drawerButton} color="inherit">Home</Button>
                        <Button href="/new" className={classes.drawerButton} color="inherit">Post</Button>
                        <Button href="/profile" className={classes.drawerButton} color="inherit">Profile</Button>
                        <Button onClick={logOut.bind(this)}  className={classes.drawerButton} color="inherit">Logout</Button>
                      </center>
                    </div>
                  </Drawer>
                </IconButton>
                <a href="/" variant="h6" className={classes.title} style={{color: "white", fontWeight: "800", textDecoration: "none"}}>
                  HousingHelper
                </a>
  
              </Toolbar>
            </AppBar>
        )
      } else {
        return(
          <AppBar position="static">
              <Toolbar className="main-color-bg">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon onClick={toggleDrawer("left", true)}/>
                  <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                  <div style={{backgroundColor: "#454c71", minHeight: "56px", width: "100%"}} className={classes.list}>
                      <Button onClick={toggleDrawer("left", false)} style={{backgroundColor: "white", color: "#454c71", width:"40px", margin: "10px", marginLeft: "10", borderRadius: "50px", textTransform: "lowercase"}} color="inherit">x</Button>
                      <Button href="/" className={classes.drawerTitle}>HH</Button>
                  </div>
                    <div style={{marginTop: "10px"}} className={classes.list}>
                      {/* <center>
                        <Button style={{backgroundColor: "#3f51b5", color: "white", width:"90%", height:"50px", marginTop: "10px"}} color="inherit">Login</Button>
                        <Button style={{backgroundColor: "#3f51b5", color: "white", width:"90%", height:"50px", marginTop: "10px"}} color="inherit">Sign Up</Button>
                      </center> */}
                      <center>
                        <Button href="/" className={classes.drawerButton} color="inherit">Home</Button>
                        <Button href="/login" className={classes.drawerButton} color="inherit">Login</Button>
                        <Button href="/signup" className={classes.drawerButton} color="inherit">Sign Up</Button>
                      </center>
                    </div>
                  </Drawer>
                </IconButton>
                <a href="/" variant="h6" className={classes.title} style={{color: "white", fontWeight: "800", textDecoration: "none"}}>
                  HousingHelper
                </a>
  
              </Toolbar>
            </AppBar>
        )
      }
    }
  }

  function logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    window.location = '/';
  }

  return (
    <Router>
      <div className={classes.root}>
        {renderTabs()}
        <Route path="/new" exact component={NewPostPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/user/:id" component={OthersProfilePage} />
        {localStorage.usertoken ? <Route path="/profile" exact component={ProfilePage} /> : <Route path="/profile" exact component={LoginPage} />}
        {localStorage.usertoken ? <Route path="/" exact component={HomePage} /> : <Route path="/" exact component={LandingPage} />}
        
        {/* <LocationPicker /> */}

      </div>
    </Router>
  );
}