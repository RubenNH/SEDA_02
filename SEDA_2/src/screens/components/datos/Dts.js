// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import { connect, subscribe, disconnect } from './../../../../utils/fechDataApi';
// const MQTT_TOPIC = 'datos/arduino1';

// const Dts = () => {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     connect();

//     return () => {
//       disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     subscribe((message) => {
//       setMessage(message);
//     });

//     return () => {
//       mqttClient.end();
//     };
//   }, []);

//   return (
//     <View>
//       <Text>{message}</Text>
//     </View>
//   );
// };

// export default Dts;