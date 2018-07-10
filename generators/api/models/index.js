const mongoose = require('mongoose');
const Schema = require('./model-schema');

const Model = mongoose.model('Sample', Schema);
const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;

function create(properties, callback) {
  // use properties for your new instance
  mongoose.connect(connectionString).then(
    () => {
      const newEntry = new Model({
        mystring: 'New Entry',
        mynumber: 1,
      });
      newEntry.save().then(
        (docs) => {
          mongoose.connection.close();
          return callback(null, docs);
        },
        (err) => {
          mongoose.connection.close();
          return callback(err);
        },
      );
    },
    err => callback(`MongoDB connection error: ${err}`),
  );
}

function get(properties, callback) {
  mongoose.connect(connectionString).then(
    () => {
      Model.find({}, (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      });
    },
    (err) => { callback(`MongoDB connection error: ${err}`); },
  );
}


module.exports = { create, get };
