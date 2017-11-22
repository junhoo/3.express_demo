const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.middlewares = [];
    next();
})

// 函数1
function fnGet1() {
    return function (req, res, next) {
        console.log('fnGet1');
        req.middlewares.push('fnGet1')
        next();
    };
}

// 函数2
function fnGet2(req, res, next) {
    console.log('fnGet2');
    req.middlewares.push('fnGet2')
    next();
}

// 函数3
function fnGet3() {
    console.log('fnGet3');
    req.middlewares.push('fnGet3')
    res.end(JSON.stringify(req.middlewares));
}

app.use('/', fnGet1());

app.get('/article', fnGet2);

app.post('/user', fnGet2);

app.use(fnGet3);

app.use((err, req, res, next) => {
    res.end(err)
});

server.listen('8080');