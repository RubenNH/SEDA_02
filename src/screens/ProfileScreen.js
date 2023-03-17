import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { getAuth , signOut } from "firebase/auth"
import { useNavigation } from '@react-navigation/native'
import colores from './components/colores'

export default function ProfileScreen() {

  const navigation = useNavigation();
  const logout =  async() => {
    const auth = getAuth();
    await signOut(auth);
    console.log("CERRO SESION");
    navigation.navigate("index")
  }
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Cerrar Sesión" onPress={logout} buttonStyle={styles.btn} titleStyle={styles.textBtn}/>

    </View>
  )
}

const styles = StyleSheet.create({
  btn:{
    marginTop:30,
    paddingVertical:10,
    backgroundColor:colores.VERDE,
    borderTopWidth:1,
    borderTopColor:"#e3e3e3",
    borderBottomColor:"#e3e3e3",
    borderBottomWidth:1
  },
  textBtn:{
    color:"#fff"

  }
  
})