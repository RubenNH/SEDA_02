import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Switch ,Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Formulario from './Formulario';
import Banner from '../componentsHome/Banner';
import colores from '../colores';
import FetchData from '../../../../utils/FetchData';
import Paho from 'paho-mqtt';
import Paho1 from '../datos/Phao1';
const sendMessage = (item) => {
  // Create a client instance
  const client = new Paho.Client('100.24.5.91', Number(8080), "23rR");

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect({ onSuccess: onConnect });

  // called when the client connects
  function onConnect() {
    console.log("onConnect");
    client.subscribe("datos/arduino1");
    const message = new Paho.Message(JSON.stringify({id: item.idElectro, status: item.status}));
    message.destinationName = "datos/arduino1";
    client.send(message);
  }
  // function onConnect() {
  //   // Once a connection has been made, make a subscription and send a message.
  //   console.log("onConnect");
  //   client.subscribe("datos/arduino1");
  //   const message = new Paho.Message("Hello"); // solo seria ver como modificar aqui lo que se envia
  //   message.destinationName = "datos/arduino1";
  //   client.send(message);
  // }
    
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

const Home1 = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const Traerelectronicos = async () => {
    try {
      const response = await FetchData.get('/elect/');
      setItems(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const cancelSave=()=>{
   setShowForm(false)
  }

  const GuardarUsoElectro = async (newItem) => {
    try {
      const response = await FetchData.post('/reg-elect/', {
        status: newItem.status,
        horaDeUso: new Date(),
        electrodomesticos: {
          idElectro: newItem.idElectro
        }
      });

      console.log('Regitsro guardado correctamente:', response.data);
      setShowForm(false);
    } catch (error) {
      setShowForm(false);
      console.error('Error al guardar:', error);
    }
  };
  //Funcion donde se usara la api de arduino para enviar el valor true/false
  const cambiarEstadoElectronicos = async (id, status) => {
    try {
      const response = await FetchData.put(`/elect/${id}`, {
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
      console.log(newItem.piso)
      const response = await FetchData.post('/elect/', {
        nombreElectrodomestico: newItem.nombre,
        status: newItem.encendido,
        maqueta: {
          id: newItem.piso
        }
      });
      console.log('Se Guardo Correctamente:', response.data);
      setShowForm(false);
      Traerelectronicos();
    } catch (error) {
      
      console.error('Error al guardar:', error);
    }
    setShowForm(false);

  };

  // const toggleItemState = (id) => {
  //   const newItems = items.map((item) => {
  //     if (item.idElectro === id) {
  //       item.status = !item.status;
  //       GuardarUsoElectro(item);
  //       //cambiarEstadoElectronicos(item.idElectro, item.status)
  //       console.log(`Item with ID ${id} is now ${item.status ? 'Encendido' : 'Apagado'}`);
  //     }
  //     return item;
  //   });
  //   Traerelectronicos();
  // };
  
  const toggleItemState = async (id, status) => {
    const newItems = items.map((item) => {
      if (item.idElectro === id) {
        item.status = status;
        GuardarUsoElectro(item);
        sendMessage(item); // aquí se llama la función sendMessage con los valores actualizados
        console.log(`Item with ID ${id} is now ${item.status ? 'Encendido' : 'Apagado'}`);
      }
      return item;
    });
    setItems(newItems);
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Ionicons
        name={item.status ? 'md-bulb' : 'md-bulb-outline'}
        size={32}
        color={item.status ? '#FDB813' : '#CCCCCC'}
        onPress={() => {
          // console.log("Se preciono el boton");
          toggleItemState(item.idElectro);
      
        }}
      />
      <View style={styles.info}>
        {/* <Text style={styles.label}>ID: </Text>
        <Text style={styles.value}>{item.idElectro}</Text> */}
        <Text style={styles.label}> Nombre: </Text>
        <Text style={styles.value}>{item.nombreElectrodomestico}</Text>
        <Text style={styles.label}> Piso: </Text>
        <Text style={styles.value}> {item.maqueta.nombrePiso} </Text>
      </View>
      <Switch
        value={item.status}
        onValueChange={() => {
          console.log("Se preciono el boton");
          toggleItemState(item.idElectro, !item.status);
        }}
      />
    </View>
  );

  const sortedItems = items.sort((a, b) => a.piso - b.piso);

  return (
    <View style={styles.container}>
      <Banner imageSource={require('./../../../../assets/imgs/foco.png')} /> 
      <FlatList
        data={sortedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.idElectro.toString()}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Electrodomesticos</Text>
            
            <Ionicons name="md-add-circle" size={35} color="#1b3258" onPress={() => setShowForm(true)} />
          </View>
        }
      />
      <Modal
  visible={showForm}
  animationType="slide"
  onRequestClose={() => setShowForm(false)}
>
  <Formulario onGuardar={addItem} onCancel={cancelSave}/>
</Modal>
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
