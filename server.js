var express = require('express'),
	multer  = require('multer'),    
	kuponDeal = require('./routes/kuponDeal');

var app = express();
var done=false;

app.use(multer({ dest: 'C:/tmp/',
    rename: function (fieldname, filename) {
        return filename+"_"+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done=true;
    }
}));

app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Credentials","true");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  res.header("Access-Control-Request-Headers","accept, content-type");
	  res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
	  next();
});


/*Kupon deal codeing*/
app.get('/allKuponDeal', kuponDeal.findAll);
app.get('/kuponDeal/:id', kuponDeal.findById);
app.get('/kuponDealType/:type', kuponDeal.findByType);
app.post('/saveKuponDeals', kuponDeal.addKuponDeal);
app.put('/updateKuponDeal/:id', kuponDeal.updateKuponDeal);
app.delete('/deleteKuponDeal/:id', kuponDeal.deleteKuponDeal);
app.delete('/removeAllKuponDeal', kuponDeal.removeAllKuponDeal);

app.post('/uploadDealImages',function(req,res){
    if(done==true){
        console.log(req.files);
        res.end(JSON.stringify(req.files));
    }
});

app.get('/uploadIndx',function(req,res){
    res.sendfile("index.html");
});

app.listen(3000);
console.log('Listening on port 3000...');