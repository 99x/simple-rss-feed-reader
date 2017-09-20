/*global module*/

(function () {
  var express = require('express');
  var router = express.Router();

  router.use(function timeLog(req, res, next) {
      console.log('Time: ', Date.now());
      next();
    });

  // define the home page route
  router.get('/', function (req, res) {
      res.send('json Reader home page');
    });

  module.exports = router;

}());
