import React, {Fragment, useState} from 'react';
//uuid genera un id unico para cada registro
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

	//Crear state de Citas
	const [cita, actualizarCita] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: ''
	});
	
		//State para el manejo de error en validacion del formulario
		const [ error, actualizarError ] = useState(false)
 
	//Funcion que se ejecuta cada vez que el usuario escribe en un input
	const actualizarState = (e) => {
		//console.log(e.target.value);
      actualizarCita({
		  ...cita,
         [e.target.name]: e.target.value
      })
	}
	
	//Extrer los valores
	const { mascota, propietario, fecha, hora, sintomas } = cita;
	
	//Cuando el usuario presiona enviar cita
	const submitCita = e => {
		e.preventDefault();
		
		//Validar
		if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
			actualizarError(true);
			return;
		}
		//Eliminar mensaje previous
		actualizarError(false);
		
		
		//Asignar un id
		cita.id = uuid();
		
		//Crear la cita
		crearCita(cita);
		
		//Reiniciar el form
		actualizarCita({
			mascota: '',
			propietario: '',
			fecha: '',
			hora: '',
			sintomas: ''
		})
		
	}

  return (
   	<Fragment>
   		<h4>Crear Cita</h4>
		
		{ error ? <p className="alerta-error cita">Todos los campos son obligatorios</p>   : null }

   		<form
			onSubmit={submitCita}
		>
   			<label>Nombre Mascota</label>
   			<input
   				type="text"
   				name="mascota"
   				className="u-full-width"
   				placeholder="Nombre Mascota"
   				onChange={actualizarState}
				value={mascota}
   			/>

   			<label>Nombre Dueño</label>
   			<input
   				type="text"
   				name="propietario"
   				className="u-full-width"
   				placeholder="Nombre Dueño de la Mascota"
   				onChange={actualizarState}
				value={propietario}
   			/>

   			<label>Fecha</label>
   			<input
   				type="date"
   				name="fecha"
   				className="u-full-width"
   				onChange={actualizarState}
				value={fecha}
   			/>

   			<label>Hora</label>
   			<input
   				type="time"
   				name="hora"
   				className="u-full-width"
   				onChange={actualizarState}
				value={hora}
   			/>

   			<label>Sintomas</label>
            <textarea
            	name="sintomas"
            	className="u-full-width"
            	onChange={actualizarState}
				value={sintomas}
            ></textarea>

            <button
            	type="submit"
            	className="u-full-width button-primary"
            >Agregar Cita</button>
   		</form>
   	</Fragment>
  )
}

Formulario.propTypes = {
	crearCita: PropTypes.func.isRequired
}

export default Formulario;