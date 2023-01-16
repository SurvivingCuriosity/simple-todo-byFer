import React from 'react';
import useLocalStorage from 'use-local-storage';
import './styles/reset.css';
import './styles/style.css';
import './styles/animations.css';
import { FormularioNuevaTarea } from './components/FormularioNuevaTarea';
import { Tarea } from './components/Tarea';
import { NavCategorias } from './components/NavCategorias';
import { BotonClaroOscuro } from './components/BotonClaroOscuro';
import { obtenFecha } from './helpers/fechas';
import { categoriasDefault } from './data/categoriasDefault';
import  icono_ajustes  from './imgs/icono_ajustes.svg';
import { PantallaAjustes } from './components/PantallaAjustes';

function App() {
	const [tareasLS, setTareasLS] = useLocalStorage("tareas", []);
	const [tareas, setTareas] = React.useState(tareasLS);
	const [mostrandoAjustes, setMostrandoAjustes] = React.useState(false);

	const [categoriasLS, setCategoriasLS] = useLocalStorage("categorias", []);
	const [categorias, setCategorias] = React.useState(categoriasLS);

	//Son las tareas de la categoria activa	(inicialmente son todas)
	const [tareasCategoria, setTareasCategoria] = React.useState(tareas);

	const [categoriaActivaLS, setCategoriaActivaLS] = useLocalStorage("categoriaActiva", '');
	const [categoriaActiva, setCategoriaActiva] = React.useState(categoriaActivaLS || '');

	const [editandoTarea, setEditandoTarea] = React.useState(false);

	const [tema, setTema] = useLocalStorage("tema", 'dark');

	//Establece el tema por defecto
	React.useEffect(() => { document.documentElement.setAttribute('data-theme', tema); }, [])

	//Cuando cambian las categorias, las anado al localstorage
	React.useEffect(() => { setCategoriasLS(categorias); }, [categorias])
	React.useEffect(() => { setTareasLS(tareas); }, [tareas])

	//Cuando se añade una tarea o cambia categoriaActiva, hay que actualizar tareasCategorias para que se renderice en pantalla
	React.useEffect(() => {
		setCategoriaActivaLS(categoriaActiva)
		setTareasCategoria(tareas.filter(tarea => tarea.categoria == categoriaActiva));
	}, [categoriaActiva, tareas])

	//FUNCIONES DE CATEGORIAS
	const userCreatesCategoria = (titulo) => {
		setCategorias(prev => {
			return [
				...prev,
				titulo
			]
		})
		setCategoriaActiva(titulo)
	}

	const userBorraCategoria = (titulo) => {
		borrarNotasDeCategoria(titulo);
		let nuevasCategorias = categorias.filter(cat => cat !== titulo)
		setCategorias(nuevasCategorias);
		setCategoriaActiva(categoriasDefault[0])
	}

	const borrarNotasDeCategoria = (tituloCategoria) => {
		setTareas(current =>
			current.filter(element => {
				return element.categoria !== tituloCategoria;
			}),
		);
	}

	const cambiarCategoriaActiva = (titulo) => {
		//titulo hace referencia al texto que hay en las pestañas...
		if (titulo === 'Sin categoría') {
			setCategoriaActiva('');
		} else {
			setCategoriaActiva(titulo);
		}
	}
	//FUNCIONES DE TAREAS
	const userCreatesTarea = (tituloTarea, subtareas, categoria) => {
		setTareas(prev => {
			return [
				...prev,
				{
					id: Date.now(),
					fecha: obtenFecha(Date.now()),
					titulo: tituloTarea,
					checked: false,
					subtareas: subtareas || '',
					categoria: categoria
				}
			]
		})
	}

	const eliminarTareaConId = (idTarea) => {
		setTareas(current =>
			current.filter(element => {
				return element.id !== idTarea;
			}),
		);
	}

	const obtenerTareasCategoria = (tituloCategoria) => {
		const nuevasTareas = tareas.filter(tarea => {
			return tarea.categoria === tituloCategoria;
		})
		return nuevasTareas;
	}

	const checkTarea = (isChecked, idTarea) => {
		const newState = tareas.map(tarea => {
			if (tarea.id === idTarea) {
				return { ...tarea, checked: isChecked };
			}
			return tarea;
		});
		setTareas(newState);
	}

	const editarTarea = (id, nuevoNombre) => {
		const newState = tareas.map(tarea => {
			if (tarea.id === id) {
				return { ...tarea, titulo: nuevoNombre };
			}
			return tarea;
		});
		setTareas(newState);
	}

	const eliminarTareasCompletadas = () => {
		setTareas(current =>
			current.filter(element => {
				return element.checked === false;
			}),
		);
	}
	//FUNCIONES DE SUBTAREAS
	const checkSubTarea = (isChecked, idTarea, idTareaPadre) => {
		let substate;
		tareas.map(tarea => {
			if (tarea.id === idTareaPadre) {
				substate = tarea.subtareas.map(subtarea => {
					if (subtarea.id === idTarea) {
						return { ...subtarea, checked: isChecked }
					}
					return subtarea;
				})
			}
			return tarea;
		});

		let newState = tareas.map(tarea => {
			if (tarea.id === idTareaPadre) {
				return { ...tarea, subtareas: substate }
			}
			return tarea;
		});
		setTareas(newState);
	}

	const nuevaSubtarea = (titulo, idPadre) => {
		let substate;
		tareas.map(tarea => {
			if (tarea.id === idPadre) {
				substate = tarea.subtareas;
			}
		});
		substate.push({
			id: Date.now(),
			text: titulo,
			checked: false
		});

		let newState = tareas.map(tarea => {
			if (tarea.id === idPadre) {
				return { ...tarea, subtareas: substate }
			}
			return tarea;
		});
		setTareas(newState);

	}

	const eliminarSubTarea = (idSubtarea, idPadre) => {
		let newSubState;
		let newState = tareas.map(tarea => {
			if (tarea.id === idPadre) {
				newSubState = tarea.subtareas.filter((subtarea) => {
					return subtarea.id !== idSubtarea;
				})
			} else {
				return tarea;
			}
		})
		newState = tareas.map(tarea => {
			if (tarea.id === idPadre) {
				return { ...tarea, subtareas: newSubState }
			} else {
				return tarea;
			}
		})
		setTareas(newState)
	}

	const activarTema = (cual) => {
		switch (cual) {
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

	const abrirAjustes = () => {
		setMostrandoAjustes(true);
	}
	const hayTareasCompletadas = () => {
		return tareas.some(tarea => tarea.checked === true);
	}
	return (

		<div className="horizontal-centered full-screen-height pad-2">

			{mostrandoAjustes &&
                <PantallaAjustes
					tema={tema}
					activarTema={activarTema}
                    categorias={categorias}
					callbackNuevaCategoria={userCreatesCategoria}
                    handleCloseCallback={()=>{setMostrandoAjustes(false)}}
                    handleBorrarCategoria={userBorraCategoria}
                />}

			<button className='btn-abrir-ajustes' onClick={abrirAjustes}>
				<img src={icono_ajustes}>
				</img>
			</button>

			

			<h1>Tareas</h1>

			<p style={{ padding: '0.75em' }}>Un texto motivador...</p>

			<FormularioNuevaTarea
				categoriaActiva={categoriaActiva}
				categorias={categorias}
				callback={userCreatesTarea}
			/>

		{tareas.length > 0 && 
		<>
				<NavCategorias
					categorias={categorias}
					categoriaActiva={categoriaActiva}
					callbackCrearCategoria={userCreatesCategoria}
					callbackBorrarCategoria={userBorraCategoria}
					callbackCategoriaActiva={cambiarCategoriaActiva}
				/>

				<ul className='lista-tareas'>
					{
						(tareasCategoria.length <= 0)
							? <p className='empty-tareas-message'>No hay tareas pendientes...</p>
							: tareasCategoria.map(tarea => {
								return (
									<Tarea
										key={tarea.id}
										id={tarea.id}
										tarea={tarea}
										callbackCheck={checkTarea}
										callbackSubtareaCheck={checkSubTarea}
										callbackBorrarTarea={eliminarTareaConId}
										callbackEliminarSubTarea={eliminarSubTarea}
										callbackNuevaSubtarea={nuevaSubtarea}
										callbackGuardarTarea={editarTarea}
									/>
								)
							})
					}
				</ul>
		</>
		}

			{hayTareasCompletadas() &&
				<button className='boton-eliminar-completadas' onClick={eliminarTareasCompletadas}>Eliminar tareas completadas</button>
			}
		</div>

	);

}

export default App;
