import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import Paho from 'paho-mqtt';

export default function Phao() {
    const [mensajeRecibido, setMensajeRecibido] = useState('');

    const client = new Paho.Client(
        '3.81.172.127',
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
                console.log("CONEXION FALLIDA :C");
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
        <View>
          <Text style={styles.tst}>{mensajeRecibido} luz</Text>
        </View>
      )
}

const styles = StyleSheet.create({

    tst: {  
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },

})