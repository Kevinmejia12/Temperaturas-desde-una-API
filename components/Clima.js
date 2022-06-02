import React from "react";
import { StyleSheet, View,Text,Image } from "react-native"

const Clima = ({resultado})=> {
    const {name,main} = resultado;
    if(!name) return null
    const kelvin = 273.15;
    return(
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.temp}>{parseInt(main.temp - kelvin) }°C
            <Image style={{width:60,height:60}}source={{uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}/>
            </Text>
            <View style={styles.minMaxConte}>
                <Text style={styles.textos}> Min {" "}
                <Text style={styles.minMax}>{parseInt(main.temp_min - kelvin)}°C</Text>
                </Text>
                <Text style={styles.textos}> Max {" "}
                <Text style={styles.minMax}>{parseInt(main.temp_max - kelvin)}°C</Text>
                </Text>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        alignItems:"center",
        backgroundColor:"#FFF",
        marginHorizontal:30,
        marginBottom: 20,
        paddingVertical:10,
        borderRadius:10,

        shadowColor: "#000",
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        
        elevation: 24,
    },
    name:{
        fontSize:30,
        color:"#000"
    },
    temp:{
        fontSize:40,
        fontWeight:"bold"
    },
    minMaxConte:{
        flexDirection:"row",
        marginTop:20,
        width:"100%",
        justifyContent:"space-around"
    },
    minMax:{
        fontSize:18,
        color:"#000",
        fontWeight:"500"
    },
    textos:{
        fontWeight:"400"
    }
})

export default Clima;