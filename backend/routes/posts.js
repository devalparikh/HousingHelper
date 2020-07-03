const router = require('express').Router();
var ObjectId = require('mongodb').ObjectID;
let Post = require('../models/post.model');
let User = require('../models/user.model');

require('dotenv').config();

// all endpoints after /posts
// example http://localhost:5000/posts

// @route Get /
// @desc Gets all Posts
// @access Public
router.route('/').get((req, res) => {
  Post.find() // find() returns promise
    .then(posts => res.json(posts)) // returns Posts
    .catch(err => res.status(400).json({msg: err})); // catches errors and returns err
});

// @route GET /post/:id
// @desc Get a Post by id
// @access Public
router.route('/post/:id').get((req, res) => {
  Post.findById(req.params.id) // find() returns promise
    .then(Post => res.json(Post)) // returns Posts
    .catch(err => res.status(400).json({msg: err})); // catches errors and returns err
});

// @route GET /posts/byuserid/:id
// @desc Get a Posts by their username
// @access Public
router.route('/byuserid/:user_id').get((req, res) => {
    Post.find({user_id: (req.params.user_id)}).sort([['createdAt', -1]])
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
  });

// @route POST /posts/post/create
// @desc Creates new post
// @access Public
// router.route('/post/create').post((req, res) => {
//   const newPost = new Post({
//     username: req.body.username,
//     user_id: ObjectId(req.body.user_id),
//     state: req.body.state,
//     city: req.body.city,
//     company: req.body.company,
//     privateBedroom: req.body.privateBedroom,
//     privateBathroom: req.body.privateBathroom,
//     rentPrice: req.body.rentPrice,
//     moreInfo: req.body.moreInfo,
//   })
  
//   User.findById(newPost.user_id)
//     .then((user) => {
//       if(user) {
//         newPost.save()
//           .then(() => res.json('Post added!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       } else {
//           // user_id not found in users
//           res.status(400).json('Error: user id ' + newPost.user_id + ' not found.');
//       }
//     })
//     // user_id not found in users
//     .catch(err => res.status(400).json('Error: ' + err));
  
//   });



module.exports = router;