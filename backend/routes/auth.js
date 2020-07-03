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

// @route DELETE /auth/delete
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


module.exports = router;