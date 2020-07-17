import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {Button, Tooltip} from '@material-ui/core'
import { getAllPosts, getProfile, createMatchRequest } from '../functions/UserFunctions';

import Pagination from '@material-ui/lab/Pagination';


export default class FeedPostCard extends Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
            mobile: false,
            posts: [],
            filtered_posts: [],
            disabledButtons: [],

            // User info
            user_id: "",
            username: "",

            // Pagination
            postsPerPage: 5,
            currentPage: 1,
        }
      }

      componentDidMount() {
        console.log(this.state.posts)
            getAllPosts()
                .then(res => {
                console.log(res)
                this.setState({posts: res, filtered_posts: res})
            })


        const token = localStorage.usertoken
        console.log(token)
        if(token) {
            getProfile(token).then(res => {
                this.setState({
                    user_id: res._id,
                    username: res.username
                });
            })
            .catch(err => {
                console.log(err);
                // window.location = '/login';
            }) 
        }
      }

      componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            let params = {
                state: this.props.state,
                city: this.props.city,
                company: this.props.company
            }
            // getAllPosts(params)
            //     .then(res => {
            //     console.log(res)
            //     this.setState({posts: res})
            // })  
            console.log(params)
            let filtered = this.state.posts
            if(params.state && params.state !== "") {
                filtered = filtered.filter(post => post['state'] === params.state)
                // this.setState({posts: filtered})
            }

            if(params.city && params.city !== "") {
                filtered = filtered.filter(post => post['city'] === params.city)
                // this.setState({posts: filtered})
            }

            if(params.company && params.company !== "") {
                filtered = filtered.filter(post => post['company'] === params.company)
                // this.setState({posts: filtered})
            }
            this.setState({filtered_posts: filtered})
            console.log(filtered)
        }
      }

      handlePageChange(page) {
          console.log(page)
          this.setState({ currentPage: page })
      }

      handleContactButton(postID, index) {
        this.setState(oldState => {
            const newDisabledButtons = [...oldState.disabledButtons];
            newDisabledButtons[index] = true;
            return {
              disabledButtons: newDisabledButtons,
            }
        });
        document.getElementById(postID).style.backgroundColor = "#e0e5ff";
        createMatchRequest(postID, this.state.username)
        .then(res => {
            console.log(res)
        })

      }

      getStatusOfMatchingRequest(requests) {
        // Find request
        var result = requests.filter(obj => {
            return obj.requester === this.state.user_id
          })
        console.log(result)
        if(result && result[0]) {
            if(result[0]) {
                return result[0]            
            }
        }
        return null
      }


    render() {

        // Pagination
        let indexOfLastPost = this.state.currentPage * this.state.postsPerPage
        let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage
        let currentPosts = this.state.filtered_posts.slice(indexOfFirstPost, indexOfLastPost)

        // Create our number formatter.
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        })

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

                {
                    currentPosts.map((post, index) => 
                        (

                            <Grid item xs={12} sm={12}>

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
                                        {
                                        this.state.user_id === "" 
                                        ? 
                                        <center>
                                            <Button href="/login" className="post-button" style={{backgroundColor:"#454c71", color: "white", marginTop: "30px", marginBottom: "30px", width: "50%", height: "60px", maxWidth: "255px"}}>Contact</Button>
                                        </center>
                                        :
                                        this.getStatusOfMatchingRequest(post.requests) && this.getStatusOfMatchingRequest(post.requests).status === "pending"
                                        ?
                                        <center>
                                            <Button className="post-button" style={{backgroundColor:"#e0e5ff", color: "white", marginTop: "30px", marginBottom: "30px", width: "50%", height: "60px", maxWidth: "255px"}} disabled>Requested</Button>
                                        </center>
                                        :
                                        this.getStatusOfMatchingRequest(post.requests) && this.getStatusOfMatchingRequest(post.requests).status === "accepted"
                                        ?
                                        <center>
                                            <Tooltip title="Send Email" aria-label="send email">
                                                <Button href={"mailto:" + this.getStatusOfMatchingRequest(post.requests).postersEmail} className="post-button-email" style={{backgroundColor:"#5eada5", color: "white"}}>Matched</Button>
                                            </Tooltip>
                                            <p className="small-text">Contact: <a style={{fontWeight: "300", color: "#5c5c5c"}}>{this.getStatusOfMatchingRequest(post.requests).postersEmail}</a></p>

                                        </center>
                                        :
                                        this.state.user_id !== post.user_id
                                        ?
                                        <center>
                                            <Button id={post._id} onClick={() => this.handleContactButton(post._id, index)} className="post-button" style={{backgroundColor:"#454c71", color: "white", marginTop: "30px", marginBottom: "30px", width: "50%", height: "60px", maxWidth: "255px"}} disabled={this.state.disabledButtons[index]}>
                                                {this.state.disabledButtons[index] ? <p>Requested</p> : <p>Contact</p>}
                                            </Button>
                                        </center>
                                        :
                                        <p></p>
                                        }
                                    </Grid>
                                    
                                </div>

                            </Grid>
                        )
                    )
                }
                    <Grid item xs={12} sm={12}>
                        <div className="normal-card" style={cardStyleMarg}>
                            <Grid container justify="center" spacing={3}>
                                <Pagination 
                                count={Math.ceil((this.state.filtered_posts.length)/this.state.postsPerPage)} 
                                onChange={(event, value) =>  this.handlePageChange(value)}
                                />
                            </Grid>
                        </div>
                    </Grid>
               </Grid> 
            </div>
        )
    }
}
