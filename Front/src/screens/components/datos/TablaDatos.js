import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import colores from '../colores';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function TablaDatos() {
    const electrodomesticos ={
      tableHead: ['ID', 'Electrodomestico', 'Estado', 'Fecha/Hora', 'Piso'],
      tableData:[
        [ 1, 'Lavadora', 'ON', '10:00 AM', '1'],
        [2, 'Foco', 'OFF', '11:00 PM', 3],
        [3, 'Cafetera', 'OFF', '1:00 PM', 2]
      ]
    }
  return (
    <>
      <View style={styles.tableH}>
      <KeyboardAwareScrollView>
      <Table borderStyle={{borderWidth: 1.2}}>
        <Row
          data={electrodomesticos.tableHead}
          flexArr={[5,5,5,5,5]}
          style={styles.head}
          textStyle={styles.TituloTable}
        />
        <TableWrapper style={styles.wrapper}>
          <Col
            data={electrodomesticos.tableTitle}
            style={styles.title}
            heightArr={[28, 28]}
            textStyle={styles.text}
          />
          <Rows
            data={electrodomesticos.tableData}
            flexArr={[2,2,2,2,2]}
            style={styles.row}
            textStyle={styles.text}
          />

        </TableWrapper>
      </Table>
      </KeyboardAwareScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      margin: '4%'
      },
      table: {
        borderWidth: 1,
        borderColor: colores.AZUL,
        borderRadius: 5,
        marginBottom: 10,
        overflow: 'hidden'
      },
      row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: colores.AZUL
      },
      cell: {
        fontSize: 10,
        padding: 10,
        justifyContent: 'center'
      },
      headerCell: {
        backgroundColor: colores.VERDE,
        fontSize: 10
      },
      title:{
        flex: 1,
        backgroundColor: 'blue'
      },
      row:{
        height: 50
      },
      text:{
        textAlign: 'center'
      },
      tableH:{
        padding: 10
      },
      head:{
        height: 40,
        backgroundColor: colores.VERDE,
      },
      TituloTable:{
        textAlign: 'center'
      }
})