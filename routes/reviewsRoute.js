const express = require('express');
const reviewControler = require('./../controlers/reviewControler'); //an object of variables
//creating new router as a middlewer
const router = express.Router({mergeParams: true});//we need to merge the parametre in order to get access to other router parameters inside reviewRouter
const authControler = require('./../controlers/authControler');

//POST/tour/66ef46r4vr/reviews
//POST/ reviews
//So if we get any route like of the obeve in tourRoute, then we will endup to the next route 

router.route('/').get( reviewControler.getAllReviews).post(authControler.protect , authControler.restrictTo('user'),reviewControler.createReview); // this the roote(/) /=== '/api/v1/reviews'


module.exports = router; //To be used in app.js