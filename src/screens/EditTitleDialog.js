import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Button } from 'react-native';

const EditTitleDialog = ({ visible, initialValue, onCancel, onSave }) => {
  const [title, setTitle] = useState(initialValue);

  const handleCancel = () => {
    setTitle(initialValue);
    onCancel();
  };

  const handleSave = () => {
    onSave(title);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Editar título</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: 'gray', padding: 8, borderRadius: 4, marginBottom: 16, minWidth: 250 }}
          value={title}
          onChangeText={setTitle}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
          <Button title="Cancelar" onPress={handleCancel} />
          <Button title="Guardar" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

export default EditTitleDialog;
