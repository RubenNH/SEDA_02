import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native'
import { Component } from 'react'
import axios from 'axios';


export default function RecuperarScreen() {
  

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.100.5:8080/api-seda/piso/');
      console.log(response.data.data); // log the data array
    setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.id}</Text>
      <Text>{item.nombrePiso}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RecuperarScreen</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  Text: {
    fontSize: 32,
    color: 'red',
  },

})
