import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, Pressable, Modal, Picker  } from 'react-native';
import colores from '../colores';

export default function Formulario({ onGuardar, onCancel }) {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [piso, setPiso] = useState('');
  const [encendido, setEncendido] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const [form, setShowForm] = useState(false);
  const cancelar = () => {
    console.log("Accion cancelar");
    onCancel();
  };
  const guardar = () => {
    // Verificar si algún campo está vacío
    if (nombre.trim() === '' || piso.trim() === '') {
      alert('Por favor, completa todos los campos');
      return;
    }
    onGuardar({
      id,
      nombre,
      piso,
      encendido
    });
    setId('');
    setNombre('');
    setPiso('');
    setEncendido(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Formulario guardado exitosamente!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.modalView2}>
      {/* <Text style={styles.label}>ID</Text>
      <TextInput
        style={styles.input}
        onChangeText={setId}
        value={id}
      /> */}
      <Text style={styles.label}>Nombre Electrodomestico</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNombre}
        value={nombre}
      />
      <Text style={styles.label}>Nombre Piso</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPiso}
        value={piso}
      />
      <Text style={styles.label}>Encendido/Apagado</Text>
      <Switch
        value={encendido}
        onValueChange={setEncendido}
      />
      <View style={styles.botonesForm}>
      <Pressable style={[styles.button, styles.buttonClose]} onPress={cancelar}>
          <Text style={styles.textStyle}>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.buttonOpen]} onPress={guardar}>
          <Text style={styles.textStyle}>Guardar</Text>
        </Pressable>
        {/* <Button
        title="Guardar"
        onPress={guardar}
      /> */}
       
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: colores.VERDE,
  },
  buttonClose: {
    backgroundColor: '#FF5757',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 300
  },
  botonesForm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,

  },
  modalView2: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});