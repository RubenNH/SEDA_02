import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import colores from './../colores';
import FetchData from '../../../../utils/FetchData';
import Paho from 'paho-mqtt';

export default function TablaDatos() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const sendMessage = () => {
    // Create a client instance
    const client = new Paho.Client('54.174.70.136', Number(8080), "23rR");

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({ onSuccess: onConnect });

    // called when the client connects
    function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      client.subscribe("datos/arduino1");
      const message = new Paho.Message("Hello");
      message.destinationName = "datos/arduino1";
      client.send(message);
    }

    // called when the client loses its connection
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    }

    // called when a message arrives
    function onMessageArrived(message) {
      console.log("onMessageArrived:" + message.payloadString);
    }

  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await FetchData.get('/reg-elect/');
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const tableHead = ['ID', 'Electrodomestico', 'Estado', 'Hora', 'Piso'];

  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const tableData = data.slice(start, end).map((item) => [item.idRegistroE, item.electrodomesticos.nombreElectrodomestico, item.status ? "Encendido" : "Apagado", new Date(item.horaDeUso).toLocaleTimeString(), item.electrodomesticos.maqueta.nombrePiso]);

  const totalPages = data.length <= itemsPerPage ? 1 : Math.floor(data.length / itemsPerPage) + (data.length % itemsPerPage > 0 ? 1 : 0);

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(
      <TouchableOpacity key={i} style={page === i ? styles.activePageButton : styles.pageButton} onPress={() => setPage(i)}>
        <Text style={page === i ? styles.activePageButtonText : styles.pageButtonText}>{i + 1}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Table>
        <Row data={["Registros de uso de electrodomesticos"]} style={styles.title} textStyle={styles.titleText} />
        <Row data={tableHead} flexArr={[1, 1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
        <TableWrapper style={styles.wrapper}>
          <Rows data={tableData} flexArr={[1, 1, 1, 1, 1]} style={styles.row} textStyle={styles.text} />
        </TableWrapper>
        <Row data={pages} style={styles.pagination} />
      </Table>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2', // Fondo gris claro
    padding: 16,
    paddingTop: 10,
  },
  title: {
    height: 40,
    backgroundColor: colores.AZUL, // Azul
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#F2F2F2', // Gris claro
  },
  wrapper: {
    flexDirection: 'row',
  },
  row: {
    height: 40,
    backgroundColor: '#FFFFFF', // Blanco
  },
  text: {
    textAlign: 'center',
  },
  pagination: {
    height: 50,
    backgroundColor: '#F2F2F2', // Gris claro
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageButton: {
    backgroundColor: '#FFFFFF', // Blanco
    borderWidth: 1,
    borderColor: colores.VERDE, // Azul
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  pageButtonText: {
    color: colores.AZUL, // Azul
    fontWeight: 'bold',
  },
  activePageButton: {
    backgroundColor: colores.VERDE, // Azul
    borderWidth: 1,
    borderColor: colores.VERDE, // Azul
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activePageButtonText: {
    color: '#FFFFFF', // Blanco
    fontWeight: 'bold',
  },

});
