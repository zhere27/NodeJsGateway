'use strict';
const express = require('express')
const router = express.Router()

const request = require('request');
const defaults = request.defaults({
    'proxy': '<complete proxy address>', 
    'timeout': 30000,
    'connection': 'keep-alive'});
const options = { 'request': defaults };
const soap = require('soap');
const url = '<url>';

router.get('/getBillers/:tpaId', function (req, res) {
    soap.createClient(url, options, function(err, client){
        if (err) { res.send(err.message); return; }
        client.GetBillers(req.params, function(err, response){
            if (err) { res.send(err.message); return; }
            if (response.GetBillersResult != undefined)
                res.send(response.GetBillersResult);
            else
                res.send("CBCI Webservice Gateway MultiSys returned nothing.");
        });
    });
})

router.get('/getBillerRules/:tpaId/:merchantId', function (req, res) {
    soap.createClient(url, options, function(err, client){
        if (err) { res.send(err.message); return; }
        client.GetBillerRules(req.params, function(err, response){
            if (err) { res.send(err.message); return; }
            if (response.GetBillerRulesResult != undefined)
                res.send(response.GetBillerRulesResult);
            else
                res.send("CBCI Webservice Gateway MultiSys returned nothing.");
        });
    });
})

router.get('/Parameters/:tpaId/:merchantId', function (req, res) {
    soap.createClient(url, options, function(err, client){
        if (err) { res.send(err.message); return; }
        client.Parameters(req.params, function(err, response){
            if (err) { res.send(err.message); return; }
            if (response.ParametersResult != undefined)
                res.send(response.ParametersResult);
            else
                res.send("CBCI Webservice Gateway MultiSys returned nothing.");
        });
    });
})

router.get('/Inquire/:tpaId/:refNo/:merchantId', function (req, res) {
    soap.createClient(url, options, function(err, client){
        if (err) { res.send(err.message); return; }
        client.Inquire(req.params, function(err, response){
            if (err) { res.send(err.message); return; }
            if (response.InquireResult != undefined)
                res.send(response.InquireResult);
            else
                res.send("CBCI Webservice Gateway MultiSys returned nothing.");
        });
    });
})

router.post('/InquireParameters', function (req, res) {
    if (req.body == undefined) {
        res.send("Invalid request.");
    }
    var params = {
        tpaId: req.body.tpaId,
        refNo: req.body.refNo,
        merchantId: req.body.merchantId,
        parameters: { string: req.body.parameters },
        values: { string: req.body.values }
    }
    soap.createClient(url, options, function(err, client){
        if (err) { res.send(err.message); return; }
        client.InquireParameters(params, function(err, response){
            if (err) { res.send(err.message); return; }
            if (response.InquireParametersResult != undefined)
                res.send(response.InquireParametersResult);
            else
                res.send("CBCI Webservice Gateway MultiSys returned nothing.");
        });
    });
})

router.post('/Post', function (req, res) {
    if (req.body == undefined) {
        res.send("Invalid request.");
    }
    var params = {
        tpaId: req.body.tpaId,
        refNo: req.body.refNo,
        merchantId: req.body.merchantId,
        amount: req.body.amount,
        timestamp: req.body.timestamp
    }
    soap.createClient(url, options, function(err, client){
        if (err) { res.send(err.message); return; }
        client.Post(params, function(err, response){
            if (err) { res.send(err.message); return; }
            if (response.PostResult != undefined)
                res.send(response.PostResult);
            else
                res.send("CBCI Webservice Gateway MultiSys returned nothing.");
        });
    });
})

module.exports = router