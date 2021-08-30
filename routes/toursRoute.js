const express = require('express');
const tourControler = require('./../controlers/toursControler'); //an object of variables

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

router.route('/').get(tourControler.getAllTours).post(tourControler.creatTour); // this the roote(/)

router
  .route('/:id')
  .get(tourControler.getTour)
  .patch(tourControler.updatTour)
  .delete(tourControler.deleteTour);
// tourRouter.route('/api/v1/tours').get(getAllTours).post(creatTour);
// tourRouter.route('/api/v1/tours/:id').get(getTour).patch(updatTour).delete(deleteTour);

module.exports = router;
