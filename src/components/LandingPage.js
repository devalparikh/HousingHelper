import React, {Component} from 'react';

// Search Bar

import Grid from '@material-ui/core/Grid';
import csc from 'country-state-city';
import usc from 'us-state-codes';

import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import axios from 'axios';
import { apiURL } from '../constant';

import FeedPostCard from './FeedPostCard'
import { getCompanies } from '../functions/UserFunctions';


import InternetConnection from '../Images/LandingPageImages/internet_connect.svg'
import StressFree from '../Images/LandingPageImages/stressfree.svg'
import Quick from '../Images/LandingPageImages/quick.svg'


const temp_companies = [
    {"name": "Facebook"},
    {"name": "Amazon"},
    {"name": "Apple"},
    {"name": "Netflix"},
    {"name": "Google"},
]

export default class HomePage extends Component{
    
    constructor(props) {
        super(props)

        // TODO: make generic component for sign up card
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.changeFormMessage = this.changeFormMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            selected_state_id: "",
            selected_state_name: "",
            selected_city_id: "",
            selected_city_name: "",
            company: "",

            all_companies: [],

            total_covid: [],
            non: "n/a",

            user: "",
            email: "",
            password: ""

        }
      } 
      
    componentDidMount(){
        getCompanies().then(res => {
            console.log(res)
            this.setState({
                all_companies: res,
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                authorized: 0
            })
        })
    }
      
    onChangeUserState(value) {
        if(value) {
            this.setState({selected_state_id: value.id, selected_state_name: value.name})
        } else {
            this.setState({selected_state_id: "", selected_state_name: ""})
            // Also reset the city ...
            // let city_input = document.getElementById("user-city");
            // console.log(city_input.value)
            // city_input.value = 
            // this.setState({selected_city_id: "", selected_city_name: ""})

        }
        
    }

    onChangeUserCity(value) {
        if(value) {
            this.setState({selected_city_id: value.id, selected_city_name: value.name})
        } else {
            this.setState({selected_city_id: "", selected_city_name: ""})
        }
    }

    onChangeCompany(value) {
        console.log(value)
        if(value) {
            this.setState({company: value.companyName})
        } else {
            this.setState({company: ""})
        }
    }
    
    onSubmit(e) {
        e.preventDefault()
        // Authentication
        const user = {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password
        }
        
        axios
          .post(apiURL+'/users/register', {
              email: user.email,
              username: user.username,
              password: user.password
          })
          .then(res => {
              localStorage.setItem('usertoken', res.data.token)
              window.location = '/profile';
    
          })
          .catch(err => {
              console.log(err)
              this.changeFormMessage(err.response.data.msg)
          });
    
    }

    onChangeEmail(e) {
        this.setState({
          email: e.target.value,
          formMessage: '',
        });
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value,
          formMessage: '',
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value,
          formMessage: '',
        });
      }
    
      changeFormMessage(message) {
        this.setState({
          formMessage: message
        });
      }

    render() {

        // For spacing between sign up card and title on web and mobile 
        let titleMarginTop = "260px"
        const mediaQuery = window.matchMedia('(min-width: 1100px)');
        if (mediaQuery.matches) {
            console.log('desk')
            titleMarginTop = "25px"

        }
        mediaQuery.addListener((mq) => {
        if (mq.matches) {
            console.log('desk')
            titleMarginTop = "25px"
        }
        });

        const cardStyleMarg = {
            marginTop: titleMarginTop,
            marginLeft: "16px", 
            textAlign: "center"
        }

    return (
      <div>
          <div className="bg-landing" style={{backgroundColor:"#41455a", height:"40rem", width:"100%"}}>
            <Grid container style={{flexGrow: 1, maxWidth: "100%"}} spacing={2}>
                <Grid item xs={12} sm={6}>
                    <p style={{margin: "80px 15px -20px 100px",fontWeight:200, fontSize:50, color:'#444444'}}>Find your <a style={{fontWeight:900}}>home</a> away from home<a style={{fontWeight:900}}>.</a></p> 
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container style={{marginBottom:10, marginTop:40}} justify="center" spacing={3}>
                        <div className="normal-card" style={{marginLeft: "16px", minWidth: "300px", backgroundColor: "#fffffff7"}}>

                            <div className="card-body">
                                <center>
                                <p style={{fontWeight:900, fontSize:50, color:'#444444'}}>Sign Up</p> 
                                <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextField style={{width: "250px"}} label="Email" id="email" type="email" variant="outlined" value={this.state.email} onChange={this.onChangeEmail} required/>
                                </div>
                                <div className="form-group">
                                    <TextField style={{width: "250px"}} label="Username" id="username" type="username" variant="outlined" value={this.state.username} onChange={this.onChangeUsername} required/>
                                </div>
                                <div className="form-group"> 
                                    <TextField style={{width: "250px"}} label="Password" id="password" type="password" variant="outlined" value={this.state.password} onChange={this.onChangePassword} required/>
                                </div>
                                
                                <div className="form-group">
                                <br/>
                                <Button type="submit" variant="contained" color="primary" disabled={this.state.username === "" || this.state.password === ""}>Sign Up</Button>
                                </div>
                                <label className="small-text error">{this.state.formMessage}</label>
                                <br/>
                                <label className="small-text">Already have an account?</label> <a href="/login" className="small-text" style={{ color: "#5a65ff" }}>Login</a>
                                <br/>
                                {/* <a href="/" className="small-text" style={{color: "#5a65ff" }}>Home</a> */}
                                </form>
                                </center>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
          </div>
        <Grid justify="center" container style={{flexGrow: 1, marginTop: 40, maxWidth: "100%"}} spacing={2}>

            {/* <Grid item xs={12} sm={12}>
                <div className="normal-card" style={{marginLeft: "16px",}}>
                    
                <Grid container style={{marginBottom:10}} justify="center" spacing={3}>
                    <p style={{fontWeight:900, fontSize:50, color:'#444444'}}>Home</p> 
                </Grid> 

                </div>
            </Grid> */}

            {/* Landing Info Cards */}

            <Grid item xs={12} sm={12} style={cardStyleMarg}>
                <div className="" >

                    <Grid container style={{marginBottom:10}} justify="center" spacing={3}>
                        <p style={{fontWeight:800, fontSize:40, color:'#444444'}}>Why HousingHelper?</p> 
                    </Grid>

                </div>
            </Grid>

            <Grid item xs={12} sm={3} style={{marginLeft: "16px"}}>
                <div className="normal-card">
                    <Grid container style={{marginBottom:10, textAlign: "center"}} justify="center" spacing={3}>
                    <img style={{height:"90px"}} src={Quick} alt="Quick"></img>
                    </Grid>
                    <Grid container style={{marginBottom:10, textAlign: "center"}} justify="center" spacing={3}>
                        <p className="big-text">Act Quickly</p>
                        <p className="small-text" style={{fontWeight: "300", color: "#5c5c5c"}}>Our filtering features allows you to find results faster than ever.</p>
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={12} sm={3} style={{marginLeft: "16px"}}>
                <div className="normal-card">
                    <Grid container style={{marginBottom:10, textAlign: "center"}} justify="center" spacing={3}>
                        <img style={{height:"90px"}} src={StressFree} alt="Stress Free"></img>
                    </Grid>
                    <Grid container style={{marginBottom:10, textAlign: "center"}} justify="center" spacing={3}>
                        <p className="big-text">Stress Less</p>
                        <p className="small-text" style={{fontWeight: "300", color: "#5c5c5c"}}>Don't wait until the last minute. Use HousingHelper to find you next place.</p>
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={12} sm={3} style={{marginLeft: "16px"}}>
                <div className="normal-card">
                    <Grid container style={{marginBottom:10, textAlign: "center"}} justify="center" spacing={3}>
                        <img style={{height:"90px"}} src={InternetConnection} alt="Internet Connection"></img>
                    </Grid>
                    <Grid container style={{marginBottom:10, textAlign: "center"}} justify="center" spacing={3}>
                        <p className="big-text">Form Connections</p>
                        <p className="small-text" style={{fontWeight: "300", color: "#5c5c5c"}}>Build connections with the people you live, work, and commute with.</p>
                    </Grid>
                </div>
            </Grid>

            <Grid container justify="center" item xs={12} sm={12}>
                <Grid>
                    <p style={{textAlign: "center", fontWeight:800, fontSize:40, color:'#444444', marginLeft: "16px", marginBottom: "5px"}}>Explore options with HousingHelper</p>
                </Grid>
            </Grid>

            <Grid container justify="center" item xs={12} sm={12}>
                <p className="small-text" style={{textAlign: "center", fontWeight: "300", color: "#5c5c5c", marginLeft: "16px", marginBottom: "25px"}}>Browse and filter housing options users have been posting on HousingHelper.</p>
            </Grid>


            {/* Filters Card */}

            <Grid item xs={12} sm={12}>
                <div className="normal-card" style={{marginLeft: "16px", marginTop: "30px"}}>
                    
                <Grid container style={{marginBottom:10}} justify="center" spacing={3}>
                    <h2 className="big-text">Filters</h2>
                </Grid> 
                <Grid container justify="center" spacing={3}>
        
                    <Autocomplete
                        id="user-state"
                        options={csc.getStatesOfCountry(csc.getCountryByCode("US").id)}
                        onChange={(event, value) =>  this.onChangeUserState(value)}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300, height: 100 }}
                        renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
                    />
                    </Grid>
                    <Grid container justify="center" spacing={3}>
                    <Autocomplete
                        id="user-city"
                        options={csc.getCitiesOfState(this.state.selected_state_id)}
                        // onChange={(event, value) => this.setState({selected_city_id: value.id})}
                        onChange={(event, value) =>  this.onChangeUserCity(value)}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300, height: 100 }}
                        renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                    />
                    <Grid container justify="center" spacing={3} style={{marginBottom: "10px",}}>
                              <Autocomplete

                                  options={this.state.all_companies}
                                //   value={this.state.company}
                                  name="company"
                                  onChange={(event, value) =>  this.onChangeCompany(value)}
                                  getOptionLabel={(option) => option.companyName}
                                  style={{ width: 300, height: 100 }}
                                  renderInput={(params) => <TextField {...params} label="Company" variant="outlined" />}
                              />
                    </Grid>
                </Grid>
                <Grid container justify="center" spacing={3}>
                    { this.state.company !== "" ? <p style={{fontWeight:900, fontSize:50, color:'#444444'}}>{this.state.company} @&nbsp;</p> : <p></p> }
                    { this.state.selected_city_name !== "" ? <p style={{fontWeight:900, fontSize:50, color:'#444444', marginBottom:'-20px'}}>{this.state.selected_city_name},&nbsp;</p> : <p></p> }
                    { this.state.selected_state_name !== "" ? <p style={{fontWeight:900, fontSize:50, color:'#444444'}}>{this.state.selected_state_name}</p> : <p></p> }
                </Grid>

                </div>
            </Grid>



            <Grid container style={{flexGrow: 1, marginTop: 20, maxWidth: "100%",}} spacing={2}>


                <Grid item xs={12} sm={12}>
                    <center><p style={{fontWeight:900, fontSize:50, color:'#444444', marginTop:'40px', marginLeft: '16px'}}>Posts</p></center>
                </Grid>
            </Grid>
        </Grid>
        <FeedPostCard state={this.state.selected_state_name} city={this.state.selected_city_name} company={this.state.company}></FeedPostCard>


      </div>
    )
  }
}

// Icons
// <div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>