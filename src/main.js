// Este es el punto de entrada de tu aplicacion

import { loginGoogle } from './lib/index.js';

loginGoogle();

const email = document.getElementById('email');
const password = document.getElementById('password');
const email2 = document.getElementById('email2');
const password2 = document.getElementById('password2');
const btnRegister = document.getElementById('btn-register');
const btnSubmit = document.getElementById('btn-submit');
const btnGoogle = document.getElementById('btn-google');
const root = document.getElementById('root');

const provider = new firebase.auth.GoogleAuthProvider();


