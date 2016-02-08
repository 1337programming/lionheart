module.exports = function(app) {
	app.use('/api/users', require('./user'));

	app.use('/auth', require('./auth'));
};
