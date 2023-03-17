import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements'

export default function Loading(props) {
    const {isVisible, text} = props;
    
  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.overlayStyl}>
        <View style={styles.viewText}>
            <ActivityIndicator size="large" color="#00a680" />
            {text && <Text style={styles.Text}>Cargando...</Text>
}
        </View>
    </Overlay>
  )
}

Loading.defaultProps = {isVisible:false}

const styles = StyleSheet.create({
    overlayStyl:{
        height:100,
        width:200,
        backgroundColor:"#fff",
        borderColor:"#00a680",
        borderWidth:2,
        borderRadius:10
    },
    viewText:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    Text:{
        color:"#00a680",
        textTransform:"uppercase",
        marginTop:10
    }
})