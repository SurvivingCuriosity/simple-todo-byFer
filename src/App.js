import React from 'react';
import useLocalStorage from 'use-local-storage';
import './styles/reset.css';
import './styles/style.css';
import { FormularioNuevaTarea } from './components/FormularioNuevaTarea';
import { Tarea } from './components/Tarea';
import { NavCategorias } from './components/NavCategorias';
import { BotonClaroOscuro } from './components/BotonClaroOscuro';
import { obtenFecha } from './helpers/fechas';

function App() {
	const [tareasLS, setTareasLS] = useLocalStorage("tareas", []);
	const [tareas, setTareas] = React.useState(tareasLS);
	
	const [categoriasLS, setCategoriasLS] = useLocalStorage("categorias", []);
	const [categorias, setCategorias] = React.useState(categoriasLS);

//Son las tareas de la categoria activa	(inicialmente son todas)
	const [tareasCategoria, setTareasCategoria] = React.useState(tareas);

	const [categoriaActiva, setCategoriaActiva] = React.useState('Todas');

	const [tema, setTema] = useLocalStorage("tema", 'dark');

//Establece el tema por defecto
	React.useEffect(()=>{document.documentElement.setAttribute('data-theme', tema);},[])

//Cuando cambian las categorias, las anado al localstorage
	React.useEffect(()=>{setCategoriasLS(categorias);},[categorias])


	React.useEffect(()=>{
		setTareasLS(tareas);
	},[tareas])

//Cuando se añade una tarea o cambia categoriaActiva, hay que actualizar tareasCategorias para que se renderice en pantalla
	React.useEffect(()=>{
		if(categoriaActiva==='Todas'){
			setTareasCategoria(()=>{return(tareas)});
		}else{
			setTareasCategoria(tareas.filter(tarea => tarea.categoria==categoriaActiva));
		}
	},[categoriaActiva,tareas])

//FUNCIONES DE CATEGORIAS
	const userCreatesCategoria = (titulo) => {
		setCategorias(prev=>{
		return[
		...prev,
		titulo
		]
		})
		setCategoriaActiva(titulo)
	}

	const userBorraCategoria = (titulo) => {
		let filteredArray = categorias.filter(cat => cat !== titulo)
		setCategorias(filteredArray);
		setCategoriaActiva('Todas')
	}

	const cambiarCategoriaActiva = (titulo) => {
		setCategoriaActiva(titulo);
	}
//FUNCIONES DE TAREAS
	const userCreatesTarea = (tituloTarea, subtareas, categoria) => {
		setTareas(prev=>{
			return[
				...prev,
				{
					id:Date.now(),
					fecha: obtenFecha(Date.now()),
					titulo:tituloTarea,
					checked:false,
					subtareas: subtareas || '',
					categoria: categoria
				}
			]
		})
	}

	const borrarTareas = () => {
		setTareas([]);
		setCategoriaActiva('Todas');
	}
	const borrarTareasCategoria = () => {
		setTareas([]);
		setCategoriaActiva('Todas');
	}
	
	const eliminarTarea = (idTarea) => {
		setTareas(current =>
			current.filter(element => {
				return element.id !== idTarea;
			}),
		);
	}

	const checkTarea = (isChecked, idTarea) =>{
		const newState = tareas.map(tarea => {
			if (tarea.id === idTarea) {
				return {...tarea, checked: isChecked};
			}
			return tarea;
		});
		setTareas(newState);
	}

//FUNCIONES DE SUBTAREAS
	const checkSubTarea = (isChecked, idTarea, idTareaPadre) =>{
		let substate;
		tareas.map(tarea => {
			if (tarea.id === idTareaPadre) {
				substate=tarea.subtareas.map(subtarea=>{
					if(subtarea.id===idTarea){
						return {...subtarea, checked: isChecked}
					}
					return subtarea;
				})
			}
			return tarea;
		});

		let newState = tareas.map(tarea => {
			if (tarea.id === idTareaPadre) {
				return {...tarea, subtareas: substate}
			}
			return tarea;
		});
		setTareas(newState);
	}

	const nuevaSubtarea = (titulo, idPadre) => {
		let substate;
		tareas.map(tarea => {
			if (tarea.id === idPadre) {
				substate=tarea.subtareas;
			}
		});
		substate.push({
			id:Date.now(),
			text:titulo,
			checked:false
		});

		let newState = tareas.map(tarea => {
			if (tarea.id === idPadre) {
				return {...tarea, subtareas: substate}
			}
			return tarea;
		});
		setTareas(newState);

	}

	const eliminarSubTarea = (idSubtarea, idPadre) => {
		let newSubState;
		let newState=tareas.map(tarea=>{
		if(tarea.id===idPadre){
		newSubState=tarea.subtareas.filter((subtarea)=>{
		return subtarea.id !== idSubtarea;
		})
		}else{
		return tarea;
		}
		})
		newState=tareas.map(tarea=>{
		if(tarea.id===idPadre){
		return{...tarea, subtareas:newSubState}
		}else{
		return tarea;
		}
		})
		setTareas(newState)
	}

	const activarTema = (cual) => {
		switch(cual){
		case 'claro':
			document.documentElement.setAttribute('data-theme', 'light');
			setTema('light');
			break;
		case 'oscuro':
			document.documentElement.setAttribute('data-theme', 'dark');
			setTema('dark');
			break;
		default:
		}
	}

	return (
	<div className="horizontal-centered full-screen-height pad-2">
		<BotonClaroOscuro 
			temaActivo = {tema}
			callback={activarTema}/>
		<h1>Tareas</h1>
		<p style={{padding:'0.75em'}}>Un texto motivador...</p>
		<FormularioNuevaTarea
			categoriaActiva={categoriaActiva}
			categorias={categorias}
			callback={userCreatesTarea}
		/>
		<NavCategorias 
			categorias={categorias}
			categoriaActiva={categoriaActiva}
			callbackCrearCategoria={userCreatesCategoria}
			callbackBorrarCategoria={userBorraCategoria}
			callbackCategoriaActiva={cambiarCategoriaActiva}
		/>
	<ul className='lista-tareas'>
		{
			(tareasCategoria.length<=0) 
			?	<p style={{backgroundColor:'var(--fondo3)',textAlign:'center'}}>No hay tareas pendientes...</p>
			: 	tareasCategoria.map(tarea=>{
					return(
						<Tarea 
							key={tarea.id}
							id={tarea.id}
							tarea={tarea}
							callbackCheck={checkTarea}
							callbackSubtareaCheck={checkSubTarea}
							callbackBorrarTarea={eliminarTarea}
							callbackEliminarSubTarea={eliminarSubTarea}
							callbackNuevaSubtarea={nuevaSubtarea}
							/>
					)
				})
		}
	</ul>

	{/*tareas.length>0 && <button onClick={borrarTareas} className='btn btn-borrar-tareas'>Borrar todas</button> */}
	</div>
	);

}

export default App;
