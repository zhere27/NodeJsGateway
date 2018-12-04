'use strict';
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = global.gConfig.dbConfig;

router.get('/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();           
        request.query('SELECT TOP 10 * FROM Events ORDER BY 1 DESC', function (err, recordset) {  
            if (err) console.log(err)
            res.send({'status': 200, 'message': 'OK.', 'response': recordset.recordset});
            sql.close();
        });
    });
});

module.exports = router