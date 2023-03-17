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
        
        
    }
})