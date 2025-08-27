import { useState ,useEffect} from "react";
import ListaDeTareas from "../ListaDeTareas/ListaDeTareas"
import { auth } from "../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";
import Login from "../login/Login";


const Logueo=()=>{

    const [usuario,setUsuario]=useState(null)


    useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUsuario(currentUser);
  });

  // Cleanup: quitar el listener cuando el componente se desmonte
  return () => unsubscribe();
}, []);
    return(
 <div className="min-h-screen bg-[#777DA7] flex flex-col items-center justify-start">
  <div className="w-full max-w-screen-md px-4 mt-6">
    <h1 className="text-white text-2xl md:text-4xl uppercase text-center font-sans underline">
      Lista de Tareas
    </h1>
    <p className="text-white text-center mt-5 text-sm md:text-xl font-serif ">
      Tu espacio para gestionar lo importante
      <img src="/lista.jpg" alt="imagen decorativa" className="mt-6 w-48 h-auto mx-auto rounded-full" />
    </p>
  </div>
  
  {usuario ? <ListaDeTareas /> : <Login />}
</div>

    )
}

export default Logueo