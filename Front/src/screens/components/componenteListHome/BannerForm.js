import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const BannerForm = ({ onSubmit }) => {
  const [sensorName, setSensorName] = useState('');
  const [arduinoAddress, setArduinoAddress] = useState('');

  const handleSubmit = () => {
    // Crea un objeto con los datos del sensor
    const sensorData = {
      name: sensorName,
      arduinoAddress: arduinoAddress,
    };

    // Envía los datos al servidor
    onSubmit(sensorData);

    // Limpia los campos del formulario después de enviar los datos
    setSensorName('');
    setArduinoAddress('');
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre del sensor"
        value={sensorName}
        onChangeText={setSensorName}
      />
      <TextInput
        placeholder="Dirección IP de Arduino"
        value={arduinoAddress}
        onChangeText={setArduinoAddress}
      />
      <Button title="Registrar sensor" onPress={handleSubmit} />
    </View>
  );
};

export default BannerForm;
