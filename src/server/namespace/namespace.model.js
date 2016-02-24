var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NamespaceSchema = new Schema({
  id: String,
  name: String,
  content: [{text: String, meta: {name: String}, fileType: String, authorable: Boolean}],
  permissions: Array
});

// virtuals
NamespaceSchema.virtual('info').get(function () {
  return {
    id: this.id,
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

module.exports = mongoose.model('Namespace', NamespaceSchema);
