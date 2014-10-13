var express = require('express');
var app = express();
var util = require('util')
var path = require('path');

app.set('views', './views');
app.set('view engine', 'jade');

app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
console.log(path.join(__dirname, '/scripts'));

app.get('/route', function(req,res){
    res.send(req.route);
});

app.get('/request', function(req, res){
    res.send(util.inspect(req));
});

app.get('/', function(req, res){
    var data = {};
    res.render('tiptoptypest',data)
});

app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var port = process.env.port || 3000;
var server = app.listen(port, function(){
    console.log('Listening on port %d', server.address().port);
    util.debug(server);
});

//app.use(function(err, req, res, next){
//    console.log(err);
//});

//install bower

//default data [hard code, worry about mongo later]

//default behavior




