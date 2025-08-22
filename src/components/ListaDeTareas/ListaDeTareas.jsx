import { useState } from "react"

const ListaDeTareas=()=>{

    const [input,setInput]=useState("")
    const [tareas,setTareas]=useState([])


    function manejarInput(e){
        setInput(e.target.value)

    }

    function agregarTarea(){
        if(input != ""){
            setTareas([...tareas,input])
        }
        else(alert("debes ingresar una tarea"))
        setInput("")

    }

    return(
        <div>
            <h1  >lista de tareas</h1>

            <input type="text" value={input} onChange={manejarInput} />
            <button onClick={agregarTarea}>agregar tarea</button>
            <ul>
                {tareas && tareas.map((tarea,id)=>{
               return      <li key={id}>{tarea}</li>
                })}
            </ul>
        </div>
    )
}

export default ListaDeTareas