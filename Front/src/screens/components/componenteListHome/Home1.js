import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Formulario from './Formulario';
import Banner from '../componentsHome/Banner';
import colores from '../colores';
const Home1 = () => {
  const [items, setItems] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const agregarItem = (item) => {
    const idExistente = items.find(i => i.id === item.id);
    if (idExistente) {
      console.log(`El elemento con ID ${item.id} ya existe.`);
      return;
    }
    setItems([...items, item]);
    setMostrarFormulario(false);
  };

  const cambiarEstado = (id) => {
    const nuevosItems = [...items];
    const index = nuevosItems.findIndex((item) => item.id === id);
    nuevosItems[index].encendido = !nuevosItems[index].encendido;
    setItems(nuevosItems);
    console.log(`El elemento con ID ${id} cambió a ${nuevosItems[index].encendido ? 'encendido' : 'apagado'}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Ionicons
        
        name={item.encendido ? 'md-bulb' : 'md-bulb-outline'}
        size={32}
        color={item.encendido ? '#FDB813' : '#CCCCCC'}
        onPress={() => {
          console.log("Botón presionado");
          cambiarEstado(item.id)}}
      />
      <View style={styles.info}>
        <Text style={styles.label}>ID: </Text>
        <Text style={styles.valor}>{item.id}</Text>
        <Text style={styles.label}> Nombre: </Text>
        <Text style={styles.valor}>{item.nombre}</Text>
        <Text style={styles.label}> Piso: </Text>
        <Text style={styles.valor}> {item.piso} </Text>
      </View>
      <Switch
        value={item.encendido}
        onValueChange={() => cambiarEstado(item.id)}
      />
    </View>
  );
          
  const itemsOrdenados = items.sort((a, b) => a.piso - b.piso);

  return (
    <View style={styles.container}>
      <Banner
        imageSource={require('./../../../../assets/imgs/planta.png')}
        temperature={24}
      />
      <FlatList
        data={itemsOrdenados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.titulo}>Electrodomesticos</Text>
            <Ionicons
              name="md-add-circle"
              size={35}
              color="#007AFF"
              onPress={() => setMostrarFormulario(true)}
            />
          </View>
        }
      />
      {mostrarFormulario && <Formulario onGuardar={agregarItem} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.AZUL,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  info: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    letterSpacing: 0.5,
  },
  label: {
    fontWeight: 'bold',
  },
  valor: {
    color: '#777777',
  },
});

export default Home1;
