# weightSensor
This project is measuring weight and sending the data to a time series data base.

# Requirements
 Database - I'm using MongoDB Atlas

 MQTTLens installed and configured

 Working Arduino

 MQTTLens installed and configured


# MQTTLens configuration
1. Install MQTTLens as an extension for Chrome.
2. Create a new connection

     a.Hostname = 127.0.0.1
     
     b.Port = 1883
3. Create a subscriber

     a.Topic name = esp/welcome


# Project configuration
In util/database.js is set the MongoDB URI.

In app.js is set the topic name.

# How to test it
Once you have the MQTT broker up and the topic created, you need to run in one terminal the subscriber with the command: node app.js
Which will read from the topic and send the data to the DB.

