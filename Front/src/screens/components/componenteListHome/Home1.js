import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Formulario from './Formulario';
import Banner from '../componentsHome/Banner';
import colores from '../colores';
import axios from 'axios';


const Home1 = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);


  const Traerelectronicos = async () => {
    try {
      const response = await axios.get('http://192.168.100.5:8080/api-seda/elect/');
      setItems(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const GuardarUsoElectro = async (newItem) => {
    try {
      const response = await axios.post('http://192.168.100.5:8080/api-seda/reg-elect/', {
        status: newItem.status,
        horaDeUso: new Date(),
        electrodomesticos: {
          idElectro: newItem.idElectro
        }
      });
      
      console.log('reg saved successfully:', response.data);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving reg:', error);
    }
  };

  const cambiarEstadoElectronicos = async (id, status) => {
    try {
      const response = await axios.put(`http://192.168.100.5:8080/api-seda/elect/${id}`, {
        status: status
      });
      console.log('Item status updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating item status:', error);
    }
  }
  useEffect(() => {
    Traerelectronicos();
  }, []);

  const addItem = async (newItem) => {

    try {
      const response = await axios.post('http://192.168.100.5:8080/api-seda/elect/', {
        nombreElectrodomestico: newItem.nombre,
        status: newItem.encendido,
        maqueta: {
          id: newItem.piso
        }
      });
      console.log('Item saved successfully:', response.data);
      setShowForm(false);
      Traerelectronicos();
    } catch (error) {
      console.error('Error saving item:', error);
    }
    setShowForm(false);

  };

  const toggleItemState = (id) => {
    const newItems = items.map((item) => {
      if (item.idElectro === id) {
        item.status = !item.status;
        GuardarUsoElectro(item);
        //cambiarEstadoElectronicos(item.idElectro, item.status)
        console.log(`Item with ID ${id} is now ${item.status ? 'on' : 'off'}`);
      }
      return item;
    });
    Traerelectronicos();
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Ionicons
        name={item.status ? 'md-bulb' : 'md-bulb-outline'}
        size={32}
        color={item.status ? '#FDB813' : '#CCCCCC'}
        onPress={() => {
          console.log("Button pressed");
          toggleItemState(item.idElectro);
        }}
      />
      <View style={styles.info}>
        <Text style={styles.label}>ID: </Text>
        <Text style={styles.value}>{item.idElectro}</Text>
        <Text style={styles.label}> Name: </Text>
        <Text style={styles.value}>{item.nombreElectrodomestico}</Text>
        <Text style={styles.label}> Floor: </Text>
        <Text style={styles.value}> {item.maqueta.nombrePiso} </Text>
      </View>
      <Switch value={item.status} onValueChange={() => toggleItemState(item.idElectro)} />
    </View>
  );

  const sortedItems = items.sort((a, b) => a.piso - b.piso);

  return (
    <View style={styles.container}>
      <Banner imageSource={require('./../../../../assets/imgs/planta.png')} temperature={24} />
      <FlatList
        data={sortedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.idElectro.toString()}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Electrodomesticos</Text>
            <Ionicons name="md-add-circle" size={35} color="#007AFF" onPress={() => setShowForm(true)} />
          </View>
        }
      />
      {showForm && <Formulario onGuardar={addItem} />}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
