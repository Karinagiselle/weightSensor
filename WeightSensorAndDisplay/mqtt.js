var mqtt=require('mqtt');
// var mongodb=require('mongodb');
// var mongodbClient=mongodb.MongoClient;
var mongodbURI='mongodb+srv://admin:admin@weightsensor.fxtta.mongodb.net/WeightSensor?retryWrites=true&w=majority';
var deviceRoot="demo/device/";
var collection,client;
let _db;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

var mqttClient  = mqtt.connect('mqtt://test.mosquitto.org')

MongoClient.connect('mongodb+srv://admin:admin@weightsensor.fxtta.mongodb.net/WeightSensor?retryWrites=true&w=majority')
.then(client => {
	console.log('Connected');
	_db = client.db();
	fetchAll();
	// setupCollection(_db);
})
.catch(err => {
	console.log('Error');
	throw err;
});

mqttClient.on('connect', function () {
	mqttClient.subscribe('presence', function (err) {
	  if (!err) {
		mqttClient.publish('presence', 'Hello mqtt')
	  }
	})
  })

  mqttClient.on('message', function (topic, message) {
	// message is Buffer
	console.log(message.toString())
	mqttClient.end()
  })

const getDB = () => {
    if(_db) {
        return _db;
    }
    throw 'No db'
}

function fetchAll() {
	const db = getDB();
	return db.collection('sample_airbnb')
	.find()
	 .toArray()
	.then(articles => {
		console.log(articles);
		return articles;
	})
	.catch(err => {
		console.log(err);
	});
 }

// mongodbClient.connect(mongodbURI,setupCollection);

// function setupCollection(db) {
// 	console.log("DB: " + db._db);

// 	collection=db.collection("TestDB");
// 	client=mqtt.createClient(1883,'localhost');
// 	client.subscribe(deviceRoot+"+");
// 	client.on('message', insertEvent);
// 	mqttClient.on('connect', function () {
// 		mqttClient.subscribe('presence', function (err) {
// 			console.log('passa 2');

// 		  if (!err) {
// 			mqttClient.publish('presence', "hello kari")
// 			console.log('passa 3');

// 		  }
// 		})
// 	  })
// }


// function insertEvent(topic,message) {
// 	var key=topic.replace(deviceRoot,'');

// 	collection.update(
// 		{ _id:key }, 
// 		{ $push: { events: { event: {  _id:1, value:"50" } } } }, 
// 	 	{ upsert:true },
// 	 	function(err,docs) {
// 			if(err) {
// 				console.log("Insert fail");	// Improve error handling		
// 			}
// 		}
// 	);
// }