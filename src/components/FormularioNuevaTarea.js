import React from "react";
import {FormularioSubtareas} from './FormularioSubtareas'
import { PreviewSubtareas } from "./PreviewSubtareas";
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
            let clientHeight = document.getElementById('animate-heigth').clientHeight;
            console.log(clientHeight); 
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
        <div id='animate-heigth' className={`caja animate-height ${tituloTarea==="" ? 'height-1' : 'height-2'}`} style={{width:'95vw'}}>
                <form style={{display:'flex', flexFlow:'column',gap:'1em'}} onSubmit={handleSubmit}>
                    
                    <div className="input-and-button">
                        <label>Tarea: </label>
                        <input
                            autoFocus
                            onChange={handleChange}
                            value={tituloTarea}
                            type='text'
                            placeholder='??Qu?? tienes que hacer?'
                        ></input>
                    </div>
                    
                
                    

                    {tituloTarea!=='' && 
                        <div className="delay-fade-in" style={{opacity:'0',display:'flex', flexFlow:'column',gap:'1em'}}>
                            <div style={{alignItems: 'flex-start'}} className="input-and-button">
                                <label style={{marginTop: '0.45em'}}>Categor??a: </label>
                                <Select 
                                    isOptionSelected={true}
                                    defaultValue={props.categoriaActiva === '' 
                                        ? {label: 'Sin categor??a', value: props.categoriaActiva}
                                        : {label: props.categoriaActiva, value: props.categoriaActiva}}
                                    isClearable
                                    isSearchable={false}
                                    onChange={handleChangeCategoria}
                                    onInputChange={handleInputCategoria}
                                    options={options} 
                                    styles={customStyles}
                                    placeholder={'Sin categor??a'}
                                    noOptionsMessage={() => <p>{textoCategoria==="" ? 'No hay categor??as' : `No existe '${textoCategoria.trim()}'`}</p>}
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
                                    tareaMadre={tituloTarea}
                                    tareas={subTareas}
                                />
                            }
                            <div className="input-and-button">
                                <input type='submit' disabled={tituloTarea==="" ? true : false} className="boton btn-success" value='A??adir tarea'></input>
                                <button className="boton btn-cancel" onClick={limpiaCampos}>Cancelar</button>
                            </div>
                        </div>
                    }
                
                </form>
        </div>
    )
}