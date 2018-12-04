'use strict';
const express = require('express')
const router = express.Router()
const fileStream = require('fs');
const jwt = require('jsonwebtoken');
const keyFile = fileStream.readFileSync('./private.key', 'utf8');

router.post('/generateToken', function (req, res) {
    var publicKey = req.headers.authorization;
    var fileData = keyFile.split('\r\n');
    var privateKey = '';
    for (var i = 0; i < fileData.length; i++)
    {
        var pubKey = fileData[i].split('-')
        if (pubKey[4] == publicKey)
            privateKey = fileData[i];
    }
    generateToken(req.body, privateKey, function(token) {
        res.send({'status': 200, 'message': 'OK', 'response': token});
        //res.send(token);
    });
});

router.post('/verifyToken', function(req, res) {
    var publicKey = req.headers.authorization;
    var tpaId = req.body.tpaId;
    if (tpaId == undefined)
    {
        res.send({'status': 400, 'message': 'Bad Request', 'response': token});
        //res.send('Invalid TPA.');
        return;
    }
    var fileData = keyFile.split('\r\n');
    var privateKey = '';
    for (var i = 0; i < fileData.length; i++)
    {
        var pubKey = fileData[i].split('-')
        if (pubKey[4] == publicKey)
            privateKey = fileData[i];
    }
    verifyToken(req.body.token, privateKey, function(result) {
        if (result.tpaId == tpaId)
            res.send({'status': 200, 'message': 'OK', 'response': token});
            //res.send("Token is valid.");
        else
            res.send({'status': 401, 'message': 'Unauthorized token.', 'response': null});
            //res.send("Token is INVALID.")
        //res.send(result);
    });
});

function generateToken(payload, privateKey, callback)
{
    var token = jwt.sign(payload, privateKey, global.gConfig.jwtSign);
    callback(token);
}

function verifyToken(token, privateKey, callback)
{
    var result = jwt.verify(token, privateKey, global.gConfig.jwtSign);
    callback(result);
}

module.exports = router