import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {Icon} from 'react-native-elements';
import colores from '../screens/components/colores';
import IndexStack from './IndexStack';
import ProfileStack from './ProfileStack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import InformesScreen from '../screens/InformesScreen';

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
            name='Home'
            component={HomeScreen}
            options={{title: "Home"}
            }
            />
            <Tab.Screen
            name='Detalles'
            component={InformesScreen}
            options={{title: "Informes de estado"}}
            />
             <Tab.Screen name='profile' component={ProfileStack} options={{title: "Perfil"}} />
        </Tab.Navigator>
        
    ):(
        <>
            <Tab.Navigator 
            screenOptions={({route})=>({headerShown:false, tabBarActiveTintColor:colores.VERDE, tabBarInactiveTintColor:colores.AZUL, tabBarIcon:({color,size})=> iconos(route, color, size)})}>
                
                <Tab.Screen
                name='Administracion'
                component={IndexStack}
                options={{title: "Administracion"}}
                />
                <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{title: "Home"}
                
                }
                />
            </Tab.Navigator>
        </>
        
    );
}

function iconos(router, color, size) {
    let name;
    if (router.name==='Home') {
        name='home'
    }
    if (router.name==='Administracion') {
        name='info-outline'
    }
    if (router.name==='login') {
        name='details'
    }
    if (router.name==='Detalles') {
        name='info-outline'
    }
    if (router.name==='profile') {
        name='account-circle'
    }
    return(
        <Icon type='material-comunity' name={name} color={color} size={size}/>
    );
}


