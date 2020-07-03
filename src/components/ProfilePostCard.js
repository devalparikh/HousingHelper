import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { getProfilePost } from '../functions/UserFunctions';


export default class ProfilePage extends Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
            mobile: false,
            posts: [],
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


    
    render() {

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
                    this.state.posts.map(post => 
                        (

                            <Grid item xs={12} sm={12}>

                                <div className="normal-card" style={cardStyleMarg}>
                                    <Grid>
                                        <a href={"/user/"+post.username} style={{marginBottom: "0px", color: "#5c5c5c", marginInlineStart: "auto"}} className="small-text">
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
                                    </Grid>
                                    
                                </div>

                            </Grid>
                        )
                    )
                }
               </Grid>     
            </div>
        )
    }
}
