import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Banner = ({ imageSource, temperature }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.temperature}>{temperature}&#8451;</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  temperature: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Banner;
