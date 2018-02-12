var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Foodmaniac | Home' });
});

router.get('/listpage/:queryparams', function(req, res, next) {
  res.render('index', { title: 'Foodmaniac | Search Results' });
});

router.get('/detailpage/:restaurandid', function(req, res, next) {
  res.render('index', { title: 'Foodmaniac | Restaurant Details' });
});

module.exports = router;
