var mqtt=require('mqtt');
const controller = require('./controllers/controller');
const mongoConnect = require('./util/database').mongoConnect;
var topic="esp/welcome";

mongoConnect( () => {
	var mqttClient  = mqtt.connect('mqtt://127.0.0.1')

	mqttClient.on('connect', function () {
		mqttClient.subscribe(topic)
	})

	mqttClient.on('message', function (topic, message) {
		// message from the topic
		console.log(message.toString())
		controller.insert(message.toString())
	})
});