var mongoose = require('mongoose');
mongoose.connect('mongodb://123.0.0.1:27017/lionheart', {
	db: {
		safe: true
	}
});
