import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { getAuth, signOut } from "firebase/auth"
import { useNavigation } from '@react-navigation/native'
import colores from './components/colores'
import ProfileUser from './components/account/ProfileUser'
import Loading from './components/componentsHome/Loading'
import ChangePassword from './components/account/ChangePassword'
import ChangePasswordForm from './components/account/ChangePasswordForm'
import ChangePasswordButton from './components/account/ChangePasswordButton'
export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleLoad, setVisibleLoad] = useState(false);
  const [textLoad, setTextLoad] = useState("");
  const navigation = useNavigation();
  const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
  console.log("CERRO SESION CORRECTAMENTE");
  navigation.navigate("Home")
  }
  

  return (
    <View style={styles.container}>
      <ProfileUser setVisibleLoad={setVisibleLoad} setTextLoad={setTextLoad} />
      <View style={styles.btn_}>
        <Button title="Cerrar " onPress={logout} buttonStyle={styles.btn} titleStyle={styles.textBtn} />
      </View>
      <View>
      {/* <Button title="Cambiar contraseña" onPress={() => setModalVisible(true)} />
      <ChangePassword visible={modalVisible} onClose={() => setModalVisible(false)} /> */}
      <View>
      {/* <ChangePasswordButton /> */}
    </View>
    </View>
      <Loading visible={visibleLoad} text={textLoad} />

    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 30,
    paddingVertical: 10,
    backgroundColor: colores.VERDE,
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1

  },
  textBtn: {
    color: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btn_: {
    padding: 10
    
  },
})