import React, {Component} from 'react';

// Search Bar

import Grid from '@material-ui/core/Grid';
import csc from 'country-state-city';
import usc from 'us-state-codes';

import Autocomplete from '@material-ui/lab/Autocomplete';
import NumberFormat from 'react-number-format';
import { 
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    TextareaAutosize 
} from '@material-ui/core';



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
                    <Grid container  justify="center" spacing={3} style={{marginBottom: "5px",}}>
                        <h2>Housing Information</h2>
                    </Grid>
                    
                    <Grid container justify="center" style={{marginLeft:"-3px"}}>
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
                    <Grid container justify="center" spacing={3} style={{marginTop: "10px", marginBottom: "28px",}}>
                    <TextField
                        label="Rent Price"
                        style={{width: "200px"}}
                        value={this.state.price}
                        variant="outlined"
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
                    <Grid container  justify="center" spacing={3} style={{marginBottom: "30px",}}>
                        <h2>Company</h2>
                    </Grid>
                    
                    <Grid container justify="center" spacing={3} style={{marginBottom: "10px",}}>
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
                                />
                         </form>
                    </Grid>
                    
                </div>
            </Grid>
            
        </Grid>
        <center>
            <Button style={{backgroundColor:"#454c71", color: "white", marginTop: "30px", marginBottom: "30px", width: "50%", height: "60px", maxWidth: "255px"}}>Post Housing</Button>
        </center>
      </div>
    )
  }
}
