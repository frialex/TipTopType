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



app.get('/dirty',function(req, res){
    var dirtone = "He released my hands and I was now grinding up at his big cock moaning hard as I was cumming over and over. I couldn't help myself I screamed out 'fuck me daddy fuck me'!"

    var dirttwo = "That got him going real good he began pounding my wet pussy hard, fast and deep. We were both moaning loud and I was shaking from cumming so much, I could tell he was close to cuming by his facial expression and how his cock was throbbing deep in me.";

    var dirty = { said: dirtone + dirttwo,
                    by: 'Amber',
                    type: 'sexy'
                }


    res.render('exceptional_quote', dirty);
});

app.get('/', function(req, res, next){
    var quote ={ said: "Be the change that you wish to see in the world.",
                    by: "Mahatma Gandhi",
                    type: 'bold'};

    quote.said = quote.said.split(' ');
    res.render('exceptional_quote', quote);
});

app.get(function FourOFour(req, res, next){
    var data = lorem({ count: 2, units: 'sentences' }).split(' ');
    console.log(data);
    var out = { data: data };
    res.render('random_quote',out)
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




