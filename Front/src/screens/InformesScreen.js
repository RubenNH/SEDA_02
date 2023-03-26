import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import TablaDatos from './components/datos/TablaDatos'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function InformesScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image
        style={{ width: '100%', height: 100, marginBottom: 15, }}
        source={require("./../../assets/imgs/img_backround_login.png")}/>
      <TablaDatos/>
    </KeyboardAwareScrollView>
    
  )
}

const styles = StyleSheet.create({})