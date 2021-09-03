const express = require('express');
const userControler = require('./../controlers/usersControler'); //an object of variables
const authControler = require('./../controlers/authControler'); 
//creating new router as a middlewer
const router = express.Router();
//4)ROUTES*******************************************************

router.post('/signup', authControler.signup);//We allso have a special route for authenticaion
router.post('/login', authControler.login);

router.post('/forgotPassword', authControler.forgotPassword);
router.post('/resetPassword', authControler.resetPassword);

/////Routes in REST format
router.route('/').get(userControler.getAllUsers).post(userControler.createUser);


router
  .route('/:id')
  .get(userControler.getUser)
  .patch(userControler.updateUser)
  .delete(userControler.deleteUser);

module.exports = router;
