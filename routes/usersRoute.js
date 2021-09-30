const express = require('express');
const userControler = require('./../controlers/usersControler'); //an object of variables
const authControler = require('./../controlers/authControler');

//creating new router as a middlewer
const router = express.Router();
//4)ROUTES*******************************************************

router.post('/signup', authControler.signup); //We allso have a special route for authenticaion
router.post('/login', authControler.login);

router.post('/forgotPassword', authControler.forgotPassword);
router.patch('/resetPassword/:token', authControler.resetPassword);

router.patch(
  '/updateMyPassword',
  authControler.protect,
  authControler.updatePassword
);

router.get('/me', authControler.protect, userControler.getMe, userControler.getUser);//authControler.protect  =>to verifie that the user is loged in, and will addd the ser to the current request, then we can read the id fro the current user  
router.patch('/updateMe', authControler.protect, userControler.updateMe);
router.delete('/deleteMe', authControler.protect, userControler.deleteMe);

/////Routes in REST format
router.route('/').get(userControler.getAllUsers).post(userControler.createUser);

router
  .route('/:id')
  .get(userControler.getUser)
  .patch(userControler.updateUser)
  .delete(userControler.deleteUser);


module.exports = router;
