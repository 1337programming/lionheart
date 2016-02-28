var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NamespaceSchema = new Schema({
  name: String,
  content: Array
});

// Virtuals
NamespaceSchema.virtual('info').get(function () {
  return {
    name: this.name,
    content: this.content
  };
});

NamespaceSchema.virtual('name.full').set(function (name) {
  this.name = name;
});

NamespaceSchema.virtual('content.add').set(function (content) {
  this.content.push(content);
});



// Static
NamespaceSchema.statics.findByName = function (name, cb) {
  return this.find({name: new RegExp(name, 'i')}, cb);
};

module.exports = mongoose.model('Namespace', NamespaceSchema);
