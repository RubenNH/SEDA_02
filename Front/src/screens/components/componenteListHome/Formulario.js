import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
import axios from 'axios';


const Formulario = ({ onGuardar }) => {
  const [nombre, setNombre] = useState('');
  const [piso, setPiso] = useState('');
  const [encendido, setEncendido] = useState(true);

  const guardar = () => {
    if (!nombre || !piso) {
      alert('Por favor, completa todos los campos');
      return;
    }

    onGuardar({nombre, piso, encendido });
    setNombre('');
    setPiso('');
    setEncendido(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNombre}
        value={nombre}
      />
      <Text style={styles.label}>Piso</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPiso}
        value={piso}
      />
      <Text style={styles.label}>Estado</Text>
      <Switch
        value={encendido}
        onValueChange={setEncendido}
      />
      <Button
        title="Guardar"
        onPress={guardar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20
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
    paddingVertical: 5
  }
});

export default Formulario;
