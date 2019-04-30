import {signIn} from "../services/firebase.js";

export default()=>{
    const email=document.querySelector('#email').value;
    const password=document.querySelector('#password').value;
    signIn(email,password)
    console.log("sesion iniciada");
}