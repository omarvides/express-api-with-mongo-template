require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers/hello-controllers');
const logger = require('../utilities/logger');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', process.env.NODE_PORT || 3000);

app.get('/hello', controllers.helloController);

app.listen(app.get('port'), () => {
  logger.info(`API running on port ${app.get('port')}`);
});
