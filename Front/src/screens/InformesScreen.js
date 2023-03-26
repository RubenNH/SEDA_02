import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import TablaDatos from './components/datos/TablaDatos'
export default function InformesScreen() {
  return (
    <View>
         <Image
        style={{ width: '100%', height: 100, marginBottom: 15, }}
        source={require("./../../assets/imgs/img_backround_login.png")}
      />
      <TablaDatos/>
    </View>
  )
}

const styles = StyleSheet.create({})