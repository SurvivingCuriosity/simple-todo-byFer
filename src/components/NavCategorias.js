import React from "react";
import icono_anadir_enabled from '../imgs/icono_anadir_enabled.svg'
import { PantallaAjustes } from "./PantallaAjustes";

export function NavCategorias(props) {

    const [mostrandoFormNuevaCategoria, setMostrandoFormNuevaCategoria] = React.useState(false)

    const userClicksCategoria = (evt) => {
        if (!evt.target.className === 'nav-categorias') {
            props.callbackCategoriaActiva(evt.target.textContent);
        }

    }
    const crearCategoria = (titulo) => {
        props.callbackCrearCategoria(titulo);
    }
    const userBorraCategoria = (titulo) => {
        props.callbackBorrarCategoria(titulo);
    }
    const userClosesForm = (evt) => {
        setMostrandoFormNuevaCategoria(false);
    }

    return (
        <div className="nav-categorias-y-boton">
            {mostrandoFormNuevaCategoria &&
                <PantallaAjustes
                    categorias={props.categorias}
                    handleSubmitCallback={crearCategoria}
                    handleCloseCallback={userClosesForm}
                    handleBorrarCategoria={userBorraCategoria}
                />}

            <div className='nav-categorias'>
                <div className={`tab-header-categoria ${(props.categoriaActiva === '') ? `categoria-activa` : ``}`} onClick={userClicksCategoria}>Sin categoría</div>
                {props.categorias.map((cat) => {
                    return (
                        <div key={cat + Date.now()} className={`tab-header-categoria ${(props.categoriaActiva === cat) ? `categoria-activa` : ``}`} onClick={userClicksCategoria}>{cat}</div>
                    )
                })}
            </div>
        </div>
    )
}