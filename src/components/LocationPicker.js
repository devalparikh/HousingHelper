import React, {Component} from 'react';

// Search Bar

import Grid from '@material-ui/core/Grid';
import csc from 'country-state-city'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



export default class LocationPicker extends Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
            selected_state_id: "",
            selected_city_id: "",
        }
      }  
      
    onChangeUserState(value) {
        this.setState({selected_state_id: value.id})
        fetch('https://covidtracking.com/api/states')
        .then(res => res.json())
        .then((data) => {
            console.log(value)
          console.log(data[parseInt(value.id) - 3919])
        })
        .catch(console.log)
    }
    
    render() {
    console.log()
    return (
      <div>
        <Grid container style={{flexGrow: 1, marginTop: 40}} spacing={2}>
            <Grid item xs={12} sm={6}>
                <Grid container style={{marginBottom:10}} justify="center" spacing={3}>
                <h2>Enter Location</h2>
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
                    onChange={(event, value) => this.setState({selected_city_id: value.id})}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300, height: 100 }}
                    renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                />
                </Grid>
                <Grid container justify="center" spacing={3}>
                    <p>{this.state.selected_state_id}</p>
                </Grid>
                <Grid container justify="center" spacing={3}>
                    <p>{this.state.selected_city_id}</p>
                </Grid>
            </Grid>
            
        </Grid>

      </div>
    )
  }
}
