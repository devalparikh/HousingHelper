const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth')
var ObjectId = require('mongodb').ObjectID;
let Post = require('../models/post.model');
let User = require('../models/user.model');
require('dotenv').config();

// @route POST /auth/login
// @desc Login Autheniticate user
// @access Public
router.route('/login').post((req, res) => {

  User.findOne({
    username: req.body.username
  })
    .then(user => {
      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      } else {
        // Validate password
        bcrypt.compare(req.body.password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: "Invalid Password" });
            
            jwt.sign(
                { id: user._id },
                process.env.SECRET_KEY,
                { expiresIn: 3600*24 }, // Token expires in 1 day
                (err, token) => {
                  if(err) throw err
                  res.json({
                     status: user.username + ' Authenticated!',
                     token,
                     user: {
                        id: user._id,
                        email: user.email,
                        username: user.username,
                     }
                  })
                }
              )
        })
      }
    })
    .catch(err => {
      res.status(400).json({msg: err})
    })
})

// @route GET /auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) throw Error('User Does not exist');
      res.json(user);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

// @route POST /auth/create
// @desc Creates a new post
// @access Private
router.post('/create', auth, async (req, res) => {
  const newPost = new Post({
    username: req.body.username,
    user_id: ObjectId(req.body.user_id),
    state: req.body.state,
    city: req.body.city,
    company: req.body.company,
    privateBedroom: req.body.privateBedroom,
    privateBathroom: req.body.privateBathroom,
    rentPrice: req.body.rentPrice,
    moreInfo: req.body.moreInfo,
    requests: [],
  })
  
  User.findById(newPost.user_id)
    .then((user) => {
      if(user) {
        newPost.save()
          .then(() => res.json('Post added!'))
          .catch(err => res.status(400).json('Error: ' + err));
      } else {
          // user_id not found in users
          res.status(400).json('Error: user id ' + newPost.user_id + ' not found.');
      }
    })
    // user_id not found in users
    .catch(err => res.status(400).json('Error: ' + err));
  
});

// @route POST /auth/delete
// @desc Creates a new post
// @access Private
router.post('/delete', auth, async (req, res) => {
  const postID = req.body.postID;
  
  Post.findById(postID)
    .then((post) => {
      if(post) {
        post.deleteOne()
          .then(() => res.json('Post deleted!'))
          .catch(err => res.status(400).json('Error: ' + err));
      } else {
          // user_id not found in users
          res.status(400).json('Error: post id ' + postID + ' not found.');
      }
    })
    // user_id not found in users
    .catch(err => res.status(400).json('Error: ' + err));
  
});

// @route POST /auth/match/create
// @desc Creates a new match request - when contact button clicked
// @access Private
router.post('/match/create', auth, async (req, res) => {
  const postID = req.body.postID;
  const requester_username = req.body.reqUS

  
  Post.findById(postID)
    .then((post) => {
      if(post) {
        const requester = req.user.id
        const poster = post.user_id
        if(poster === requester) {
          res.status(400).json('Error: can not match with yourself.');
        }
        // Create Match Request
        let new_request = {
          requester: requester,
          requester_username: requester_username,
          post: post._id,
          status: "pending"
        }
        // Add to post
        post.requests.push(new_request)

        // TODO: Add to users array of requesters and sent requests
        
        User.findById(requester)
        .then(user => {
          if(user) {
            user.outgoing_requests.push(new_request)
            User.updateOne({_id: requester}, user)
            .then(console.log('User updated'))
            .catch(err => console.log(err));
          } else {
            res.status(400).json('Error: requester does not exist.')
          }
        })
        .catch(err => console.log(err));

        User.findById(poster)
        .then(user => {
          if(user) {
            user.incoming_requests.push(new_request)
            User.updateOne({_id: poster}, user)
            .then(console.log('User updated'))
            .catch(err => console.log(err));
          } else {
            res.status(400).json('Error: requester does not exist.')
          }
        })
        .catch(err => console.log(err));

        Post.updateOne({_id: postID}, post)
        .then(res.json('Match created'))
        .catch(err => console.log(err));

        
      } else {
          // user_id not found in users
          res.status(400).json('Error: post id ' + postID + ' not found.');
      }
    })
    // user_id not found in users
    .catch(err => res.status(400).json('Error: ' + err));
  
});

// @route POST /auth/match/accept
// @desc Accept a match request - when request button clicked
// @access Private
router.post('/match/accept', auth, async (req, res) => {
  const postID = req.body.postID;
  const requester = req.body.requester
  
  Post.findById(postID)
    .then((post) => {
      if(post) {
        if(post.user_id !== req.user.id) {
          res.status(400).json('Error: not authorized to accept other users posts.');
        }
        if(post.requests && post.requests.length > 0) {
          post.requests.forEach(request => {
            if(request.requester === requester) {
              request.status = "accepted"
              User.findById(post.user_id)
              .then(user => {
                request.postersEmail = user.email
                request.username = user.username
              });
            }
          });
          // TODO: update users array of requesters and sent requests

          res.json('Match accepted')
        } else {
          res.status(400).json('Error: no requests for this post.');
        }
      } else {
          // user_id not found in users
          res.status(400).json('Error: post id ' + postID + ' not found.');
      }
    })
    // user_id not found in users
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route Get /auth/match/accept
// @desc Gets match requests for a post
// @access Private
router.get('/match/accept', auth, async (req, res) => {
  const postID = req.body.postID;

  
  Post.findById(postID)
    .then((post) => {
      if(post) {
        if(post.requests && post.requests.length > 0) {
          
          // TODO: update users array of requesters and sent requests

          let accepted_requesters = []
          post.requests.forEach(request => {
            if(request.status === "accepted") {
              accepted_requesters.push(request)
            }
          });
          res.json(accepted_requesters)
        } else {
          res.status(400).json('Error: no requests for this post.');
        }
      } else {
          // user_id not found in users
          res.status(400).json('Error: post id ' + postID + ' not found.');
      }
    })
    // user_id not found in users
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;