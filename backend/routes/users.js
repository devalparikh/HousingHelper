const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');
require('dotenv').config();

// @route Get /users/
// @desc Gets all users
// @access Public
router.route('/').get((req, res) => {
  User.find() // find() returns promise
    .select('-password')
    .select('-email')
    .then(users => res.json(users)) // returns users
    .catch(err => res.status(400).json({msg: err})); // catches errors and returns err
});

// @route GET /users/user/:id
// @desc Get a user by their username
// @access Public
router.route('/user/:id').get((req, res) => {
  User.findById(req.params.id) // find() returns promise
    .select('-password')
    .select('-email')
    .then(user => res.json(user)) // returns users
    .catch(err => res.status(400).json({msg: err})); // catches errors and returns err
});

// @route POST /users/register
// @desc Register new user
// @access Public
router.route('/register').post((req, res) => {
  const userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    incoming_requests: [],
    outgoing_requests: []
  }

  User.findOne({
    username: req.body.username
  })
    .then(user => {
      if (!user) {
        User.findOne({
          email: req.body.email
        })
        .then(user => {
          if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              userData.password = hash
              User.create(userData)
                .then(user => {
                  
                  jwt.sign(
                    { id: user._id },
                    process.env.SECRET_KEY,
                    { expiresIn: 3600*24 }, // Token expires in 1 day
                    (err, token) => {
                      if(err) throw err
                      res.json({
                         status: user.username + ' Registered!',
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
                .catch(err => {
                  res.status(400).json({msg: err})
                })
            })
          } else {
            res.status(500).json({ msg: 'Email ' + user.email + ' already exists.'})
          }
        })

      } else {
        res.status(500).json({ msg: 'Username ' + user.username + ' already exists.'})
      }
    })
    .catch(err => {
      res.status(400).json({msg: err})
    })
})



module.exports = router;