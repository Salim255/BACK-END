const express = require('express');
const reviewControler = require('./../controlers/reviewControler'); //an object of variables
//creating new router as a middlewer
const router = express.Router();
const authControler = require('./../controlers/authControler');


router.route('/').get(authControler.protect,authControler.restrictTo('user'), reviewControler.getAllReviews).post(reviewControler.creatReview); // this the roote(/) /=== '/api/v1/reviews'

module.exports = router; //To be used in app.js