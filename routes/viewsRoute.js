const express = require('express');
const viewsControler = require('../controlers/viewsControler');
const authControler = require('../controlers/authControler');
const router = express.Router();

router.get('/', authControler.isLoggedIn, viewsControler.getOverview);
router.get('/tour/:slug', authControler.isLoggedIn, viewsControler.getTour);
router.get('/login', authControler.isLoggedIn, viewsControler.getLoginForm);
router.get('/me', authControler.protect, viewsControler.getAccount);

module.exports = router;
