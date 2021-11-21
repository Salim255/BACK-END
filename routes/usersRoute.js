const express = require('express');

const userControler = require('./../controlers/usersControler'); //an object of variables
const authControler = require('./../controlers/authControler');


//creating new router as a middlewer
const router = express.Router();//This router here is juste lik a mini app so we cans use it lik: router.use(enymidleware)


//4)ROUTES*******************************************************

router.post('/signup', authControler.signup); //We allso have a special route for authenticaion
router.post('/login', authControler.login);
router.get('/logout', authControler.logout);
router.post('/forgotPassword', authControler.forgotPassword);
router.patch('/resetPassword/:token', authControler.resetPassword);

router.use(authControler.protect);///So in order to protect all the route comes after this middleware from no signed user w

router.patch(
  '/updateMyPassword',
  authControler.updatePassword
);

router.get('/me', userControler.getMe, userControler.getUser);//authControler.protect  =>to verifie that the user is loged in, and will addd the ser to the current request, then we can read the id fro the current user  
router.patch('/updateMe', userControler.uploadUserPhoto, userControler.updateMe);
router.delete('/deleteMe',  userControler.deleteMe);


router.use(authControler.restrictTo('admin'));//The route that comes after ar restrict to damin use 

/////Routes in REST format
router.route('/').get(userControler.getAllUsers).post(userControler.createUser);

router
  .route('/:id')
  .get(userControler.getUser)
  .patch(userControler.updateUser)
  .delete(userControler.deleteUser);


module.exports = router;
