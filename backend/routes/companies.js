const router = require('express').Router();
let Company = require('../models/company.model');

require('dotenv').config();

// all endpoints after /posts
// example http://localhost:5000/posts

// @route Get /companies/
// @desc Gets all companies
// @access Public
router.route('/').get((req, res) => {
    Company.find().sort([['companyNameLowerCase', 1]]) // find() returns promise
    .then(company => res.json(company)) // returns Posts
    .catch(err => res.status(400).json({msg: err})); // catches errors and returns err
});



module.exports = router;