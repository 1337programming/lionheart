var crypto = require('crypto');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowercase: true
    },
    role: {
        type: String,
        default: 'user'
    },
    password: String,
    provider: String,
    salt: String
});

/**
 * Virtuals
 */

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            'name': this.name,
            'role': this.role
        };
    });

// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function() {
        return {
            '_id': this._id,
            'role': this.role
        };
    });

/**
 * Validations
 */
// Validate empty name
UserSchema
    .path('name')
    .validate(function(name) {
        return name.length;
    }, 'Name cannot be blank');

// Validate empty email
UserSchema
    .path('email')
    .validate(function(email) {
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('password')
    .validate(function(password) {
        return password.length;
    }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
    .path('email')
    .validate(function(value, respond) {
        console.log('Validating email');
        var self = this;
        return self.constructor.findOne({
            email: value
        }, function(err, user) {
            if (err) {
                throw err;
            }
            if (user) {
                if (self.id === user.id) {
                    return respond(true);
                }
                return respond(false);
            }
            return respond(true);
        });
    }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
    .pre('save', function(next) {
        var self = this;
        // Handle new/update passwords
        if (!self.isModified('password')) {
            return next();
        }

        if (!validatePresenceOf(this.password)) {
            next(new Error('Invalid password'));
        }

        // Make salt with a callback
        self.makeSalt(function(saltErr, salt) {
            if (saltErr) {
                next(saltErr);
            }
            self.salt = salt;
            self.encryptPassword(self.password, function(encryptErr, hashedPassword) {
                if (encryptErr) {
                    next(encryptErr);
                }
                self.password = hashedPassword;
                next();
            });
        });
    });

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @param {Function} callback
     * @return {Boolean}
     * @api public
     */
    authenticate: function(password, callback) {
        var self = this;
        if (!callback) {
            return this.password === this.encryptPassword(password);
        }

        console.log('pre encrypt', password);
        this.encryptPassword(password, function(err, pwdGen) {
            console.log('post encrypt', err, pwdGen, self.password);
            if (err) {
                return callback(err);
            }

            if (self.password === pwdGen) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    },

    /**
     * Make salt
     *
     * @param {Number} byteSize Optional salt byte size, default to 16
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    makeSalt: function(byteSize, callback) {
        var defaultByteSize = 16;

        if (typeof arguments[0] === 'function') {
            callback = arguments[0];
            byteSize = defaultByteSize;
        } else if (typeof arguments[1] === 'function') {
            callback = arguments[1];
        }

        if (!byteSize) {
            byteSize = defaultByteSize;
        }

        if (!callback) {
            return crypto.randomBytes(byteSize).toString('base64');
        }

        return crypto.randomBytes(byteSize, function(err, salt) {
            if (err) {
                callback(err);
            } else {
                callback(null, salt.toString('base64'));
            }
        });
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    encryptPassword: function(password, callback) {
        if (!password || !this.salt) {
            return null;
        }

        var defaultIterations = 10000;
        var defaultKeyLength = 64;
        var salt = new Buffer(this.salt, 'base64');

        if (!callback) {
            return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                .toString('base64');
        }

        return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, function(err, key) {
            if (err) {
                callback(err);
            } else {
                callback(null, key.toString('base64'));
            }
        });
    }
};

module.exports = mongoose.model('User', UserSchema);
