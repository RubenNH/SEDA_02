import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import Paho from 'paho-mqtt';
const Banner = ({ imageSource, temperature }) => {
  const [mensajeRecibido, setMensajeRecibido] = useState('');

  const client = new Paho.Client(
      '100.24.5.91',
      Number(8080),
      '23rR'
  )
  useEffect(()=>{
      client.connect({
          onSuccess:()=>{
              console.log("CONEXION EXITOSA");
              client.subscribe('datos/fotosensor')
              client.onMessageArrived = onMessage;
          },
          onFailure: ()=>{
              console.log("CONEXION FALLIDA");
          }
      })
  },[])
  function onMessage(mensaje){
      if(mensaje.destinationName==='datos/fotosensor') {
        const mensajeString = mensaje.payloadString;
        setMensajeRecibido(mensajeString);
        console.log("Mensaje Recibido " + mensajeString);
      }
    }
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.tst}>{mensajeRecibido} Tem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    width: '90%',
    height:'10%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    margin: "5%",
  
  },
  image: {
    width: '9%',
    height: '150%',
    marginRight: 3,
  },
  temperature: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Banner;
