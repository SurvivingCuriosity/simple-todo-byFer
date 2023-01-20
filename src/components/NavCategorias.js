import React from "react";

export function NavCategorias(props) {

    const userClicksCategoria = (evt) => {
        if (evt.target.className === 'nav-categorias') {
            return;
        }
        props.callbackCategoriaActiva(evt.target.textContent);

    }

    return (
        <div className="nav-categorias-y-boton">
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