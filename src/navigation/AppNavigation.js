import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/LoginScreen'
import {Icon} from 'react-native-elements';
import colores from '../screens/components/colores';
import IndexStack from './IndexStack';
import ProfileStack from './ProfileStack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Tab = createBottomTabNavigator();
export default function AppNavigation(){
    const [session, setSession] = useState(null);
    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            setSession(user ? true: false)
        })
    })
    return session ?(
        <Tab.Navigator 
        screenOptions={({route})=>({headerShown:false, tabBarActiveTintColor:colores.VERDE, tabBarInactiveTintColor:colores.AZUL, tabBarIcon:({color,size})=> iconos(route, color, size)})}>
            <Tab.Screen
            name='Detalles'
            component={DetailsScreen}
            options={{title: "Detalles"}}
            />
             <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{title: "Home"}
            
            }
            />
            <Tab.Screen
            name='Inicio'
            component={IndexStack}
            options={{title: "Detalles"}}
            />
             <Tab.Screen name='profile' component={ProfileStack} options={{title: "Perfil"}} />
        </Tab.Navigator>
        
    ):(
        <IndexStack/>
    );
}

function iconos(router, color, size) {
    let name;
    if (router.name==='Home') {
        name='home'
    }
    if (router.name==='Detalles') {
        name='info-outline'
    }
    if (router.name==='login') {
        name='details'
    }
    return(
        <Icon type='material-comunity' name={name} color={color} size={size}/>
    );
}


