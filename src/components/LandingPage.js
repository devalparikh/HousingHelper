import React, {Component} from 'react';

// Search Bar

import Grid from '@material-ui/core/Grid';
import csc from 'country-state-city';
import usc from 'us-state-codes';

import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import FeedPostCard from './FeedPostCard'

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
    
        this.state = {
            selected_state_id: "",
            selected_state_name: "",
            selected_city_id: "",
            selected_city_name: "",
            company: "",

            total_covid: [],
            non: "n/a",

        }
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
            this.setState({company: value.name})
        } else {
            this.setState({company: ""})
        }
    }
    
    render() {

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
        <Grid container style={{flexGrow: 1, marginTop: 40, maxWidth: "100%"}} spacing={2}>

            {/* <Grid item xs={12} sm={12}>
                <div className="normal-card" style={{marginLeft: "16px",}}>
                    
                <Grid container style={{marginBottom:10}} justify="center" spacing={3}>
                    <p style={{fontWeight:900, fontSize:50, color:'#444444'}}>Home</p> 
                </Grid> 

                </div>
            </Grid> */}
            <Grid item xs={12} sm={12}>
                <div className="normal-card" style={{marginLeft: "16px", marginTop: "220px"}}>
                    
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

                                  options={temp_companies}
                                //   value={this.state.company}
                                  name="company"
                                  onChange={(event, value) =>  this.onChangeCompany(value)}
                                  getOptionLabel={(option) => option.name}
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
                    <center><p style={{fontWeight:900, fontSize:50, color:'#444444', marginTop:'40px'}}>Posts</p></center>
                </Grid>
            </Grid>
        </Grid>
        <FeedPostCard state={this.state.selected_state_name} city={this.state.selected_city_name} company={this.state.company}></FeedPostCard>


      </div>
    )
  }
}
