const express = require('express');
const userControler = require('./../controlers/usersControler');//an object of variables
//creating new router as a middlewer
const router = express.Router();
//4)ROUTES*******************************************************

router.route('/').get(userControler.getAllUsers).post(userControler.createUser);
router
  .route('/:id')
  .get(userControler.getUser)
  .patch(userControler.updateUser)
  .delete(userControler.deleteUser);
// app.route('/api/v1/users').get(getAllUsers).post(createUser);
// app
//   .route('/api/v1/users/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);
//In order to connect these tw


module.exports = router;
