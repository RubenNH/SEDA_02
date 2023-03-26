import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginForm from '../screens/components/account/LoginForm';
import RecuperarScreen from '../screens/RecuperarScreen';
import Home  from '../screens/HomeScreen';
import BannerForm from '../screens/components/componenteListHome/BannerForm';
import HomeScreen from '../screens/HomeScreen';
const Stack = createNativeStackNavigator();
export default function IndexStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='login' component={LoginForm} options={{title: 'Login', headerShown: false}}/>
      <Stack.Screen name='home' component={Home} options={{title: 'Home', headerShown: false}}/>
      <Stack.Screen name='registerS' component={RegisterScreen} options={{title:'Registrarse',headerShown: false}}/>
      <Stack.Screen name='recuperar' component={RecuperarScreen} options={{title:'Recuperar',headerShown: false}}/>
      <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SensorForm" component={BannerForm} />
    </Stack.Navigator>
  )
}