import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';

const Formulario = ({ onGuardar }) => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [piso, setPiso] = useState('');
  const [encendido, setEncendido] = useState(true);

  const guardar = () => {
    // Verificar si algún campo está vacío
  if (id.trim() === '' || nombre.trim() === '' || piso.trim() === '') {
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID</Text>
      <TextInput
        style={styles.input}
        onChangeText={setId}
        value={id}
      />
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
