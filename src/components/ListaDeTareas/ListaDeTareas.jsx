import { useState,useEffect} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Swal from 'sweetalert2';

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

  const [tareaAlAzar,setTareaAlAzar]=useState(null)
  

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

  function cerrarSesion() {
 signOut(auth)
  .then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      confirmButtonText: 'OK',
    });
  })
    .catch((error) => {
      alert("Error al cerrar sesión: " + error.message);
    });
}


//consumir api

function api(){
    fetch("/data/tareas.json")
    .then((resp)=>resp.json())
    .then((data)=>{
        const tareaRandom=data[Math.floor(Math.random()*data.length)]
        setTareaAlAzar(tareaRandom)
    })
    .catch((error)=>{
        console.log("error")
    })
}


  //useffect que usamos para enviar las tareas al local storage
    useEffect(() => {
    localStorage.setItem("tareas",JSON.stringify(tareas))
  }, [tareas]);




  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-md mx-auto">
    

      <input  className="border rounded px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-sky-500"
      type="text" value={input} onChange={manejarInput} />
      <button  className="bg-sky-600 hover:bg-sky-700 text-white rounded px-4 py-2 w-full" 
       onClick={agregarTarea}>Agregar tarea</button>

      <ul>
  {tareas.map((tarea) => (
    // Generamos un <li> por cada tarea usando map
    <li  className="bg-white shadow-md rounded p-4 mb-4 w-full text-black flex flex-col md:flex-row md:items-center md:justify-between gap-2 font-serif"
     key={tarea.id}>
      {tarea.id === editado ? (
        <>
          {/* Input para editar el texto de la tarea */}
          <input
    className="border rounded px-4 py-3 w-96 focus:outline-none focus:ring-2 focus:ring-sky-500"
    type="text"
    value={textoEditado}
    onChange={(e) => setTextoEditado(e.target.value)}
  />
  <button
    className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 w-full"
    onClick={() => guardarEdicion(tarea.id)}
  >
    Guardar
  </button>
  <button
    className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2 w-full"
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
          <button className="bg-sky-600 hover:bg-sky-700 text-white rounded px-4 py-2 w-full"
          onClick={() => editar(tarea.id)}>Editar</button>
        </>
      )}

      <br />

      {/* Botón para eliminar esta tarea */}
      <button className="bg-sky-600 hover:bg-sky-700 text-white rounded px-4 py-2 w-full"
      onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
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
<br />
<button className="bg-sky-600 hover:bg-sky-700 text-white rounded px-4 py-2 w-full"
  onClick={api}
>
  generar tarea al azar
</button>

{/* Mostrar la tarea solo si tareaAlAzar no es null */}
{tareaAlAzar && (
  <div >
    <div className="bg-white p-4 rounded shadow w-full mt-4 text-black text-center">
  <h3 className="font-bold">Tarea de otro usuario</h3>
  <p className="italic">"{tareaAlAzar.titulo}"</p>
  <p className="text-sm mt-2">– {tareaAlAzar.autor}</p>
</div>
    
    
  </div>
)}
<br />
<button  className="bg-sky-600 hover:bg-sky-700 text-white rounded px-4 py-2 w-full"
onClick={cerrarSesion}>cerrar sesion</button>
    </div>
  );
};

export default ListaDeTareas;


// {/* <button
//   onClick={() => {
//     if (tareaAlAzar) {
//       setTareaAlAzar(null); // Ocultar si ya hay una
//     } else {
//       api(); // Mostrar una nueva
//     }
//   }}
// >
//   {tareaAlAzar ? "Ocultar tarea sugerida" : "Mostrar tarea sugerida"}
// </button>

// {/* Mostrar la tarea solo si tareaAlAzar no es null */}
// {tareaAlAzar && (
//   <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
//     <h3>Tarea sugerida:</h3>
//     <p>{tareaAlAzar.texto}</p>
//     {/* Si tu JSON tiene otras propiedades, las podés mostrar acá, ejemplo: */}
//     {/* <small>Autor: {tareaAlAzar.autor}</small> */}
//   </div>
// )} */}