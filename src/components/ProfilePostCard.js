import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {Button, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { getProfilePost, getAllUsers, deletePost } from '../functions/UserFunctions';

import Pagination from '@material-ui/lab/Pagination';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default class ProfilePage extends Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
            mobile: false,
            posts: [],

            all_users: [],

            // Delete
            deleted: false,

            // Pagination
            postsPerPage: 3,
            currentPage: 1,
        }
      }

    componentDidUpdate(prevProps) {
        console.log(this.state.posts)
        if (this.props.user_id !== prevProps.user_id) {
    
            getProfilePost(this.props.user_id)
                .then(res => {
                console.log(res)
                this.setState({posts: res})
            })
            
        }
      }

    componentDidMount(){
        getAllUsers()
            .then(res => {
                console.log(res)
                this.setState({all_users: res})
            })
            .catch(err => {
                console.log(err)
            })
    }

    // On delete
    onDelete(postID) {
        const token = localStorage.usertoken

        deletePost(postID, token)
        .then(res => {
            console.log(res)
            window.location = '/profile';
            
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    // Pagination
    handlePageChange(page) {
        this.setState({ currentPage: page })
    }


    
    
    render() {

        // Pagination
        let indexOfLastPost = this.state.currentPage * this.state.postsPerPage
        let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage
        let currentPosts = this.state.posts.slice(indexOfFirstPost, indexOfLastPost)

        // Create our number formatter.
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        })

        let cardMarginLeft = "16px"
        let cardMarginRight = "0px"
        let grid_sm = 12
        const mediaQuery = window.matchMedia('(min-width: 1100px)');
        if (mediaQuery.matches) {
            console.log('desk')
            cardMarginLeft = "116px"
            cardMarginRight = "100px"
            grid_sm = 6
        }
        mediaQuery.addListener((mq) => {
        if (mq.matches) {
            console.log('desk')
            cardMarginLeft = "116px"
            cardMarginRight = "100px"
            grid_sm = 6
        }
        });

        const cardStyleMarg = {
            marginLeft: cardMarginLeft,
            marginRight: cardMarginRight,
            marginBottom: "20px"
        }

        const getPendingRequestPost = request => {
            return (
                <Grid>
                    <div className="normal-card" style={cardStyleMarg}>
                        <Grid>
                            <a href={"/user/"+request.requester} style={{marginBottom: "0px", color: "#5c5c5c", marginInlineStart: "auto"}} className="small-text">
                                @{request.requester_username}
                            </a>
                            <a style={{marginBottom: "0px", fontWeight: "300", color: "#5c5c5c", marginInlineStart: "auto"}} className="small-text">
                                &nbsp; for post: {request.post}
                            </a>
                        </Grid>
                    </div>

                </Grid>
            )
        }

        return (
            <div>
                <Grid container style={{flexGrow: 1, marginTop: 20, maxWidth: "100%",}} spacing={2}>
                    
                    <Grid item xs={12} sm={grid_sm}>
                    <Grid>
                        <center><p style={{fontWeight:900, fontSize:50, color:'#444444', marginTop:'40px'}}>Posts</p></center>

                    </Grid>
                    {
                    currentPosts.map((post, index) => 
                        (
                            <Grid>
                                <div className="normal-card" style={cardStyleMarg}>
                                    <Grid>
                                        <a href={"/user/"+post.user_id} style={{marginBottom: "0px", color: "#5c5c5c", marginInlineStart: "auto"}} className="small-text">
                                            @{post.username}
                                        </a>
                                    </Grid>
                                    <Grid container justify="center" spacing={3} style={{marginBottom:30}}>
                                        <a style={{marginBottom: "0px", fontWeight: "300", color: "#5c5c5c", marginInlineStart: "auto"}} className="small-text">
                                            {new Date(post.createdAt).toLocaleDateString()} @ {new Date(post.createdAt).toLocaleTimeString()}
                                        </a>
                                    </Grid>
                                    <Grid>
                                        <p className="small-text">Company: <a style={{fontWeight: "300", color: "#5c5c5c"}}>{post.company}</a></p>
                                        <p className="small-text">Location: <a style={{fontWeight: "300", color: "#5c5c5c"}}>{post.city}, {post.state}</a></p> 
                                        <p className="small-text">Rent: <a style={{fontWeight: "300", color: "#5c5c5c"}}>{formatter.format(post.rentPrice)}</a></p>
                                        {post.moreInfo !== "" ? 
                                        <p className="small-text">More Info: <a style={{fontWeight: "300", color: "#5c5c5c"}}>{post.moreInfo}</a></p> :
                                        <p></p>
                                        }
                                        {post.privateBedroom && post.privateBathroom ? 
                                        <p></p> :
                                        <p className="small-text">Shared: 
                                            {
                                            post.privateBedroom === false ? <a style={{fontWeight: "300", color: "#5c5c5c"}}> Bedroom</a> : <p></p>
                                            }
                                            {
                                            post.privateBathroom === false ? <a style={{fontWeight: "300", color: "#5c5c5c"}}>, Bathroom</a> : <p></p>
                                            }
                                        </p>
                                        }
                                        <p className="small-text" style={{fontWeight: "300", color: "#5c5c5c"}}>Post ID: <a style={{fontWeight: "300", color: "#5c5c5c"}}>{post._id}</a></p>
                                        <IconButton 
                                            style={{marginLeft: "80%", color: "#ff7c7c"}} 
                                            onClick={() => { 
                                                this.setState({deleted: true}); 
                                                this.onDelete(post._id)
                                                }} 
                                            aria-label="delete">
                                            
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Grid>
                                    
                                </div>

                            </Grid>
                        )
                        )
                    }

                    <Grid>
                        <div className="normal-card" style={cardStyleMarg}>
                            <Grid container justify="center" spacing={3}>
                                {
                                this.state.posts.length
                                ?
                                <Pagination 
                                count={Math.ceil((this.state.posts.length)/this.state.postsPerPage)} 
                                onChange={(event, value) =>  this.handlePageChange(value)}
                                />
                                :

                                <Button href="/new" className="post-button" style={{backgroundColor:"#454c71", color: "white", marginTop: "30px", marginBottom: "30px", width: "50%", height: "60px", maxWidth: "255px"}}>Create New Post</Button>
                                
                                
                                }
                                
                            </Grid>
                        </div>
                    </Grid>

                </Grid>

                
                <Grid item xs={12} sm={grid_sm}>
                    <Grid>
                        <center><p style={{fontWeight:900, fontSize:50, color:'#444444', marginTop:'40px'}}>Requests</p></center>
                    </Grid>

                    {

                    // this.state.posts.map(post => {
                    //     let requests = post.requests
                    //     if(requests) {
                    //         requests.map(request => 
                    //             <p>hi</p>
                    //         )
                    //     }
                        


                    // })

                    this.state.posts.map(post => {
                        return (
                            <div>
                            {
                                post.requests.map(request => {
                                    return getPendingRequestPost(request)
                                })
                            }
                            </div>
                        )
                      })


                    }

                    
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Grid>
                        <center><p style={{fontWeight:900, fontSize:50, color:'#444444', marginTop:'40px'}}>Matches</p></center>
                    </Grid>
                    
                </Grid>


               </Grid>
               
               <Snackbar open={this.state.deleted} autoHideDuration={6000}>
                    <Alert severity="info">
                        Deleted!
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}
