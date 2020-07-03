import React, {Component} from 'react';

// Search Bar

import Grid from '@material-ui/core/Grid';
import csc from 'country-state-city';
import usc from 'us-state-codes';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



export default class HomePage extends Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
            selected_state_id: "",
            selected_state_name: "",
            selected_city_id: "",
            total_covid: [],
            non: "n/a",

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
    return (
      <div>
        <Grid container style={{flexGrow: 1, marginTop: 40}} spacing={2}>
            <Grid item xs={12} sm={12}>
                <Grid container style={{marginBottom:10}} justify="center" spacing={3}>
                <h2>Home Page</h2>
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
                {/* <Autocomplete
                    id="user-city"
                    options={csc.getCitiesOfState(this.state.selected_state_id)}
                    // onChange={(event, value) => this.setState({selected_city_id: value.id})}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300, height: 100 }}
                    renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                /> */}
                </Grid>
                {/* <Grid container justify="center" spacing={3}>
                    <p>{this.state.selected_state_id}</p>
                </Grid>
                <Grid container justify="center" spacing={3}>
                    <p>{this.state.selected_city_id}</p>
                </Grid> */}
                <Grid container justify="center" spacing={3}>
                    { this.state.selected_state_name !== "" ? <p style={{fontWeight:900, fontSize:50, color:'#444444'}}>{this.state.total_covid[0]}</p> : <p></p> }
                </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
            <Grid container justify="center" spacing={3}>
                    { this.state.selected_state_name !== "" ? <p>Total Cases:</p> : <p></p> }
                </Grid>
                <Grid container justify="center" spacing={3}>
                    { this.state.selected_state_name !== "" ? <p style={{fontWeight:900, fontSize:50, color:'#3f51b5'}}>{this.state.total_covid[1]!== null ? this.state.total_covid[1] : this.state.non}</p> : <p></p> }
                </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Grid container justify="center" spacing={3}>
                    { this.state.selected_state_name !== "" ? <p>Total Recovered:</p> : <p></p> }
                </Grid>
                <Grid container justify="center" spacing={3}>
                    { this.state.selected_state_name !== "" ? <p style={{fontWeight:900, fontSize:50, color:'#3fb57a'}}>{this.state.total_covid[2] !== null ? this.state.total_covid[2] : this.state.non}</p> : <p></p> }
                </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Grid container justify="center" spacing={3}>
                    { this.state.selected_state_name !== "" ? <p>Curently Hospitalized:</p> : <p></p> }
                </Grid>
                <Grid container justify="center" spacing={3}>
                    { this.state.selected_state_name !== "" ? <p style={{fontWeight:900, fontSize:50, color:'#de9554'}}>{this.state.total_covid[3]!== null ? this.state.total_covid[3] : this.state.non}</p> : <p></p> }
                </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Grid container justify="center" spacing={3}>
                    { this.state.selected_state_name !== "" ? <p>Total Dead:</p> : <p></p> }
                </Grid>
                <Grid container justify="center" spacing={3}>
                    { this.state.selected_state_name !== "" ? <p style={{fontWeight:900, fontSize:50, color:'#b53f6a'}}>{this.state.total_covid[4]!== null ? this.state.total_covid[4] : this.state.non}</p> : <p></p> }
                </Grid>
            </Grid>
            
        </Grid>

      </div>
    )
  }
}
