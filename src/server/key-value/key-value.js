var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KeyValue = module.exports = mongoose.model('KeyValue', new Schema({
	key: String,
	value: String
}));

KeyValue.save = function(keyValue, cb) {
	var query = {
		key: keyValue.key
	};
	KeyValue.findOneAndUpdate(query, keyValue, {upsert: true}, function saveResponse(err, keyValue) {
		cb(err, keyValue);
	});
};
