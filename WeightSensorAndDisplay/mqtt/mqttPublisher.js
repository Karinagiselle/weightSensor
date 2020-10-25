var mqtt = require('mqtt'); // https://github.com/mqttjs/MQTT.js

var brokerURI = 'mqtt://test.mosquitto.org';
var topic = "demo/device/";

// default message
var message   = '0';

if (process.argv.length > 2) {
  // use command line argument as message
  message = process.argv[2]
}

var client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
    client.subscribe('presence', function (err) {
      if (!err) {
        client.publish('presence', message)
        client.end();
      }
    })
  })