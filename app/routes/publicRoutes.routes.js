module.exports = function (app) {

  // server routes
  app.get('/', function (req, res) {
    res.render('/public/index.html');
  });
};
