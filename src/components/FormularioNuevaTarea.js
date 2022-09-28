import React from "react";
import {FormularioSubtareas} from './FormularioSubtareas'
import { PreviewSubtareas } from "./PreviewSubtareas";
import icono_anadir_enabled from '../imgs/icono_anadir_enabled.svg'
import icono_anadir_disabled from '../imgs/icono_anadir_disabled.svg'
import Select from 'react-select';
export function FormularioNuevaTarea(props){

    const [tituloTarea, setTituloTarea] = React.useState('');
    const [categoria, setCategoria] = React.useState(props.categoriaActiva);
    const [textoCategoria, setTextoCategoria] = React.useState('');
    const [subTareas, setSubTareas] = React.useState([]);
    const [clase, setClase] = React.useState('height-1');

    const handleChange = evt => {
        setTituloTarea(evt.target.value)
    }
    React.useEffect(()=>{
        if(tituloTarea!==''){
            setClase('height-2')
        }
    },[tituloTarea])

    React.useEffect(()=>{
        if(props.categoriaActiva===''){
            setCategoria('')
        }else{
            setCategoria(props.categoriaActiva);
        }
    },[props.categoriaActiva])

    const handleChangeCategoria = (evt, action) => {
        switch(action.action){
            case 'clear':
                break;
            case 'select-option':
                setCategoria(evt.value);
                break;
        }
    }
    const handleInputCategoria = text => {
        setTextoCategoria(text)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(tituloTarea==="") return;
        props.callback(tituloTarea, subTareas, categoria)
        setTituloTarea('')
        setSubTareas([])
    }
    const nuevaSubTarea = (subtarea) => {
        setSubTareas(prev=>{
            return[
                ...prev,
                {
                    id:Date.now(),
                text:subtarea,
                checked:false
            }
        ]
    })
}
    const limpiaCampos = () => {
        setTituloTarea('');
        setSubTareas([])
    }
    const options = props.categorias.map((cat)=>{
        return(
            {value:cat,label:cat}
            )
        })
        const customStyles = {
            container: (provided, state) => ({
                ...provided,
                margin:'1em 0em',
                width: '100%'
            }),
        option: (provided) => ({
            ...provided,
            borderBottom: '1px solid var(--colorTextoColor)',
            color: 'var(--colorTextoColor)',
            backgroundColor: 'var(--fondo)',
            overflowY: 'hidden',
        }),
        control: (provided) => ({
            ...provided,
            color: 'var(--colorTextoColor)',
            backgroundColor: 'var(--blanco2)',
            border:'1px solid var(--negro2)',
            minHeight: '2em',
            height: '2em',
        }),
        menu: (provided) => ({
            ...provided,
            fontSize:'0.7em',
            position:'initial',
            color: 'var(--blanco2)',
            backgroundColor: 'var(--fondo)',
        }),
        singleValue:(provided) => ({
            ...provided,
            color: 'var(--negro2)',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: '2em',
        }),
        input: (provided, state) => ({
            ...provided,
            margin: '0px',
            height: '2em'
        }),
        indicatorSeparator: state => ({
            display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '2em',
        })
        
    }
    
    return(
        <div className={`caja animate-height ${tituloTarea==="" ? 'height-1' : 'height-2'}`} style={{width:'95vw'}}>
                <form>
                    <div className="input-and-button">
                        <label>Tarea: </label>
                        <input
                            onChange={handleChange}
                            value={tituloTarea}
                            type='text'
                            placeholder='¿Qué tienes que hacer?'
                        ></input>
                    </div>
                    
                
                    

                    {tituloTarea!=='' && 
                        <div className="delay-fade-in" style={{opacity:0}}>
                            <div className="input-and-button">
                                <label>Categoría: </label>
                                <Select 
                                    isOptionSelected={true}
                                    defaultValue={{label: props.categoriaActiva, value: props.categoriaActiva}}
                                    isClearable
                                    isSearchable={false}
                                    onChange={handleChangeCategoria}
                                    onInputChange={handleInputCategoria}
                                    options={options} 
                                    styles={customStyles}
                                    placeholder={'Sin categoría'}
                                    noOptionsMessage={() => <p>{textoCategoria==="" ? 'No hay categorías' : `No existe '${textoCategoria.trim()}'`}</p>}
                                />
                            </div>
                            
                            <div className="input-and-button">
                                <label>Subtarea: </label>
                                <FormularioSubtareas 
                                    tareaMadre={tituloTarea}
                                    callback={nuevaSubTarea}
                                />
                            </div>
                            {
                            subTareas.length>0 && 
                                <PreviewSubtareas 
                                    tareas={subTareas}
                                />
                            }
                            <div className="input-and-button">
                                <button disabled={tituloTarea==="" ? true : false} className="boton btn-success" onClick={handleSubmit}>Añadir tarea</button>
                                <button className="boton btn-cancel" onClick={limpiaCampos}>Cancelar</button>
                            </div>
                        </div>
                    }
                
                </form>
        </div>
    )
}