import { registerFirebase } from "./view-Controle.js";

export const errorLogin = (msm) => { 
    let text = '';
    switch (msm) {
        case 'auth/invalid-email': {
            text = 'La dirección de correo electrónico es inválido.';
            break;
        }
        case 'auth/wrong-password': {
            text = 'La contraseña no es válida.';
            break;
        }
        default: {
            text = 'correo y/o contraseña inválida.';
        }
    }  
    return text;
}

export const errorRegister = (msm) => { 
    let text = '';
    switch (msm) {
        case 'auth/invalid-email': {
            text = 'La dirección de correo electrónico es inválido.';
            break;
        }
        case 'auth/weak-password': {
            text = 'La contraseña debe tener 6 caracteres o más.';
            break;
        }
        default: {
            text = 'correo y/o contraseña inválida.';
        }
    }  
    return text;
}

export const errorUsername = () => {
    const inputUsername = document.getElementById('username');
    const inputEmail = document.getElementById('email2');
    const inputPass = document.getElementById('password2');
    const text = document.querySelector('#parrafo2');
    if ( inputUsername.value === '' && inputEmail.value === '' && inputPass.value === '' ) {
        text.innerHTML = 'Complete los campos requeridos.'
    } else if(inputUsername.value === '') {
        text.innerHTML = 'Ingrese su nombre de usuario.';
    } else {
        registerFirebase();
    }
}

        


