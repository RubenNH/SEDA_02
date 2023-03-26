import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import List from './components/List';
import colores from './components/colores';
import Banner from './components/componentsHome/Banner';
export default function HomeScreen() {
  const generateData = () => {
    const data = [];
  
    for (let i = 1; i <= 10; i++) {
      data.push({
        id: i,
        name: `Item ${i}`,
        image: `https://picsum.photos/id/${i}/200/200`,
        title: `Title ${i}`,
      });
    }
  
    return data;
  };
  const data = generateData();

  return (
    
    <View style={styles.conatiner}>
      <Banner
        imageSource={require('./../../assets/imgs/planta.png')}
        temperature={24}
      />
       <View style={styles.containerBotones}>
       <List data={data} />
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
    conatiner:{
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      margin: '4%'
    },
    containerBotones:{
      height: '60%',
      width: '100%',
      backgroundColor: colores.AZUL,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }
})