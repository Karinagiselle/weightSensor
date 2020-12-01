const getDb = require('../util/database').getDB;
var mqtt=require('mqtt');
const controller = require('../controllers/controller');
const mongoConnect = require('../util/database').mongoConnect;
// var mongodb=require('mongodb');
// var mongodbClient=mongodb.MongoClient;
// var mongodbURI='mongodb+srv://admin:admin@weightsensor.fxtta.mongodb.net/WeightSensor?retryWrites=true&w=majority';
var topic="esp/welcome";
var collection,client;
let _db;

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

var mqttClient  = mqtt.connect('mqtt://127.0.0.1')

// MongoClient.connect('mongodb+srv://admin:admin@weightsensor.fxtta.mongodb.net/WeightSensor?retryWrites=true&w=majority')
// .then(client => {
// 	console.log('Connected');
// 	_db = client.db();
// 	fetchAll();
// 	// setupCollection(_db);
// })
// .catch(err => {
// 	console.log('Error');
// 	throw err;
// });

mqttClient.on('connect', function () {
	mqttClient.subscribe(topic)
})

mqttClient.on('message', function (topic, message) {
	// message is Buffer
	console.log(message.toString())
	mongoConnect( () => {
		controller.insert(message.toString())
	});
	// mqttClient.end()
})

