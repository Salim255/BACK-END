const express = require('express');
const tourControler = require('./../controlers/toursControler'); //an object of variables
const reviewRouter = require('./../routes/reviewsRoute');
const authControler = require('./../controlers/authControler');

//creating new router as a middlewer
const router = express.Router();

////NASTED ROUTE
//POST/tour/66ef46r4vr/reviews
//Get/tour/jnw57454wd5/reviews



router.use('/:tourId/reviews', reviewRouter);//We said this tour router should use the reviewRouter..., keep in mide that router it self it just a middlewarre, we just said when ever we find a URL like '/:tourId/reviews' then call reviewRouter 


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



module.exports = router;
