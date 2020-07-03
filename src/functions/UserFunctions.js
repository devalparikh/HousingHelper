import axios from 'axios';
import { apiURL } from '../constant';

// export const register = newUser => {
//     return axios
//         .post(apiURL + '/users/register', {
//             email: newUser.email,
//             username: newUser.username,
//             password: newUser.password
//         })
//         .then(res => {
//             console.log(newUser.username + ' registered!')
            
//         })
//         .catch(err => {
//             alert(err.response.data.msg)
//             console.log(err.response.data.msg)
//         });
// }

// export const login = user => {
//     return axios
//         .post(apiURL + '/auth/login', {
//             username: user.username,
//             password: user.password
//         })
//         .then(res => {
//             localStorage.setItem('usertoken', res.data)
//             return res.data
//         })
//         .catch(err => {
//             alert(err.response.data.msg)
//             console.log(err.response.data.msg)
//         });
// }

export const getProfile = token => {
    return axios
      .get(apiURL + '/auth/user', {
        headers: { "x-auth-token": `${token}` }
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err.response.data)
        localStorage.removeItem('usertoken')
      })
}

export const getProfilePost = user => {
    return axios
        .get(apiURL + '/posts/byuserid/'+user)
        .then(res => {
            console.log('getting ' + user + "'s post")
            return res.data
        })
        .catch(err => {
            alert(err.response.data.msg)
            console.log(err.response.data)
        })
}

// export const getAllPosts = user => {
//     return axios
//         .get(apiURL + '/posts/')
//         .then(res => {
//             console.log('getting all post')
//             return res.data
//         })
//         .catch(err => {
//             alert(err.response.data.msg)
//             console.log(err.response.data)
//         })
// }

// export const editPost = (token, post_id, post) => {
//     return axios
//       .post(apiURL + '/posts/update/'+ post_id, post, {
//         headers: { Authorization: `${token}` }
//       })
//       .then(response => {
//         return response.data
//       })
//       .catch(err => {
//         console.log(err.response.data)
//         localStorage.removeItem('usertoken')
//         window.location = '/';
//       })
// }

// export const deletePost = (token, post_id) => {
//     return axios
//       .delete(apiURL + '/posts/'+ post_id, {
//         headers: { Authorization: `${token}` }
//       })
//       .then(response => {
//         return response.data
//       })
//       .catch(err => {
//         console.log(err.response.data)
//         localStorage.removeItem('usertoken')
//         window.location = '/';
//       })
// }