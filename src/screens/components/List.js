import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import colores from './colores';
import ListItem from './ListItem';

const List = () => {
  const [data, setData] = useState([{ title: 'Electrodomestico 1', image: require('../../../assets/imgs/foco.png'), isActive: false }]);

  const renderItem = ({ item, index }) => <ListItem item={item} index={index} onSaveTitle={newTitle => handleSaveTitle(newTitle, index)} />;

  const handleAddItem = () => {
    const newTitle = `Electrodomestico  ${data.length + 1}`;
    const newItem = { title: newTitle, image: require('../../../assets/imgs/foco.png'), isActive: false };
    setData([...data, newItem]);
  };

  const handleSaveTitle = (newTitle, index) => {
    const newData = [...data];
    newData[index] = { ...newData[index], title: newTitle };
    setData(newData);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 2, color: colores.VERDE }}>Electrodomesticos </Text>
        <Text style={{ color: '#fff', fontWeight: 'bold' }} onPress={handleAddItem}>Agregar</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `item-${index}`}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default List;
