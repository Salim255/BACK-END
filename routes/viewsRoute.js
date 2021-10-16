const express = require('express');
const viewsControler = require('../controlers/viewsControler');
const authControler = require('../controlers/authControler');
const router = express.Router();

router.use(authControler.isLoggedIn);//this will be applayed to all coming routers...
router.get('/', viewsControler.getOverview);
router.get('/tour/:slug', viewsControler.getTour);
router.get('/login', viewsControler.getLoginForm);

module.exports = router;
