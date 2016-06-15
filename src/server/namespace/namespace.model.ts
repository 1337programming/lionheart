import Content from '../content/content.model';

let crypto = require('crypto');
let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NamespaceSchema = new Schema({
  name: String,
  content: [Content],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

// Static
NamespaceSchema.statics.findByName = (name, cb) => {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

var NamespaceModel = mongoose.model('Namespace', NamespaceSchema);
export default NamespaceModel;

