import {signIn} from "../services/firebase.js";
import {signUp} from "../services/firebase.js";
import {signUpWithGoogle} from "../services/firebase.js"
import Register from '../view/register.js';


export const signInOnSubmit=()=>{

    const registerLink=document.querySelector('#register-link');
    const btnSignIn = document.querySelector('#btn-sign-in');
    btnSignIn.addEventListener('click',()=>{
        const email=document.querySelector('#email').value;
        const password=document.querySelector('#password').value;
        signIn(email,password)
    });
    registerLink.addEventListener("click",Register);
};

export const signUpOnSubmit=()=>{
   const btnSignUp = document.querySelector('#btn-sign-up');
   const iconGoogle = document.querySelector('#icon-google');
   btnSignUp.addEventListener('click',()=>{
    const email=document.querySelector('#email2').value;
    const password=document.querySelector('#password2').value;
    signUp(email,password)
    document.getElementById("register-form").reset()
    });

    iconGoogle.addEventListener('click',signUpWithGoogle);
};

