import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import TablaDatos from './components/datos/TablaDatos'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from "@react-navigation/native";
import TablaRegistrosSensores from './components/datos/TablaRegistrosSensores';
import Dts from './components/datos/Dts';
export default function InformesScreen() {
  const navigation = useNavigation();
  
  return (
    <KeyboardAwareScrollView>
      <Image
        style={{ width: '100%', height: 100, marginBottom: 15, }}
        source={require("./../../assets/imgs/img_backround_login.png")}/>
      <TablaDatos/>
      {/* <TablaRegistrosSensores/> */}
      {/* <Dts/> */}
    </KeyboardAwareScrollView>
    
  )
}

const styles = StyleSheet.create({
})