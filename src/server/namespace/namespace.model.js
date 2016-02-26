var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NamespaceSchema = new Schema({
  name: String,
  content: Array,
  users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

// Static
NamespaceSchema.statics.findByName = function (name, cb) {
  return this.find({name: new RegExp(name, 'i')}, cb);
};

module.exports = mongoose.model('Namespace', NamespaceSchema);
