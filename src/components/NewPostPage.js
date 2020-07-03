import React, {Component} from 'react';
import { getProfile } from '../functions/UserFunctions';

// Search Bar

import Grid from '@material-ui/core/Grid';
import csc from 'country-state-city';

import Autocomplete from '@material-ui/lab/Autocomplete';
import NumberFormat from 'react-number-format';
import { 
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    TextareaAutosize,
    Snackbar 
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import axios from 'axios';
import { apiURL } from '../constant';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

const temp_companies = [
    {"name": "Facebook"},
    {"name": "Amazon"},
    {"name": "Apple"},
    {"name": "Netflix"},
    {"name": "Google"},
]

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
        suffix=" / Month"
      />
    );
  }

export default class NewPostPage extends Component{
    
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            authorized: 0,
            formMessage: "",
            posted: false,

            username: "",
            user_id: "",
            
            selected_state_id: "",
            selected_state_name: "",
            selected_city_id: "",
            total_covid: [],
            non: "n/a",
            price: "",
            

            state: this.selected_state_name,
            city: this.selected_state_name,
            privateBathroom: false,
            privateBedroom: false,
            company: "",
            moreInfo: ""
        }
      }  
    
    componentDidMount() {
        // Authorization
        const token = localStorage.usertoken
        getProfile(token).then(res => {
            this.setState({
                username: res.username,
                user_id: res._id,
                authorized: 1
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
        }
    }
    onChangeUserCity(value) {
        if(value) {
            this.setState({selected_city_id: value.id, selected_city_name: value.name})
        }
    }

    onChangeUserPBed(value) {
        if(value) {
            this.setState({privateBathroom: value.id,})
        }
    }

    onChangeUserPBath(value) {
        if(value) {
            this.setState({privateBedroom: value.id,})
        }
    }

    onChangeCompany(value) {
        console.log(value)
        if(value) {
            this.setState({company: value})
        }
    }

    onChangePrivateBed(e) {

        this.setState({privateBedroom: e.target.checked})
    }
    
    onChangePrivateBath(e) {
        this.setState({privateBathroom: e.target.checked})
    }

    changeFormMessage(message) {
        this.setState({
          formMessage: message
        });
      }
    
    onSubmit(e) {
        e.preventDefault()
        const newPostReqBody = {
            username: this.state.username,
            user_id: this.state.user_id,
            state: this.state.selected_state_name,
            city: this.state.selected_city_name,
            company: this.state.company.name,
            privateBathroom: this.state.privateBathroom,
            privateBedroom: this.state.privateBedroom,
            rentPrice: this.state.price,
            moreInfo: this.state.moreInfo
        }
        console.log(newPostReqBody)
        axios
            .post(apiURL+'/auth/create', newPostReqBody, {headers: { 'x-auth-token': `${localStorage.usertoken}` }})
            .then(res => {
                if(res.status !== 200) {
                    this.changeFormMessage(res)
                } else {
                    this.setState({posted: true})
                }
                console.log(res)
                window.location = '/profile';
            })
            .catch(err => {
                this.changeFormMessage(err.response.data.msg)
                console.log(err.response.data.msg)
            });
    }
    
    render() {
    console.log()

    const handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
    
    if(this.state.authorized) {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
              <Grid container style={{flexGrow: 1, marginTop: 20, maxWidth: "100%",}} spacing={2}>
                  <Grid item xs={12} sm={12}>
                      <div className="normal-card" style={{marginLeft: "16px",}}>
                          
                          <Grid container justify="center" spacing={3} style={{marginBottom:10}}>
                              <p className="big-text" style={{marginTop:"40px"}}>Need a Roommate?</p>
                          </Grid>
                      </div>
                  </Grid>
      
                  <Grid item xs={12} sm={6}>
                      <div className="normal-card" style={{marginLeft: "16px",}}>
                          <Grid container  justify="center" spacing={3} style={{marginBottom: "20px",}}>
                              <h2>Location</h2>
                          </Grid>
                          
                          <Grid container justify="center" spacing={3}>
                              <Autocomplete
                                  options={csc.getStatesOfCountry(csc.getCountryByCode("US").id)}
                                  onChange={(event, value) =>  this.onChangeUserState(value)}
                                  getOptionLabel={(option) => option.name}
                                  style={{ width: 300, height: 100 }}
                                  renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                                  required
                              />
                              </Grid>
                              <Grid container justify="center" spacing={3}>
                              <Autocomplete
                                  id=""
                                  options={csc.getCitiesOfState(this.state.selected_state_id)}
                                  // onChange={(event, value) => this.setState({selected_city_id: value.id})}
                                  onChange={(event, value) =>  this.onChangeUserCity(value)}
                                  getOptionLabel={(option) => option.name}
                                  style={{ width: 300, height: 100 }}
                                  renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                                  required
                              />
                          </Grid>
                      </div>
                  </Grid>
      
                  <Grid item xs={12} sm={6}>
                  <div className="normal-card" style={{marginLeft: "16px",}}>
                          <Grid container  justify="center" spacing={3} style={{marginBottom: "5px",}}>
                              <h2>Housing Information</h2>
                          </Grid>
                          
                          <Grid container justify="center" style={{marginLeft:"-3px"}}>
                          <FormControlLabel
                              control={
                              <Checkbox
                                  // checked={}
                                  onChange={(event) => this.onChangePrivateBed(event)}
                                  name="privateBedroom"
                                  color="primary"
                              />
                              }
                              label="Private Bedroom?"
                          />
                          </Grid>
                          <Grid container justify="center">
                              <FormControlLabel
                                  control={
                                  <Checkbox
                                      // checked={}
                                      onChange={(event) => this.onChangePrivateBath(event)}
                                      name="privateBathroom"
                                      color="primary"
                                  />
                                  }
                                  label="Private Bathroom?"
                              />
                          </Grid>
                          <Grid container justify="center" spacing={3} style={{marginTop: "10px", marginBottom: "28px",}}>
                          <TextField
                              label="Rent Price"
                              style={{width: "200px"}}
                              variant="outlined"
                              value={this.state.price}
                              name="price"
                              onChange={handleChange}
                              id="price-input"
                              InputProps={{
                                  inputComponent: NumberFormatCustom,
                              }}
                          />
                          </Grid>
                      </div>
                  </Grid>
      
                  <Grid item xs={12} sm={6}>
                  <div className="normal-card" style={{marginLeft: "16px",}}>
                          <Grid container  justify="center" spacing={3} style={{marginBottom: "30px",}}>
                              <h2>Company</h2>
                          </Grid>
                          
                          <Grid container justify="center" spacing={3} style={{marginBottom: "10px",}}>
                              <Autocomplete

                                  options={temp_companies}
                                  value={this.state.company}
                                  name="company"
                                  onChange={(event, value) =>  this.onChangeCompany(value)}
                                  getOptionLabel={(option) => option.name}
                                  style={{ width: 300, height: 100 }}
                                  renderInput={(params) => <TextField {...params} label="Company" variant="outlined" />}
                              />
                          </Grid>
                      </div>
                  </Grid>
      
                  
      
                  <Grid item xs={12} sm={6}>
                      <div className="normal-card" style={{marginLeft: "16px", height: "180px"}}>
                          <Grid container  justify="center" spacing={3} style={{marginBottom: "10px",}}>
                              <h2>More Info</h2>
                          </Grid>
                          <Grid container justify="center" spacing={3}>
                          
                              <form noValidate autoComplete="off">
                                  <TextareaAutosize
                                      style={{fontSize:"1rem", padding: "20px", minWidth: "290px", width: "290px", maxWidth: "300px", minHeight: "60px", height: "60px", maxHeight: "90px"}}
                                      rowsMax={4}
                                      aria-label="maximum height"
                                      placeholder="(Enter more information about the housing or yourself)"
                                      defaultValue=""
                                      name="moreInfo"
                                      onChange={handleChange}
                                      />
                               </form>
                          </Grid>
                          
                      </div>
                  </Grid>
                  
              </Grid>
              <center>
                  <Button type="submit" className="post-button" style={{backgroundColor:"#454c71", color: "white", marginTop: "30px", marginBottom: "30px", width: "50%", height: "60px", maxWidth: "255px"}}>Post Housing</Button>
              </center>
              <label className="small-text error">{this.state.formMessage}</label>
              </form>
              <Snackbar open={this.state.posted} autoHideDuration={6000}>
                <Alert severity="success">
                    Posted!
                </Alert>
            </Snackbar>
            </div>
          )
    } else {
        return (
            <div>
                Unathorized
            </div>
          )
    }
    
  }
}
