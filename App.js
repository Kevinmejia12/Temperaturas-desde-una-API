import React,{useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Keyboard,
  View,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () =>{
  const [busqueda,setBusqueda] = useState({
    ciudad: "",
    pais:""
  })

  const {ciudad,pais} =busqueda;
  const [resultado, setResultado] = useState({}) //resultado final de la api
  const[consultar,setConsulta] = useState(false) //para que llame a la api
  const[bgColor, setBGColor] = useState("rgb(71, 149,212)")

  useEffect(()=>{
    const ConsultarApi = async () => {
      if(consultar){
        const appId= "e9d6287cd30b102fd41fd7ae367f3ed9"
        const url =`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
        try{
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          setResultado(resultado)
          setConsulta(false)
          setBusqueda({
            busqueda:"",
            pais:""
          })
          //de aqui hacia abajo puro bgColor
          const kevin = 273.15;
          const {main} = resultado;
          const actual = main.temp - kevin;

          if(actual <10){
            setBGColor("#B8AFEB")
          }else if(actual >=10 && actual <25){
            setBGColor("rgb(71, 149,212)")
          }else{
            setBGColor("#FF3737")
          }
        }catch(error){
          mostrarAlerta();
        }
      }
    }
    ConsultarApi()
  },[consultar])

  const mostrarAlerta = () =>{
    Alert.alert(
      "Error",
      "No se encontro ciudad o pais "
    )
  }
  const ocultarTeclado = () => {
    Keyboard.dismiss();
  }

  const bgColorApp = {
    backgroundColor: bgColor
  }

  return(
    <TouchableWithoutFeedback onPress={()=> ocultarTeclado()}>
      <SafeAreaView style={[styles.container, bgColorApp]}>
      <View>
        <View style={styles.contenido}>
          <Clima resultado={resultado}/>
          <Formulario busqueda={busqueda} setConsulta={setConsulta} setBusqueda={setBusqueda}/>
        </View>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center"
  },
  contenido:{

  }
});

export default App;
