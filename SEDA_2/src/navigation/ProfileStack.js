import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='profile2' component={ProfileScreen} options={{title: 'Perfil'}}/>
      <Stack.Screen name='registerS' component={RegisterScreen} options={{title:'Registrarse',headerShown: false}}/>
    </Stack.Navigator>
  )
}