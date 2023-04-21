import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import RegisterForm from './components/account/RegisterForm'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view';

export default function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
        <View style={styles.viewForm}>
            <RegisterForm/>
        </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    viewForm:{
        marginVertical: 0,
        marginHorizontal: 0,
        // backgroundColor: '#fff',
        // borderRadius: 10,
        // padding: 10,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        // marginTop: 0,
        // marginBottom: 0,
        // marginLeft: 0,
        // marginRight: 0,

    }
})