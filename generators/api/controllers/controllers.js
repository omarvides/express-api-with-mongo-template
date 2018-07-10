function configure(model) {
  return {
    create(callback) {
      model.create({}, (err) => {
        if (err) {
          return callback(err);
        }
        return callback();
      });
    },
    get(callback) {
      model.get({}, (err, objects) => {
        if (err) {
          return callback(err);
        }
        return callback(null, objects);
      });
    },
  };
}

module.exports = { configure };
