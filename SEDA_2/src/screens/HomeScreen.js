import { StyleSheet, Text, View, Image } from 'react-native';
import { Input, Icon, Button } from "react-native-elements";
import React from 'react'
import List from './components/List';
import colores from './components/colores';
import Banner from './components/componentsHome/Banner';
import Home1 from './components/componenteListHome/Home1';
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
   <>
     <Image
        style={{ width: '100%', height: 100, marginBottom: 15, }}
        source={require("./../../assets/imgs/img_backround_login.png")}
      />
     {/* <View style={styles.conatiner}>
      <Banner
        imageSource={require('./../../assets/imgs/planta.png')}
        temperature={24}
      />
       <View style={styles.containerBotones}>
       <List data={data} />
       </View>
    </View> */}
    <Home1/>
   </>
  )
}

const styles = StyleSheet.create({
    conatiner:{
      margin: '2%'
    },
    containerBotones:{
      height: '60%',
      width: '100%',
      backgroundColor: colores.AZUL,
      borderRadius: '16',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnContainer: {
      marginTop: 20,
      width: "95%",
    },
    btn: {
      backgroundColor: colores.AZUL,
    },
    
})