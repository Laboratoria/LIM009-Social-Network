import { registerAfterTemplate } from '../controllers/login.js'

const screenRegister = () => {
    const login = document.getElementById('login')
    login.innerHTML = '';
    const register =
        `<div id="register" class="container px-5 non'e">
  <h4 class="px-4 subtitle-pass" >Registro de usuario </h4>
  <div class="one-column">
  <input id="email-signin" type="email" placeholder="Email" class="input-text" />
  <input id="password-signin" type="password" placeholder="Password" class="input-text" />
  <a type="button" id="button-register" class="button-pass"> Registrarme </a>
  </div>
  </div>
  `;
    login.innerHTML = register;
};

export const clickRegister = () => {
    const registerA = document.querySelector('[id="showRegister"]');
    registerA.addEventListener('click', e => {
        e.preventDefault();
        screenRegister();
        registerAfterTemplate()
    });
}
