const express = require('express');
const tourControler = require('./../controlers/toursControler'); //an object of variables
const reviewControler = require('./../controlers/reviewControler');
const authControler = require('./../controlers/authControler');

//creating new router as a middlewer
const router = express.Router();

// router.param(
//   'id',
//   tourControler.checkID //And the val is the value of the id parameter that we actuel hold
//   // console.log(`Tour id is :${val}`);
// );
//id is the parametre we search for,(req, res, next, val) is our actuel middlewar function, if there are no id , this middleware will be ignored

router.route('/tour-stats').get(tourControler.getTourStats);
router.route('/monthly-plan/:year').get(tourControler.getMonthlyPlan);//:year, called URL parametre

router
  .route('/top-5-cheap')
  .get(tourControler.aliasTopTours, tourControler.getAllTours);

router.route('/').get(authControler.protect, tourControler.getAllTours).post(tourControler.creatTour); // this the roote(/)

router
  .route('/:id')
  .get(tourControler.getTour)
  .patch(tourControler.updatTour)
  .delete(authControler.protect, authControler.restrictTo('admin', 'lead-guide'), tourControler.deleteTour);
// tourRouter.route('/api/v1/tours').get(getAllTours).post(creatTour);
// tourRouter.route('/api/v1/tours/:id').get(getTour).patch(updatTour).delete(deleteTour);

////NASTED ROUTE
//POST/tour/66ef46r4vr/reviews
//Get/tour/jnw57454wd5/reviews
//GER/tour/7r87r8sd8s/reviews/545rtg5v4c5f4
router.route('/:tourId/reviews').post(authControler.protect, authControler.restrictTo('user'),reviewControler.createReview);

module.exports = router;
