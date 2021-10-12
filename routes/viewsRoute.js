const express = require('express');
const viewsControler = require('../controlers/viewsControler');
const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'Salim',
//   }); //it will intothe views folder and then get the template with the name  base fromit, all this becauseofthePUG engine, inorder to pass some data inthe template, allwe need is to define an object with variables called locals in the pug file
// }); //we always use get to render page in the browser, with (/) the root of the website

router.get('/', viewsControler.getOverview);

router.get('/tour', viewsControler.getTour);


module.exports = router;