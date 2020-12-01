var mqtt = require('mqtt'); // https://github.com/mqttjs/MQTT.js

var topic = "esp/welcome";

// default message
var message   = '0';

if (process.argv.length > 2) {
  // use command line argument as message
  message = process.argv[2]
}
var client  = mqtt.connect('mqtt://127.0.0.1')

client.on('connect', function () {
  client.subscribe(topic)
  // client.publish('presence', 'Hello mqtt')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  // client.end()
})