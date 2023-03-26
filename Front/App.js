import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AppNavigation from './src/navigation/AppNavigation';
import { LogBox } from "react-native";
import { initFirebase } from "./utils/Firebase";
LogBox.ignoreAllLogs();
export default function App() {
  return (
   <>
    <NavigationContainer>
      <AppNavigation/>
   </NavigationContainer>
   <Toast/>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
