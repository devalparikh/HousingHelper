import React, {Component} from 'react';
import { getProfile } from '../functions/UserFunctions';
import Grid from '@material-ui/core/Grid';
import ProfilePostCard from './ProfilePostCard'
import axios from 'axios';
import { apiURL } from '../constant';

export default class OthersProfilePage extends Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
            username: "",
            user_id: "",
            joined: "",
        }
      }

      componentDidMount() {
        axios.get(apiURL + '/users/user/'+this.props.match.params.id)
          .then(res => {
            console.log(res)
            this.setState({
                username: res.data.username,
                joined: new Date(res.data.createdAt).toLocaleDateString(),
                user_id: this.props.match.params.id
            })   
          })
        .catch(err => {
            console.log(err);
            // window.location = '/';
        })
      }

    
    render() {

        return (
            <div>
                <Grid container style={{flexGrow: 1, marginTop: 20, maxWidth: "100%",}} spacing={2}>
                  <Grid item xs={12} sm={12}>
                      <div className="normal-card" style={{marginLeft: "16px",}}>
                          
                          <Grid container justify="center" spacing={3}>
                              <p className="big-text" style={{marginTop:"40px"}}>@{this.state.username}</p>
                          </Grid>
                          <Grid container justify="center" spacing={3} style={{marginBottom:10}}>
                              <p className="small-text" style={{fontWeight: "300", color: "#5c5c5c"}}>Joined: {this.state.joined}</p>
                          </Grid>

                      </div>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <center><p style={{fontWeight:900, fontSize:50, color:'#444444', marginTop:'40px', marginLeft: '16px'}}>Posts</p></center>
                  </Grid>
                </Grid>

                {/* TODO: Make others post cards - has same format as home page cards IF not current user */}
                {/* <ProfilePostCard user_id={this.state.user_id}></ProfilePostCard> */}

                
            </div>
        )
    }
}
