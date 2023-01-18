import React from "react";
import icono_luna from '../imgs/icono_luna.svg'
import icono_sol from '../imgs/icono_sol.svg'

export function BotonClaroOscuro(props) {
    const { callback, temaActivo } = props;
    return (
        <div className={`boton-claro-oscuro`}>

            <span onClick={() => { callback('oscuro') }} style={{border: temaActivo==='dark' ? '2px solid #DDD' : ''}}>
                <img className='icono_luna' src={icono_luna}></img>
                <p>Oscuro</p>
            </span>

            <span onClick={() => { callback('claro') }} style={{border: temaActivo==='light' ? '2px solid #222' : ''}}>
                <img className='icono_sol' src={icono_sol}></img>
                <p>Claro</p>
            </span>

        </div>
    )
}