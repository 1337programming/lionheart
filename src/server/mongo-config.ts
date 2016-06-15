let mongoose = require('mongoose');
let argv = require('yargs').argv;

export default function () {
  
  if (argv.debug) {
    mongoose.set('debug', true);
  }

  mongoose.connect('mongodb://localhost/lionheart', {
    db: {
      safe: true
    }
  });
  mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  });

}