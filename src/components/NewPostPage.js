import React, {Component} from 'react';

// Search Bar

import Grid from '@material-ui/core/Grid';
import csc from 'country-state-city';
import usc from 'us-state-codes';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormat from 'react-number-format';
import { Button } from '@material-ui/core';

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
    
        this.state = {
            selected_state_id: "",
            selected_state_name: "",
            selected_city_id: "",
            total_covid: [],
            non: "n/a",
            price: "",

        }
      }  
      
    onChangeUserState(value) {
        if(value) {
            this.setState({selected_state_id: value.id, selected_state_name: value.name})
            fetch('https://covidtracking.com/api/states')
            .then(res => res.json())
            .then((data) => {

            for(var i = 0; i < data.length; i++) {
                if(data[i].state === usc.getStateCodeByStateName(value.name)) {
                    this.setState({total_covid: [data[i].state, data[i].totalTestResults, data[i].recovered, data[i].hospitalizedCurrently, data[i].death]})
                    console.log(data[i])
                }
            }
            })
            .catch(console.log)
        }
        
    }
    
    render() {
    console.log()

    const handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
      
    return (
      <div>
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
                            getOptionLabel={(option) => option.name}
                            style={{ width: 300, height: 100 }}
                            renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                        />
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={12} sm={6}>
            <div className="normal-card" style={{marginLeft: "16px",}}>
                    <Grid container  justify="center" spacing={3} style={{marginBottom: "20px",}}>
                        <h2>Housing Information</h2>
                    </Grid>
                    
                    <Grid container justify="center">
                    <FormControlLabel
                        control={
                        <Checkbox
                            // checked={}
                            // onChange={}
                            name="checkedPrivateBedroom"
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
                                // onChange={}
                                name="checkedPrivateBathroom"
                                color="primary"
                            />
                            }
                            label="Private Bathroom?"
                        />
                    </Grid>
                    <Grid container justify="center" spacing={3} style={{marginTop: "10px", marginBottom: "22px",}}>
                    <TextField
                        label="Rent Price"
                        style={{width: "200px"}}
                        value={this.state.price}
                        onChange={handleChange}
                        name="price"
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
                    <Grid container  justify="center" spacing={3} style={{marginBottom: "20px",}}>
                        <h2>Company</h2>
                    </Grid>
                    
                    <Grid container justify="center" spacing={3}>
                        <Autocomplete
                            id="user-state"
                            options={temp_companies}
                            // onChange={}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 300, height: 100 }}
                            renderInput={(params) => <TextField {...params} label="Company" variant="outlined" />}
                        />
                    </Grid>
                </div>
            </Grid>

            

            <Grid item xs={12} sm={6}>
                <div className="normal-card" style={{marginLeft: "16px",}}>
                    <Grid container  justify="center" spacing={3} style={{marginTop: "47px", marginBottom: "47px",}}>
                        <Button style={{backgroundColor:"#454c71", color: "white", width: "50%", height: "60px"}}>Post Housing</Button>
                    </Grid>
                    
                    
                </div>
            </Grid>
            
        </Grid>

      </div>
    )
  }
}
