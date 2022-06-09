//setup express
var express = require('express');
var app = express();
//setup fs
var fs = require('fs');
//setup mysql
/*var mysql = require('mysql');
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
});*/

app.get('/', function (req, res) {
    //let req.query.start and req.query.end
    let start = parseInt(req.query.start);
    let end = parseInt(req.query.end);
    //find prime numbers between start and end
    let primes = [];
    for (let i = start; i <= end; i++) {
        let isPrime = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
    }
    //get today
    let today = new Date();
    //header all accesss
    res.header("Access-Control-Allow-Origin", "*");
    res.send(primes);
    //if prime.json not exist, create it
    if (!fs.existsSync('prime.json')) {
        let data = []
        data.push({
            start: start,
            end: end,
            prime: primes,
            primecount: primes.length,
            Timestamp: today.toLocaleString()
        });
        fs.writeFileSync('prime.json', JSON.stringify(data));
    }else{
        //if prime.json exist, read it
        let data = JSON.parse(fs.readFileSync('prime.json'));
        //add new data to data
        data.push({
            start: start,
            end: end,
            prime: primes,
            primecount: primes.length,
            Timestamp: today.toLocaleString()
        });
        //write data to prime.json
        fs.writeFileSync('prime.json', JSON.stringify(data));
    }
});

app.get('/history', function (req, res) {
    //read prime.json
    let data = JSON.parse(fs.readFileSync('prime.json'));
    //header all accesss
    res.header("Access-Control-Allow-Origin", "*");
    res.send(data);
});

app.listen(4000, function () {
    console.log('Listening on port 3000');
})