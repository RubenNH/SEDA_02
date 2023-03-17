import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message"
import { async } from "@firebase/util";
import colores from "../colores";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const navigation = useNavigation();
  const showHidePass = () => {
    setShowPass(!showPass);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email, no valido").required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria")
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth, formValue.email, formValue.password
        );
        navigation.navigate("index");
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Usuario y/o contraseña incorrecta"
        })
      }
    }
  })

  const recuperarContraseña = () => {
    Toast.show({
      type: "error",
      position: "bottom",
      text1: "Aun no funciona Crack, Dale calma"
    })
  }
  const registrarse = () => {
    navigation.navigate("registerS");
  }

  return (
    <>
      <Image
        style={{ width: '100%', height: '40%', marginBottom: 15 }}
        source={require("./../../../../assets/imgs/img_backround_login.png")}
      />
      <View style={styles.viewContent}>
        <View style={styles.textos}>
        <Text style={styles.title1}>Hola!</Text>
        <Text style={styles.title}>Bienvenido a SEDA</Text>
        </View>
        <Input
          containerStyle={styles.input}
          placeholder="Correo electronico"
          rightIcon={
            <Icon type="material-community" name="at" iconStyle={styles.icon} />
          }
          onChangeText={(text) => formik.setFieldValue("email", text)}
          errorMessage={formik.errors.email}
        />

        <Input
          containerStyle={styles.input}
          placeholder="Contraseña"
          secureTextEntry={showPass ? false : true}
          rightIcon={
            <Icon
              type="material-community"
              name={showPass ? "eye-off-outline" : "eye-outline"}
              iconStyle={styles.icon}
              onPress={showHidePass}
            />
          }
          onChangeText={(text) => formik.setFieldValue("password", text)}
          errorMessage={formik.errors.password}
        />
        <Pressable style={{ alignItems: 'flex-end' }} onPress={recuperarContraseña}>
          <Text style={styles.texts}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
        <Button
          title="Iniciar Sesion"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
        <View style={styles.ask}>
          <Text>¿Aun no tienes cuenta? </Text>
          <Pressable style={{ fontWeight: 'bold' }} onPress={registrarse}>
            <Text style={styles.texts}>Registrarse</Text>
          </Pressable>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  viewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: "100%",
    marginTop: 15,
  },
  icon: {
    color: "#c1c1c1",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: colores.AZUL,
  },
  ask: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end'

  },
  texts: {
    color: colores.VERDE,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    color: colores.AZUL,
    letterSpacing: 0.5
  },
  title1: {
    fontSize: 60,
    color: '#34434D',
    //tipo de letra
    fontWeight: 'bold',
  },
  textos:{
    
  }
});