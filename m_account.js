'use strict';
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = global.gConfig.dbConfig;

router.route('/')
.get(function (req, res) {      
    var queries = Object.keys(req.query).length;
    if (queries < 1)
    {
        res.send({'status': 400, 'message': 'Bad Request.', 'response': null});
        return;
    }    
    var accountId = req.query.accountId;
    var accountName = req.query.accountName;
    if (accountId == undefined && accountName == undefined)
    {
        res.send({'status': 400, 'message': 'Bad Request.', 'response': null});
        return;
    }    
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        var select = 'SELECT';
        var fromDb = 'FROM <databas>.dbo.<table>';
        var command = '';
        if (accountId == null && accountName == null)
            command = select + ' * ' + fromDb + ' ORDER BY 1 DESC';
        else
        {
            command = select + ' TOP 1 * ' + fromDb;
            command += ' WHERE ';
            var hasCondition = false;
            if (accountId != null)
            {
                request.input('accountId', accountId);
                command += 'AccountId = @accountId';
                hasCondition = true;
            }
            if (accountName != null)
            {
                request.input('accountName', accountName)
                if (hasCondition)
                    command += ' OR ';
                command += 'AccountName = @accountName';
            }
        }
        request.query(command,
            function (err, recordset) {  
                processResult(err, recordset, res);
        });
    });
})
.post(function (req, res) {   
    res.send('Add an account.');
})
.put(function (req, res) {
    var accountId = req.query.accountId;
    var queries = Object.keys(req.query).length;
    if (queries < 1)
    {
        res.send({'status': 400, 'message': 'Bad Request.', 'response': null});
        return;
    }    
    var bodies = Object.keys(req.body).length;
    if (bodies < 1)
    {
        res.send({'status': 400, 'message': 'Bad Request.', 'response': null});
        return;
    }
    var accountName = req.body.accountName;
    var walletThreshold = req.body.walletThreshold;
    if (walletThreshold == undefined && accountName == undefined)
    {
        res.send({'status': 400, 'message': 'Bad Request.', 'response': null});
        return;
    }
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        var updateCmd = 'UPDATE <databas>.dbo.<table> SET';
        var whereCmd = ' WHERE AccountId = @accountId';
        var command = updateCmd;
        if (accountName != undefined)
        {
            request.input('accountName', accountName)
            command += ' AccountName = @accountName,'
        }
        if (walletThreshold != undefined)
        {
            request.input('walletThreshold', walletThreshold)
            command += ' WalletThreshold = @walletThreshold,'
        }
        if (command.lastIndexOf(',') == command.length - 1)
            command = command.substr(0, command.length - 1);
        command += whereCmd;
        request.input('accountId', accountId)
        request.query(command,
            function (err, recordset) {  
                processResult(err, recordset, res);
        });
    });
})

function processResult(err, recordset, res)
{
    sql.close();
    if (err) { res.send(err.message);  }
    if (recordset.rowsAffected.length == 1)
    {
        if (recordset.rowsAffected[0] >= 1)
            res.send({'status': 200, 'message': 'OK.', 'response': null});
        else
            res.send({'status': 404, 'message': 'Not found.', 'response': null});
    }
    else if (recordset.recordsets.length <= 0)
        res.send({'status': 404, 'message': 'Not found.', 'response': null});
    else if (recordset.recordsets[0].length > 1)
        res.send({'status': 200, 'message': 'OK.', 'response': recordset.recordsets[0]});
    else
        res.send({'status': 200, 'message': 'OK.', 'response': recordset.recordsets[0][0]});
}
module.exports = router;