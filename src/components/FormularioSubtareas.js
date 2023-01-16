import React from "react";
import icono_anadir_enabled from '../imgs/icono_anadir_enabled.svg'
import icono_anadir_disabled from '../imgs/icono_anadir_disabled.svg'
export function FormularioSubtareas(props){
    const [textSubtarea, setTextSubtarea] = React.useState('');
    const [mostrandoForm, setMostrandoForm] = React.useState(false);
    const handleChange = evt => {
        setTextSubtarea(evt.target.value)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(textSubtarea==="") return;
        props.callback(textSubtarea)
        setTextSubtarea('')
        setMostrandoForm(false);
    }

    const formSubTarea=(
            <form className="input-and-button">
                <input
                    onChange={handleChange}
                    value={textSubtarea}
                    type='text'
                    placeholder={`Introduce subtareas`}
                ></input>
                <input
                    onClick={handleSubmit}
                    className='animate-color-change'
                    type='image' 
                    src={textSubtarea==="" ? icono_anadir_disabled : icono_anadir_enabled} 
                    disabled={textSubtarea==="" ? true : false}
                    alt='icono nueva tarea' 
                    style={{width:'2em'}}>
                </input>
            </form>
    )
    return(
        <>
            
            {mostrandoForm 
            ?
                formSubTarea
            :
                <div
                    style={{border: 'none',
                        marginRight: 'auto',
                        padding: '0.2em',
                        color: '#777',
                        textDecoration:'underline'}}
                    onClick={()=>{setMostrandoForm(!mostrandoForm)}}
                    className="btn-anadir-subtareas"
                >Añadir subtarea</div>
            }
        </>
    )
}