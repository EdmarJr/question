var fs = require('fs');
var express = require('express'),
    cfg = require('./config.json'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    load = require('express-load'),
    app = express(),
    methodOverride = require('method-override'),
    httpStatus = require('http-status-codes'),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    cookie = cookieParser(cfg.SECRET);

app.use(express.static(__dirname + '/publico'));
app.use(express.static(__dirname + '/publico/rest'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser("imageUp"));
app.use(session({
    secret: cfg.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(methodOverride('_method'));

load('utils').then('controllers').into(app);

io.use(function(socket, next) {
    var data = socket.request;
    cookie(data, {}, function(err) {
        var sessionID = data.signedCookies[cfg.SECRET];
        store.get(sessionID, function(err, session) {
            if (err || !session) {
                return next(new Error('not authorized'));
            } else {
                socket.handshake.session = session;
                return next();
            }
        });
    });
});

server.listen(3000,function() {
    console.log("subiu");
});