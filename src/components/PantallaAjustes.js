import React from 'react'
import icono_anadir_disabled from '../imgs/icono_anadir_disabled.svg'
import icono_anadir_enabled from '../imgs/icono_anadir_enabled.svg'
import icono_borrar_rojo from '../imgs/icono_borrar_rojo.svg'
import { BotonClaroOscuro } from './BotonClaroOscuro'

export function PantallaAjustes(props) {
    const { tema, activarTema, callbackNuevaCategoria, handleCloseCallback, handleBorrarCategoria } = props;
    const [tituloCategoria, setTituloCategoria] = React.useState('');
    const [mostrandoFormNuevaCategoria, setMostrandoFormNuevaCategoria] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener('mousedown', handleClickScreen)
        function handleClickScreen(evt) {
            if (evt.target.nodeName === 'DIV' || !evt.target.className === 'input-crear-cat') {
                handleCloseCallback();
            }
        }
        return () => window.removeEventListener("mousedown", handleClickScreen);
    }, [])

    const handleChange = (evt) => {
        setTituloCategoria(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        callbackNuevaCategoria(tituloCategoria);
        setTituloCategoria('');
        setMostrandoFormNuevaCategoria(false);
    }
    const borrarCategoria = (evt) => {
        handleBorrarCategoria(evt.target.name);
    }
    return (
        <div className='pantalla-ajustes fade-in'>
            <div className='container-pantalla-ajustes'>

                <h2>CATEGORÍAS</h2>
                <ul>
                    {props.categorias.length > 0
                        ?
                        props.categorias.map((cat) => {
                            if (cat === 'Todas') {
                                return
                            } else {
                                return (
                                    <li key={cat + Date.now()} className='input-and-button'>
                                        <p>{cat}</p>
                                        <img src={icono_borrar_rojo} onClick={borrarCategoria} name={cat}></img>
                                    </li>
                                )
                            }
                        })
                        :
                        <p style={{ fontSize: '0.7em' }}>No has creado ninguna categoría</p>
                    }
                </ul>

                {mostrandoFormNuevaCategoria === true
                    ?
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="input-and-button">
                                <input
                                    className='input-text-crear-cat'
                                    onChange={handleChange}
                                    value={tituloCategoria}
                                    type='text'
                                    placeholder='Titulo de la categoría'
                                ></input>
                                <input
                                    onClick={handleSubmit}
                                    className='input-submit-crear-cat'
                                    type='image'
                                    src={tituloCategoria === "" ? icono_anadir_disabled : icono_anadir_enabled}
                                    disabled={tituloCategoria === "" ? true : false}
                                    alt='icono nueva categoría'
                                    style={{ width: '2em' }}>
                                </input>
                            </div>
                        </form>
                    </>
                    :
                    <button className='boton-nueva-categoria' onClick={() => { setMostrandoFormNuevaCategoria(true) }}>Crear nueva categoría</button>
                }
                <h2>TEMA</h2>
                <BotonClaroOscuro
                    temaActivo={tema}
                    callback={activarTema}
                />
                <p className='texto-click-volver'>Click en cualquier sitio para volver</p>
            </div>
        </div>
    )
}