import React, { useState } from 'react';
import { View, Text, Image, Switch, TouchableOpacity } from 'react-native';
import EditTitleDialog from './../EditTitleDialog';
import colores from './colores';

const ListItem = ({ item, index, onSaveTitle }) => {
  const [isEnabled, setIsEnabled] = useState(item.isActive);
  const [isEditTitleDialogVisible, setIsEditTitleDialogVisible] = useState(false);

  const toggleSwitch = () => {
    const newIsEnabled = !isEnabled;
    setIsEnabled(newIsEnabled);
    const newItem = { ...item, isActive: newIsEnabled };
    // Aquí podrías guardar el nuevo estado de activación en algún lugar, como un estado en el componente padre.
    console.log(`Elemento ${index + 1} activado: ${newIsEnabled}`);
  };

  const showEditTitleDialog = () => {
    setIsEditTitleDialogVisible(true);
  };

  const handleSaveTitle = newTitle => {
    onSaveTitle(newTitle);
    setIsEditTitleDialogVisible(false);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
      <Image source={item.image} style={{ width: 48, height: 48, marginRight: 8 }} />
      <TouchableOpacity onPress={showEditTitleDialog}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: colores.VERDE, letterSpacing: 2 }}>{item.title}</Text>
      </TouchableOpacity>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <EditTitleDialog
        visible={isEditTitleDialogVisible}
        initialValue={item.title}
        onCancel={() => setIsEditTitleDialogVisible(false)}
        onSave={handleSaveTitle}
      />
    </View>
  );
};

export default ListItem;
