import React, {Component} from 'react';
import { getProfile } from '../functions/UserFunctions';


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
            })
        })
        .catch(err => {
            console.log(err);
            window.location = '/';
        })
      }

    
    render() {
        return (
            <div>
                <p>hi @{this.state.username}</p>
            </div>
        )
    }
}
