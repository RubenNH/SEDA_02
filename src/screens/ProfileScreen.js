import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { getAuth , signOut } from "firebase/auth"
import { useNavigation } from '@react-navigation/native'
import colores from './components/colores'
import ProfileUser from './components/account/ProfileUser'

export default function ProfileScreen() {

  const [visibleLoad, setVisibleLoad] = useState(false);
  const [textLoad, setTextLoad] = useState("");
  const navigation = useNavigation();
  const logout =  async() => {
    const auth = getAuth();
    await signOut(auth);
    console.log("CERRO SESION");
    navigation.navigate("index")
  }
  return (
    <View>
      <ProfileUser setVisibleLoad={setVisibleLoad} setTextLoad = {setTextLoad}/>
      <Button title="Cerrar " onPress={logout} buttonStyle={styles.btn} titleStyle={styles.textBtn}/>

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