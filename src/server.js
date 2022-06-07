const express = require('express');
const app = express();
 
const router = require('./routes');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(router);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app;