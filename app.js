const express = require('express');
const route = require('./Routes/routing');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log('TheGoodLife Welcomes You!');
});