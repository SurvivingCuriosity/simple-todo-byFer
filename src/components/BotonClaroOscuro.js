import React from "react";
import icono_luna from '../imgs/icono_luna.svg'
import icono_sol from '../imgs/icono_sol.svg'
import { TEMAS, useThemeContext } from "../context/ThemeContext";

export function BotonClaroOscuro(props) {
    const { tema, activarTema } = useThemeContext();
    return (
        <div className={`boton-claro-oscuro`}>

            <span onClick={() => { activarTema(TEMAS.dark) }} style={{border: tema === TEMAS.dark ? '2px solid #DDD' : ''}}>
                <img className='icono_luna' src={icono_luna}></img>
                <p>Oscuro</p>
            </span>

            <span onClick={() => { activarTema(TEMAS.light) }} style={{border: tema === TEMAS.light ? '2px solid #222' : ''}}>
                <img className='icono_sol' src={icono_sol}></img>
                <p>Claro</p>
            </span>

        </div>
    )
}