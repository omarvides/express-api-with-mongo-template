const mongoose = require('mongoose');
const HelloSchema = require('./hello-model-schema');

const HelloModel = mongoose.model('Item', HelloSchema);
const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;

function createHello(properties, callback) {
  mongoose.connect(connectionString).then(
    () => {
      const newHello = new HelloModel({
        mystring: 'Hello',
        mynumber: 1,
      });
      newHello.save().then(
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

function getHello(properties, callback) {
  mongoose.connect(connectionString).then(
    () => {
      HelloModel.find({}, (err, results) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      });
    },
    (err) => { callback(`MongoDB connection error: ${err}`); },
  );
}


module.exports = { createHello, getHello };
