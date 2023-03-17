import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native'
import React from 'react'
import colores from './components/colores'
import  Toast  from "react-native-toast-message"
import { useNavigation } from '@react-navigation/native';
export default function LoginScreen() {
  const navigation = useNavigation();
   const recuperarContraseña=()=>{
    Toast.show({
      type:"error",
      position:"bottom",
      text1:"Aun no funciona Crack, Dale calma"
  })
   }

  const registrarse=()=>{
    navigation.navigate("registerS");
  }

  const iniciarS=()=>{
    Toast.show({
      type:"error",
      position:"bottom",
      text1:"Aun no inicia sesion"
  })
  }
   
  return (
    <View style = {styles.div}>
      <View>
        <Text>Imagen</Text>
      </View>
      <View>
        <TextInput
            placeholder='Email'
            placeholderTextColor='#000'
            style={styles.form}
          />
          {/* <TextInput
            placeholder='Full Name'
            placeholderTextColor='#000'
            style={styles.form}
          /> */}
          <TextInput
            placeholder='Password'
            placeholderTextColor='#000'
            style={styles.form}
          />
          <Pressable style={{alignItems: 'flex-end'}} onPress={recuperarContraseña}>
            <Text style={styles.olvidatePass}>¿Olvidaste tu contraseña?</Text>
          </Pressable>
           <Pressable style={styles.formButton} onPress={iniciarS}>
            <Text style={styles.buttonText}>Iniciar Sesion</Text>
          </Pressable>
          <View style={styles.ask}>
          <Text>¿Aun no tienes cuenta? </Text>
          <Pressable style={{fontWeight: 'bold'}} onPress={registrarse}>
            <Text style={styles.olvidatePass}>Registrarse</Text>
          </Pressable>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    div:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' 
        // backgroundColor: colores.AZUL,
        // height: '10%',
        // width: '100%',
        // margin: 7
    },
    form:{
       height: '15%',
       width: 300,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        paddingLeft:10, 
    },
    formButton:{
       backgroundColor: colores.VERDE,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    olvidatePass:{
      color: colores.VERDE
    },
     buttonText:{
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        letterSpacing: 0.5

    },
    ask:{
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'flex-end'
    
    }
})