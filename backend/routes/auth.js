const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth')
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

// @route POST /auth/user
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



module.exports = router;