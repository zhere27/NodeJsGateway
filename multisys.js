'use strict';
const express = require('express')
const router = express.Router()

const request = require('request');
const config = global.gConfig.multisysConfig;

router.post('/inquire', function (req, res) {
    var url = config.url + '/' + config.inquire;
    var options = {
        method: 'POST',
        url: url,
        headers: { '<header>': config.secret },
        qs: req.query,
        useQuerystring: true,
        json: true,
        proxy: '<complete proxy address>',
        timeout: 30000
    };
    request(options,
      function (err, response, body) {
        if (err) { res.send(err); }
        if (response.body != undefined)
            res.send(response.body);
        else
            res.send({'status': response.statusCode, 'reason': 'Bad Request.' });
      })
})

router.post('/process', function (req, res) {
    var url = config.url + '/' + config.post;
    var options = {
        method: 'POST',
        url: url,
        headers: { '<header>': config.secret },
        qs: req.query,
        useQuerystring: true,
        json: true,
        proxy: '<complete proxy address>',
        timeout: 30000
    };
    request(options,
      function (err, response, body) {
        if (err) { res.send(err); }
        if (response.body != undefined)
            res.send(response.body);
        else
            res.send({'status': response.statusCode, 'reason': 'Bad Request.' });
      })
})

router.post('/parameters', function (req, res) {
    var url = config.url + '/' + config.parameters;
    var options = {
        method: 'POST',
        url: url,
        headers: { '<header>': config.secret },
        qs: req.query,
        useQuerystring: true,
        json: true,
        proxy: '<complete proxy address>',
        timeout: 30000
    };
    request(options,
      function (err, response, body) {
        if (err) { res.send(err); }
        if (response.body != undefined)
            res.send(response.body);
        else
            res.send({'status': response.statusCode, 'reason': 'Bad Request.' });
      })
})
module.exports = router