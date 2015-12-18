var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').BSON,
    assert = require('assert');

var db = new Db('kuponDealsdb', new Server('localhost', 27017, {auto_reconnect: true}));

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'kuponDeal Db' database");
        db.collection('kuponDeal', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'kuponDeal' collection doesn't exist. Creating it with sample data...");
                populateAllKuponsDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    db.collection('kuponDeal', function(err, collection) {
     if (err) {
        throw err;
    } else {
        collection.findOne({_id:new ObjectID(id)}, function(err, item) {
            res.send(item);
        });
	}
    });
};

exports.findByType = function(req, res) {
    var type = req.params.type;
    console.log('Retrieving kupons by  type : ' + type);
    db.collection('kuponDeal', function(err, collection) {
     if (err) {
        throw err;
    } else {
			collection.find({type: { $regex: type } }).toArray(function(err, items) {
				res.send(items);
			});
        }
    });
};

exports.findAll = function(req, res) {
    db.collection('kuponDeal', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addKuponDeal = function(req, res) {
    var kuponDeal = req.body;
    console.log('Adding kuponDeal: ' + JSON.stringify(kuponDeal));
    db.collection('kuponDeal', function(err, collection) {
        collection.insert(kuponDeal, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateKuponDeal = function(req, res) {
    var id = req.params.id;
    var kuponDeal = req.body;
    console.log('Updating kuponDeal: ' + id);
    console.log(JSON.stringify(kuponDeal));
    db.collection('kuponDeal', function(err, collection) {
        collection.update({_id:new ObjectID(id)}, kuponDeal, function(err, result) {
            if (err) {
                console.log('Error updating kuponDeal: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(kuponDeal);
            }
        });
    });
}

exports.deleteKuponDeal = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('kuponDeal', function(err, collection) {
        collection.remove({_id:new ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

exports.removeAllKuponDeal = function(req, res) {
    
    console.log('Deleting wine: All ' );
    db.collection('kuponDeal', function(err, collection) {
        collection.remove({}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateAllKuponsDB = function() {

    var kuponDeal = [
         			{
        				"_id"			:	null,
        				"type":"popularDeal",
        				"dealShortEntry" : "Kingscliff: From $349 for a 3-Night Romantic Stay with Bottle of Wine, Chocolates and Return Flights at Santai Retreat",
        				"dealColorClass"	:	"bg-orange",
        				"dealContent"	:"Cana Resort Casino Sirenis Punta Test 00001",
        				"dealSubContent"	: "Kingscliff: From $349 for a 3-Night Romantic Stay with Bottle of Wine...",
        				"dealPrice"	: "$401",
        				"dealValue"	:	"$1,422",
        				"dealDiscount"	:	"59%",
        				"dealSaving"	:	"$976",
        				"dealTimerDd"	:	"8",
        				"dealTimerTm"	:	"20",
        				"dealTimerMin"	:	"58",
        				"dealPerson"	:	"2",
        				"dealBought"	:	"169",
        				"dealShar"	:	"150",
        				"dealTweet"	:	"62",
        				"dealReating":	4,
        				"dealImage"	:	"http://placehold.it/900x600"
        				
        			},
        			{
        				"_id"			:	null,
        				"type":"popularDeal",
        				"dealShortEntry" : "Kingscliff: From $349 for a 3-Night Romantic Stay with Bottle of Wine... ",
        				"dealColorClass"	:	"bg-blue",
        				"dealContent"	:"Sirenis Punta Cana Resort Casino 00002",
        				"dealSubContent"	: "Kingscliff: From $349 for a 3-Night Romantic Stay with Bottle of Wine...",
        				"dealPrice"	: "$999",
        				"dealValue"	:	"$2,475",
        				"dealDiscount"	:	"59%",
        				"dealSaving"	:	"$1,476",
        				"dealTimerDd"	:	"8",
        				"dealTimerTm"	:	"20",
        				"dealTimerMin"	:	"58",
        				"dealPerson"	:	"2",
        				"dealBought"	:	"169",
        				"dealShar"	:	"150",
        				"dealTweet"	:	"62",
        				"dealReating":	2,
        				"dealImage"	:	"http://placehold.it/900x600"
        				
        			},
        			{
        				"_id"			:	null,
        				"type":"popularDeal",
        				"dealShortEntry" : "Kingscliff: From $349 for a 3-Night Romantic Stay with Bottle of Wine, Chocolates and Return Flights at Santai Retreat",
        				"dealColorClass"	:	"bg-green",
        				"dealContent"	:"Sirenis Punta Cana Resort Casino 00003",
        				"dealSubContent"	: "Kingscliff: From $349 for a 3-Night Romantic Stay with Bottle of Wine...",
        				"dealPrice"	: "$471",
        				"dealValue"	:	"$1,422",
        				"dealDiscount"	:	"59%",
        				"dealSaving"	:	"$976",
        				"dealTimerDd"	:	"8",
        				"dealTimerTm"	:	"20",
        				"dealTimerMin"	:	"58",
        				"dealPerson"	:	"2",
        				"dealBought"	:	"169",
        				"dealShar"	:	"150",
        				"dealTweet"	:	"62",
        				"dealReating":	1,
        				"dealImage"	:	"http://placehold.it/900x600"
        				
        			}

        			
        			];

    db.collection('kuponDeal', function(err, collection) {
        collection.insert(kuponDeal, {safe:true}, function(err, result) {});
    });

};