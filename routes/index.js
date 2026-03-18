const express = require('express');
const router = express.Router();
const userRoute = require('../routes/users');
const catwaysRoute =require('../routes/catways');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRoute);
router.use('/catways', catwaysRoute)


module.exports = router;