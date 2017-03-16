'use strict';
const mqtt = require('mqtt');
const Config = require('config');
const socketIO = require('socket.io-client');
const socketIOwildcard = require('socketio-wildcard')(socketIO.Manager);
const mqttConfig = Config.get('mqtt');
const automaticConfig = Config.get('automatic');

let mqttOptions = {
  will: {
    topic: '${mqttConfig.topic}/connected',
    message: 0,
    qos: 0
  }
};

if (mqttConfig.username && mqttConfig.password) {
  mqttOptions.username = mqttConfig.username;
  mqttOptions.password = mqttConfig.password;
}

// MQTT Client
const mqttClient = mqtt.connect(`mqtt://${mqttConfig.host}`, mqttOptions);

mqttClient.on('connect', () => {
  console.log(`Connected to MQTT: ${mqttConfig.host}`);
});

mqttClient.on('message', () => {

});

// Automatic Socket Client
const automaticClientURL = `https://stream.automatic.com?token=${automaticConfig.client_id}:${automaticConfig.client_secret}`;
const automaticClient = socketIO(automaticClientURL);
socketIOwildcard(automaticClient);

automaticClient.on('connect', () => {
  console.log(`Automatic Socket Client Connected`);
});

automaticClient.on('*', (eventJSON) => {
  if (eventJSON.type == 2) {
    let eventData = eventJSON.data;
    let topic = eventData[0];
    let message = eventData[1];
    mqttClient.publish
    ( `${mqttConfig.topic}/${topic}`
    , JSON.stringify(message)
    , { qos: 0
      , retain: true
      }
    );
  }
})
