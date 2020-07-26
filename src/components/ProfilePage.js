import React, {Component} from 'react';
import { getProfile } from '../functions/UserFunctions';
import Grid from '@material-ui/core/Grid';
import ProfilePostCard from './ProfilePostCard'
import axios from 'axios';
import { apiURL } from '../constant';

export default class ProfilePage extends Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
            username: "",
            user_id: "",
            joined: "",
        }
      }

      componentDidMount() {
        const token = localStorage.usertoken
        getProfile(token).then(res => {
            this.setState({
                username: res.username,
                user_id: res._id,
                joined: new Date(res.createdAt).toLocaleDateString(),
            });
        })
        .catch(err => {
            console.log(err);
            window.location = '/';
        })
      }

    
    render() {

        let cardMarginLeft = "16px"
        let cardMarginRight = "0px"
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        if (mediaQuery.matches) {
            console.log('desk')
            cardMarginLeft = "116px"
            cardMarginRight = "100px"
        }
        mediaQuery.addListener((mq) => {
        if (mq.matches) {
            console.log('desk')
            cardMarginLeft = "116px"
            cardMarginRight = "100px"
        }
        });

        const cardStyleMarg = {
            marginLeft: cardMarginLeft,
            marginRight: cardMarginRight
        }

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
                      <center><p style={{fontWeight:900, fontSize:50, color:'#444444', marginTop:'40px', marginLeft: '16px'}}>About</p></center>

                      <div className="normal-card" style={cardStyleMarg}>
                          
                          <Grid container justify="center" spacing={3}>
                              <p>hi</p>
                          </Grid>

                      </div>
                  </Grid>
                  
                </Grid>


                <ProfilePostCard user_id={this.state.user_id}></ProfilePostCard>
                
                
                
            </div>
        )
    }
}
