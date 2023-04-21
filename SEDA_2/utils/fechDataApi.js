import { Client, Message } from 'react-native-paho-mqtt';

//Set up an in-memory alternative to global localStorage
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};

// Create a client instance
const client = new Client({ uri: 'ws://iot.eclipse.org:80/ws', clientId: 'clientId', storage: myStorage });

// set event handlers
client.on('connectionLost', (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log(responseObject.errorMessage);
  }
});
client.on('messageReceived', (message) => {
  console.log(message.payloadString);
});

// connect the client
client.connect()
  .then(() => {
    // Once a connection has been made, make a subscription and send a message.
    console.log('onConnect');
    return client.subscribe('World');
  })
  .then(() => {
    const message = new Message('Hello');
    message.destinationName = 'World';
    client.send(message);
  })
  .catch((responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  })
;
