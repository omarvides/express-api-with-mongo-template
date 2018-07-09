const mongoose = require('mongoose');

// For more scheme types go to http://mongoosejs.com/docs/schematypes.html

const sampleSchema = mongoose.Schema({
  mystring: { type: String, required: true },
  mynumber: { type: Number, required: false },
});

module.exports = sampleSchema;
