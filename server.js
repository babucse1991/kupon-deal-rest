var express = require('express'),
    
 kuponDeal = require('./routes/kuponDeal');

var app = express();


app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  res.header("Access-Control-Request-Headers","accept, content-type");
	  res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
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