import React, { useState, useEffect }from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row,Rows, Col } from 'react-native-table-component';
import axios from 'axios';

export default function TablaDatos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.100.5:8080/api-seda/reg-elect/');
      console.log(response.data.data); // log the data array
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const tableHead = ['ID', 'Electrodomestico', 'Estado', 'Fecha/Hora', 'Piso'];
  const tableData = data.map((item) => [item.idRegistroE, item.electrodomesticos.nombreElectrodomestico, item.status ? "turn up" : "turn off",, item.horaDeUso, item.electrodomesticos.maqueta.nombrePiso]);

  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1}}>
      <Row data={["Registros de uso de electrodomesticos"]} flexArr={[1]} style={styles.row} textStyle={styles.text}/>
        <Row data={tableHead} flexArr={[1, 2, 1, 2, 1]} style={styles.row} textStyle={styles.text}/>
        <TableWrapper style={styles.wrapper}>
          <Rows data={tableData} flexArr={[1, 2, 1, 4, 2]} style={styles.row} textStyle={styles.text}/>
        </TableWrapper>
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 40, },
  text: { textAlign: 'center' }
});
