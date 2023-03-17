import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import LoginForm from '../screens/components/account/LoginForm';
const Stack = createNativeStackNavigator();
export default function IndexStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='login' component={LoginForm} options={{title: 'Login', headerShown: false}}/>
      <Stack.Screen name='registerS' component={RegisterScreen} options={{title:'Registrarse',headerShown: false}}/>
    </Stack.Navigator>
  )
}