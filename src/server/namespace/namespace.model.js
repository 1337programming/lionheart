var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NamespaceSchema = new Schema({
  name: String,
  content: [{text: String, meta: {name: String}, fileType: String, authorable: Boolean}],
  permissions: Array
});

// Virtuals
NamespaceSchema.virtual('info').get(function () {
  return {
    name: this.name,
    permission: this.permission
  };
});

NamespaceSchema.virtual('name.full').set(function (name) {
  this.name = name;
});

NamespaceSchema.virtual('permissions.group').set(function (permissions) {
  this.permissions = permissions;
});

// Static
NamespaceSchema.statics.findByName = function (name, cb) {
  return this.find({name: new RegExp(name, 'i')}, cb);
};

module.exports = mongoose.model('Namespace', NamespaceSchema);
