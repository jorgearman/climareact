import React from 'react';


function Clima({resultado}) {

    //extraer valores

    const {name,main} = resultado

    console.log('En el clima');

    if (!name) return null

    //restar grado kelvin
    const kelvin = 233.15

    
    console.log(resultado);

    return (
        <div className="card-panel white col s12">
            <h2>El clima de {name} es: </h2>
            <p className="temperatura">
                {parseInt(main.temp - kelvin,10)}<span> &#x2103; </span>
            </p>
            <p>Maxima Temperatura: {parseInt(main.temp_max - kelvin,10)} &#x2103; </p>

            <p>Minima Temperatura: {parseInt(main.temp_min - kelvin,10)} &#x2103; </p>

        </div>

    )
}




export default Clima;