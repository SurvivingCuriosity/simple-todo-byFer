import React from 'react'
import icono_anadir_disabled from '../imgs/icono_anadir_disabled.svg'
import icono_anadir_enabled from '../imgs/icono_anadir_enabled.svg'
import icono_borrar_rojo from '../imgs/icono_borrar_rojo.svg'
export function FormNuevaCategoria(props){
    const {handleSubmitCallback, handleCloseCallback, handleBorrarCategoria} = props;
    const [tituloCategoria, setTituloCategoria] = React.useState('');
    
    React.useEffect(()=>{
        window.addEventListener('mousedown',handleClickScreen)
        function handleClickScreen(evt){
            if(evt.target.nodeName==='DIV' || !evt.target.className==='input-crear-cat'){
                handleCloseCallback();
            }
        }
        return () => window.removeEventListener("mousedown", handleClickScreen);
    },[])

    const handleChange = (evt) => {
        setTituloCategoria(evt.target.value)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleSubmitCallback(tituloCategoria);
        setTituloCategoria('');
        handleCloseCallback();
    }
    const borrarCategoria = (evt) => {
        handleBorrarCategoria(evt.target.name);
    }
    return(
        <div className='form-nueva-categoria fade-in'>
            <h2 className='' style={{fontSize:'2.25em', marginBottom:'0.5em',marginTop:'0.25em'}}>Categorías</h2>
                <ul>
                    {props.categorias.length > 0 
                    ?
                        props.categorias.map((cat)=>{
                            if(cat==='Todas'){
                                return
                            }else{
                                return(
                                    <li key={cat+Date.now()} className='input-and-button'>
                                        <p>{cat}</p>
                                        <img src={icono_borrar_rojo} onClick={borrarCategoria} name={cat}></img>
                                    </li>
                                )
                            }
                        })
                    :
                        <p style={{fontSize:'0.7em'}}>No has creado ninguna categoría</p>
                    }
                </ul>
            
                <p style={{fontSize:'1.7em', marginBottom:'0.5em',marginTop:'1em'}}>Nueva categoría</p>
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
                            src={tituloCategoria==="" ? icono_anadir_disabled : icono_anadir_enabled} 
                            disabled={tituloCategoria==="" ? true : false}
                            alt='icono nueva categoría' 
                            style={{width:'2em'}}>
                        </input>
                    </div>
            </form>
                <p className='texto-click-volver'>Click en cualquier sitio para volver</p>
        </div>
    )
}