(function () {
  'use strict';

  var http = require('http');
  var express = require('express');
  var methodOverride = require('method-override');
  var bodyParser = require('body-parser');
  var appConfigs = require('./app/configs/configs.app.js');
  var rssReaderEndpoint = require('./app/endpoints/rssreader.route');

  var rssReaderApp = express();
  var server = http.createServer(rssReaderApp);

  // setting up the port
  var port = appConfigs.serverPort;

  var connectToDb = function () {
    //connecting to Database Stuff
  };

  connectToDb();

  // configure app to use bodyParser(). This will help to get data from POST
  rssReaderApp.use(bodyParser.json());
  rssReaderApp.use(bodyParser.urlencoded({ extended: true }));
  rssReaderApp.use(methodOverride('X-HTTP-Method-Override'));

  // set the static files location /public/img will be /img for users
  rssReaderApp.set('view options', { layout: false });
  rssReaderApp.use(express.static(__dirname + '/public'));

  rssReaderApp.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    next();
  });

  // routes
  require('./app/routes/publicRoutes.routes')(rssReaderApp); // configure our routes

  //Registering the Routes & all the routes will be prefixed by /api
  rssReaderApp.use('/api', rssReaderEndpoint);

  // start app
  rssReaderApp.listen(port);
  console.log('Server Started on port ' + port);

  // expose app
  exports = module.exports = rssReaderApp;

}());
