'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());process.env.NODE_ENV = 'development';
const config = require('./config');

const cbcimultisys = require('./cbcimultisys');
app.use('/cbcimultisys', cbcimultisys);
const multisys = require('./multisys');
app.use('/multisys', multisys);
const jwtauth = require('./jwtauth');
app.use('/jwtauth', jwtauth);
const events = require('./events');
app.use('/events', events);
const mAccount = require('./account');
app.use('/account', mAccount);

app.get('/', (req, res) => {
    res.json(global.gConfig);
});

var server = app.listen(global.gConfig.node_port, function () {
    var port = global.gConfig.node_port;
    console.log('Server is running at port %s...', port);
});