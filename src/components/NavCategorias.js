import React from "react";
import icono_anadir_enabled from '../imgs/icono_anadir_enabled.svg'
import { FormNuevaCategoria } from "./FormNuevaCategoria";
import { categoriasDefault } from "../data/categoriasDefault";

export function NavCategorias (props) {

    const [mostrandoFormNuevaCategoria, setMostrandoFormNuevaCategoria] = React.useState(false)

    const userClicksCategoria = (evt) => {
        if(evt.target.className==='nav-categorias'){
            return
        }
        props.callbackCategoriaActiva(evt.target.textContent);
    }
    const muestraFormNuevaCategoria = (evt) => {
        setMostrandoFormNuevaCategoria(true);
    }
    const crearCategoria = (titulo) => {
        console.log('Creando categoria '+titulo);
        props.callbackCrearCategoria(titulo);
    }
    const userBorraCategoria = (titulo) => {
        console.log('Borrando categoria '+titulo);
        props.callbackBorrarCategoria(titulo);
    }
    const userClosesForm = (evt) => {
        setMostrandoFormNuevaCategoria(false);
    }

    return(
        <div className="nav-categorias-y-boton">
            {mostrandoFormNuevaCategoria && 
                <FormNuevaCategoria 
                    categorias={props.categorias}
                    handleSubmitCallback={crearCategoria}
                    handleCloseCallback={userClosesForm}
                    handleBorrarCategoria={userBorraCategoria}
                />}
            <img src={icono_anadir_enabled} onClick={muestraFormNuevaCategoria}></img>
            <div className='nav-categorias'>
                <div className={`tab-header-categoria animate-color-change ${(props.categoriaActiva===categoriasDefault[0])? `categoria-activa` : ``}`} onClick={userClicksCategoria}>{categoriasDefault[0]}</div>
                {props.categorias.map((cat)=>{
                    return(
                        <div key={cat+Date.now()} className={`tab-header-categoria ${(props.categoriaActiva===cat)? `categoria-activa` : ``}`} onClick={userClicksCategoria}>{cat}</div>
                    )
                })}
            </div>
        </div>
    )
}