import {signIn} from "../services/firebase.js";

export const signInOnSubmit=()=>{
    const email=document.querySelector('#email').value;
    const password=document.querySelector('#password').value;
    const btnSignIn = document.querySelector('#btn-sign-in');
    btnSignIn.addEventListener('click', 
    signIn(email,password));
};
