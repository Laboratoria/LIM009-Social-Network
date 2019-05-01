import {signIn} from "../services/firebase.js";
import { signUp } from "../services/firebase.js";
/* import { signUpWithGoogle } from "../services/firebase.js"  */


 const signInOnSubmit = () => {

    const btnSignIn = document.querySelector('#btn-sign-in');
    btnSignIn.addEventListener('click', () => {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        signIn(email, password)
    });
};
export { signInOnSubmit }; 

const signUpOnSubmit = () => {
    const btnSignUp = document.querySelector('#btn-sign-up');
    btnSignUp.addEventListener('click', () => {
        signUp(email, password)
    });
};
export { signUpOnSubmit }; 

/* const signUpOnSubmitGoogle = () => {
    const btnSignUpgoo = document.querySelector('#btn-sign-up');
    const iconGoogle = document.querySelector('#icon-google');
    btnSignUpgoo.addEventListener('click', () => {
        const email = document.querySelector('#email2').value;
        const password = document.querySelector('#password2').value;
        signUp(email, password)
        document.getElementById("register-form").reset()
    });

    iconGoogle.addEventListener('click', signUpWithGoogle);
};

export { signUpOnSubmitGoogle }; */ 