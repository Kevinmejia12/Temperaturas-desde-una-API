import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Alert,TouchableWithoutFeedback, Animated} from 'react-native';
import { Picker } from '@react-native-picker/picker';
const Formulario = ({busqueda,setBusqueda,setConsulta}) => {
    const {pais,ciudad } = busqueda;
    const [animacionBtn] = useState(new Animated.Value(1));

    const animacionEntrada = ()=> {
        Animated.spring(animacionBtn, {
            toValue: .95
        }).start();
    }
    const animacionSalida = ()=>{
        Animated.spring(animacionBtn, {
            toValue: 1,
            friction:1,
            tension:1
        }).start();
    }
    const Validar = () => {
        if([pais,ciudad].includes("")){
            Alert.alert(
                "Error",
                "Ambos cambios son necesarios",
            )
            return
        }
        setConsulta(true)
    }

    const AnimarEstilo = {
        transform:[{scale: animacionBtn}]
    }

  return (
    <View>

        <View style={styles.containerInput}>
            <TextInput 
            style={styles.input}
            placeholder="Buscar ciudad"
            value={ciudad}
            onChangeText={ciudad=> setBusqueda({...busqueda, ciudad})}
            />
        </View>

        <View>
            <Picker
            selectedValue={pais}
            style={styles.picker}
            onValueChange={pais =>setBusqueda({...busqueda, pais})}
            >
                <Picker.Item label='-Seleccione el pais-' value=""/>
                <Picker.Item label='Estados Unidos' value="US"/>
                <Picker.Item label='Mexico' value="MX"/>
                <Picker.Item label='Argentina' value="AR"/>
                <Picker.Item label='Colombia' value="CO"/>                
                <Picker.Item label='Costarica' value="CR"/>
                <Picker.Item label='España' value="ES"/>                
                <Picker.Item label='Peru' value="PE"/>
            </Picker>
        </View>

        <TouchableWithoutFeedback 
        onPressIn={()=> animacionEntrada()}
        onPressOut={()=> {animacionSalida() ,Validar()}}
        >
            <Animated.View style={[styles.btnBuscar, AnimarEstilo]}>
                <Text style={styles.txtBuscar}>
                    Buscar clima 
                </Text>
            </Animated.View>
        </TouchableWithoutFeedback>

    </View>
  );
}

const styles = StyleSheet.create({
    input:{
        fontSize:17,
        color:"#000"
    },
    containerInput:{
        backgroundColor:"#FFF",
        marginTop:20,
        borderRadius:10,
        paddingHorizontal:10,
        marginHorizontal:50,
        marginBottom:20,
    },
    btnBuscar:{
        backgroundColor:"#FFF",
        alignItems:"center",
        marginHorizontal:80,
        borderRadius:10,
        paddingVertical:8,
        marginTop:40
    },
    txtBuscar:{
        color:"#000",
        fontWeight:"bold",
        fontSize:17,
        textTransform:"uppercase"
    },
    picker:{
        marginHorizontal:40
    }
})

export default Formulario;