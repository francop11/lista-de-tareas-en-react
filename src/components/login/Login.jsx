import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase"


const Login =()=>{
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")


async function registro(){
try { 
        console.log(email, password); // 🔍 Verificás lo que estás enviando
    const credencial= await createUserWithEmailAndPassword(auth,email,password) 
    alert("usuario registrado "+ credencial.user.email)
}catch(error){
     console.error(error.code, error.message); // Agrega esto para ver mejor qué dice
    alert("error al registrar "+ error.message)

}

}
async function login (){
    try{
        const credencial=await signInWithEmailAndPassword (auth,email,password)
        alert ("sesion iniciada bienvenido "+credencial.user.email)
    }catch(error){
        alert("error al iniciar sesion "+ error.message)
    }

}

function manejarEmail(e){
    setEmail(e.target.value)
}

function manejarPassword(e){
 setPassword(e.target.value)
}

    return(
        <div  className="flex flex-col items-center gap-4 p-4 max-w-md mx-auto">
            
            <input   className="border rounded px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-sky-500"
            type="email"  value={email}    placeholder="Correo electrónico"  onChange={manejarEmail}/>
            
            <input className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
            type="password"  value={password}   placeholder="contraseña"  onChange={manejarPassword}/>

            <button   className="bg-sky-600 hover:bg-sky-700 text-white rounded px-4 py-2 w-full"
               onClick={registro}>registrarse</button>
            
            <button  className="bg-sky-600 hover:bg-sky-700 text-white rounded px-4 py-2 w-full"  onClick={login}>iniciar sesion</button>

        </div>
    )
}

export default Login