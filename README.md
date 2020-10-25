# weightSensor
This project is measuring weight and sending the data to a time series data base.

# Test locally MQTT subscriber and publisher
## Description
*BROKER URI: * mqtt://test.mosquitto.org
*TOPIC: * demo/device/

The MQTT publisher sends the message passed in the paremeter to the topic and then exits while MQTT subscriber keeps reading from the topic and log the message received.

## How to test it
In one terminal run the subscriber with the command: node mqttSubscriber.js
In a different terminal run the publisher and pass as a parameter the message with the command: node mqttPublisher.js <message>
