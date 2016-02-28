module.exports = function(app) {
	app.use('/api/users', require('./user'));

	app.use('/auth', require('./auth'));
	app.use('/namespace', require('./namespace'));
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'static/index.html');
  });
};
