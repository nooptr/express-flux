var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var methodOverride = require("method-override");
var session = require("express-session");
var csurf = require("csurf");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var cors = require('cors');

var app = express();
app.use(cors());

// connect to mongodb
mongoose.connect("mongodb://localhost/todo");

app.set('port', (process.env.PORT || 5000));
app.set('appPath', path.normalize(__dirname + '/../public'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// HTTP METHOD を上書き
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// SessionとCSRF、flashメッセージの設定
//app.use(session({
//    secret: "keyword cat",
//    resave: false,
//    saveUninitialized: false
//}));
//app.use(csurf());
app.use(flash());

require('./routes/restapi')(app);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
