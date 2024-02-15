const express = require('express');
const route = require('./Routes/routing');
const bodyParser = require('body-parser');
const errorLogger = require('./Utilities/errorLogger');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);
app.use(errorLogger);

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log('TheGoodLife Welcomes You!');
});