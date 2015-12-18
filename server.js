var express = require('express'),
    
 kuponDeal = require('./routes/kuponDeal');

var app = express();

app.disable('etag');

app.all('/*', function(req, res, next) {
	 // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});


/*Kupon deal codeing*/
app.get('/allKuponDeal', kuponDeal.findAll);
app.get('/kuponDeal/:id', kuponDeal.findById);
app.get('/kuponDealType/:type', kuponDeal.findByType);
app.post('/saveKuponDeals', kuponDeal.addKuponDeal);
app.put('/updateKuponDeal/:id', kuponDeal.updateKuponDeal);
app.delete('/deleteKuponDeal/:id', kuponDeal.deleteKuponDeal);
app.delete('/removeAllKuponDeal', kuponDeal.removeAllKuponDeal);

app.listen(3000);
console.log('Listening on port 3000...');