var express = require('express');
var app = express();
var util = require('util')
var path = require('path');

var lorem = require('lorem-ipsum');

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

app.get('/random-quote', function(req, res){
    var data = lorem({ count: 2, units: 'sentences' }).split(' ');
    console.log(data);
    var out = { data: data };
    res.render('random_quote',out)
});

app.get('/quote', function(req, res, next){
    var quote ={ said: "Be the change that you wish to see in the world.",
                    by: "Mahatma Gandhi",
                    type: 'bold'};

    quote.said = quote.said.split(' ');
    res.render('exceptional_quote', quote);
});

app.use(function FourOFour(req,res,next){
    console.log('404 not found function');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var port = process.env.port || 3000;
var server = app.listen(port, function(){
    console.log(server);
    console.log('Listening on port %d', server.address().port);
});

//app.use(function(err, req, res, next){
//    console.log(err);
//});

//install bower

//default data [hard code, worry about mongo later]

//default behavior




