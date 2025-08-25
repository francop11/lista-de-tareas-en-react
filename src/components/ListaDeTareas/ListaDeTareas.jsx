import { useState,useEffect} from "react";

const ListaDeTareas = () => {
    //esatdo que maenja el input
  const [input, setInput] = useState("");
  //estado de tareas que trae tambien de local storage las tareas guardadas
 const [tareas, setTareas] = useState(() => {
  const tareasGuardadas = localStorage.getItem("tareas");
  return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
});
  //estado para manejar la edicion de las tareas
  const [editado, setEditado] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");
  

  //funcion para manejar el input principañ
  function manejarInput(e) {
    setInput(e.target.value);
  }

  //funcion que agrega tareas
  function agregarTarea() {
    if (input !== "") {
      const nuevaTarea = {
        id: Date.now(),
        texto: input,
        completada: false,
      };
      setTareas([...tareas, nuevaTarea]);
      setInput("");
    } else {
      alert("Debes ingresar una tarea");
    }
  }
  
  //funcion para eliminar tareas
  function eliminarTarea(id) {
    const tareasFiltradas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasFiltradas);
  }
  

  //funcion que usamos cuando completamos una tarea
  function completarTarea(id) {
    const tareaCompletada = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(tareaCompletada);
  }
 
 //funcion para editar una tarea
  function editar(id) {
    const tareaEditada = tareas.find((tarea) => tarea.id === id);
    setTextoEditado(tareaEditada.texto);
    setEditado(id);
  }


  //funcion para guardar el texto editado
  function guardarEdicion(id) {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, texto: textoEditado } : tarea
    );
    setTareas(tareasActualizadas);
    setEditado(null);
    setTextoEditado("");
  }
  

  //useffect que usamos para enviar las tareas al local storage
    useEffect(() => {
    localStorage.setItem("tareas",JSON.stringify(tareas))
  }, [tareas]);




  return (
    <div>
      <h1>Lista de tareas</h1>

      <input type="text" value={input} onChange={manejarInput} />
      <button onClick={agregarTarea}>Agregar tarea</button>

      <ul>
  {tareas.map((tarea) => (
    // Generamos un <li> por cada tarea usando map
    <li key={tarea.id}>
      {tarea.id === editado ? (
        <>
          {/* Input para editar el texto de la tarea */}
          <input
            type="text"
            value={textoEditado}
            onChange={(e) => setTextoEditado(e.target.value)}
          />
          {/* Botón para guardar la edición hecha */}
          <button onClick={() => guardarEdicion(tarea.id)}>Guardar</button>
          {/* Botón para cancelar la edición y volver al estado original */}
          <button
            onClick={() => {
              setEditado(null);
              setTextoEditado("");
            }}
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          {/* Muestra el texto de la tarea */}
          {tarea.texto}
          <br />
          {/* Botón para iniciar la edición de esta tarea */}
          <button onClick={() => editar(tarea.id)}>Editar</button>
        </>
      )}

      <br />

      {/* Botón para eliminar esta tarea */}
      <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
      <br />

      {/* Checkbox para marcar o desmarcar la tarea como completada */}
      <input
        type="checkbox"
        onChange={() => completarTarea(tarea.id)}
        checked={tarea.completada}
      />
      <label>Tarea completada</label>
    </li>
  ))}
</ul>
    </div>
  );
};

export default ListaDeTareas;
