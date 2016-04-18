var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
    key: String,
    value: String,
    createdDate: Date,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    modifiedDate: Date,
    modifier: { type: Schema.Types.ObjectId, ref: 'User' },
    description: String
});

ContentSchema.pre('save', function(next) {
	console.log('Saving', this);
    next();
});

module.exports = ContentSchema;
