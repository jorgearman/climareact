import React, {useState, useEffect} from 'react';

import Header from './Components/Header';

import Formulario from './Components/Formulario';
import Error from './Components/Error';
import Clima from './Components/Clima';


function App() {


  //State principal
  //ciudad = state  guardarCiudad = this.setState({})
  const [ ciudad,guardarCiudad ]  = useState('');
  const [ pais, guardarPais ] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState('');


  useEffect(() => {

    //revenir ejecución primera vez

    if(ciudad==='') return;


    const consultarAPI = async() => {

      const appId = '07e98c56f2f9c60bfe910f421cd511ba'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
      
      //Consultar url
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      console.log(resultado);
      guardarResultado(resultado);
    
    }

    consultarAPI();
  },[ciudad, pais]);

  const datosConsulta = datos => {

    //validar que ambos campos esten
    if (datos.ciudad ==='' || datos.pais === ''){
        //error
        guardarError(true);
        return;
    }

    //Existe se ageregan
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  

  //Cargar un componente condicionalmente
  let componente;
  if (error) {
    //hay un error
    componente = <Error mensaje ='Ambos campos son obligatorios' />
  }else if (resultado.cod == "404") {
    componente = <Error mensaje ='Laciudad no existe en el software' />
  }else {
    //mostrar clima
    componente = <Clima 
                    resultado = {resultado}
                  />;
  }


  return (
    <div className="App">
      <Header 
        titulo = 'Clima React App'      
      />

      <div className = "contenedor-form">
        <div className = "container">
          <div className = "row">
              <div className = "col s12 m6" >
                <Formulario 
                  datosConsulta = {datosConsulta} 
                />
              </div>
              
              <div className="col s12 m6">
                {componente}
              </div>
          </div>
        </div>


      </div>


    </div>
  );
}

export default App;
