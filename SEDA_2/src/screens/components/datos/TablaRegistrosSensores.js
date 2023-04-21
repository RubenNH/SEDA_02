import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import axios from 'axios';
import colores from './../colores';
import FetchData from '../../../../utils/FetchData';
import Phao1 from './Phao1';
export default function TablaRegistrosSensores() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);




  // async function fetchData() {
  //   try {
  //     const response = await apiClient.get('/reg-elect/');
  //     const data = response.data;
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const fetchData = async () => {
    try {
      const response = await FetchData.get('/reg-sensor/');
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const tableHead = ['ID', 'HoraUso', 'Valor', 'SensorID'];
  
  const tableData = data.slice(start, end).map((item) => [item.idRSensor,  new Date(item.horaDeUso).toLocaleTimeString(),item.valorSensor, item.sensores.idSensor]);

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
        <Row data={["Registros de uso de Sensores"]} style={styles.title} textStyle={styles.titleText} />
        <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
        <TableWrapper style={styles.wrapper}>
          <Rows data={tableData} flexArr={[1, 1, 1, 1]} style={styles.row} textStyle={styles.text} />
        </TableWrapper>
        <Row data={pages} style={styles.pagination} />

      </Table>
      <Phao1/>
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
