let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentModel = new Schema({
  key: String,
  value: String,
  createdDate: Date,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  modifiedDate: Date,
  modifier: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String
});

ContentModel.pre('save', (next) => {
  console.log('Saving', this);
  next();
});

export default ContentModel;