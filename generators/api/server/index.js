require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const models = require('../models');
const controllers = require('../controllers/controllers');
const routes = require('../routes/routes');
const logger = require('../utilities/logger');


const app = express();
const configuredControllers = controllers.configure(models);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', process.env.NODE_PORT || 3000);

routes(app, configuredControllers);

app.listen(app.get('port'), () => {
  logger.info(`API running on port ${app.get('port')}`);
});

module.exports = app;
