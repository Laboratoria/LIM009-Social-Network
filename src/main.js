// Este es el punto de entrada de tu aplicacion

import SignInForm from './view/SignInForm.js';

import {loginGoogle}  from './lib/index.js';

SignInForm.signInForm();

document.getElementById('btn-google').addEventListener('click', () => {loginGoogle()
});
