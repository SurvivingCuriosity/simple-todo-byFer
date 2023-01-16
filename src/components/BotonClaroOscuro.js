import React from "react";
import icono_luna from '../imgs/icono_luna.svg'
import icono_sol from '../imgs/icono_sol.svg'

export function BotonClaroOscuro(props){
    const {callback, temaActivo} = props;
    const [clase, setClase] = React.useState('');
    const colorFondo = temaActivo === 'light' 
        ? '#444'
        : '#DDD'

    React.useEffect(()=>{
        switch(temaActivo){
            case 'light':
                setClase('gira180');
                break;
            case 'dark':
                setClase('gira-180');
                break;
        }
    },[])
    
    const activarModoOscuro = (evt) => {
        setClase('gira-180');
        callback('oscuro');
    }
    const activarModoClaro = (evt) => {
        setClase('gira180');
        callback('claro');
    }


    return(
        <div className={`boton-claro-oscuro ${clase}`} style={{backgroundColor: '#777'}}>
            <img onClick={activarModoOscuro} src={icono_luna}></img>
            <img onClick={activarModoClaro} src={icono_sol}></img>
        </div>
    )
}