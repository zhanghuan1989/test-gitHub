/**
 * Created by beiwp on 2016/5/10.
 */

var app = require('express');
var querystring = require('querystring');
var http = require('http');

exports.callInterface = function(req,res,next){


    var postData = querystring.stringify({
        "uname": "15078381887",
        "village_num": "0003006",
        "page": "1"
    });

    var options = {
        hostname: '10.20.101.115',
        port: null,
        path: '/appInterface.php?m=sns&s=myCollectGoods&version=3.0',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    var req = http.request(options, function(res) {
        console.log('STATUS:' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY:' + chunk);
            //res.write(chunk);//
        });
        res.on('end', function (chunk) {
            console.log('No more data in response.');
            res.write(chunk);//
        })
    });

    req.on('error', function(e){
        console.log('problem with request: '+e.message);
    });

    // write data to request body
    req.write(postData);
    req.end();

}

