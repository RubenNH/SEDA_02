import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { sendPasswordResetEmail } from '../api/auth'; // Importamos la función para enviar el correo
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import colores from './components/colores';
import FetchData from '../../utils/FetchData';
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico
  const [message, setMessage] = useState(''); // Estado para almacenar el mensaje de confirmación
  const navigation = useNavigation();
  const handleSendEmail = async () => {
    try {
      if (email === '') {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Por favor, ingresa tu correo electrónico"
        })
        setMessage(''); // Actualizamos el estado del mensaje si el input está vacío
        return;
      }
  
      const response = await FetchData.post('/reset-password/', {
        email: email,
      });
  
      if (response.status === 200) {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se ha enviado un correo electrónico a tu dirección para restablecer tu contraseña"
        })
        setMessage('');
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Ha ocurrido un error al enviar el correo electrónico"
        })
        setMessage('');
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Ha ocurrido un error al enviar el correo electrónico"
      })
      setMessage('');
    }
  };

  return (
    <View>
      <Image
        style={{ width: '100%', height: '65%', marginBottom: 15, }}
        source={require("./../../assets/imgs/seda.png")}
      />
      <View style={styles.container}>
       
      <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
      <Text style={styles.subtitle}>Ingresa tu correo electrónico para recibir un enlace para restablecer tu contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={styles.btsDis}>
        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    backgroundColor: colores.VERDE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btsDis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  }

});
