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
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    width: '90%',
    height:'10%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    margin: "5%",
  
  },
  image: {
    width: '9%',
    height: '150%',
    marginRight: 3,
  },
  temperature: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Banner;
