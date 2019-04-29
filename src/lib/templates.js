import { registerAfterTemplate } from '../main.js'
import { signOut } from './index.js';

const content = document.getElementById('content')
const main = document.getElementById('main');

const screenRegister = () => {
  // event.preventDefault()
  const login = document.getElementById('login')
  login.innerHTML = '';
  const register =
    `<div id="register" class="container px-5 non'e">
<h4 class="px-4 subtitle-pass" >Registro de usuario </h4>
<div class="one-column">
<input id="email-signin" type="email" placeholder="Email" class="input-text" />
<input id="password-signin" type="password" placeholder="Password" class="input-text" />
<button type="button" id="button-register" class="button-pass"> Registrarme </button>
</div>
</div>
`;
  const div = document.createElement('div')
  div.innerHTML = register;
  login.appendChild(div);
};

const clickRegister = () => {
const registerA = document.querySelector('[id="showRegister"]');
registerA.addEventListener('click', e => {
  e.preventDefault();
  screenRegister();
  //POR VERIFICAR 
  registerAfterTemplate()
});
}

export const screen1 = () => {
  const back1 = `  
  <div class="container container-bg">
    <img src="assets/18984.jpg" alt="Some bg">
  </div>
  <div id='login' class="container px-5">

    <h2 class="title-pass">WEBOOKS</h2>
    <h4 class="px-4 subtitle-pass" >Bienvenidx!</h4>

    <div class="one-column">
      <input id="email-login" type="email" placeholder="Email" class="input-text" />
      <input id="password-login" type="password" placeholder="Password" class="input-text" />
      <button type="button" id="button-login-email" class="button-pass"> Log in </button>
    </div>

    <p class="fs-20 px-15">O bien ingresa con...</p>

    <a class="devicon-google-plain gmail-color icon-size"id="google-login"></a>
    <a class="devicon-facebook-plain facebook-color icon-size" id="fb-login"></a>
    <div class="fs-20 px-0 "> ¿No tienes una cuenta? <a id="showRegister">Registrate</a> </div> 

  </div>
`
  const div = document.createElement('div')
  div.innerHTML = back1;

  main.appendChild(div);

  clickRegister()
};



export const leaveSesion = () => {
  const string = `
    <p>Welcome </p>
    <button id="buttonLogOut">Cerrar sesión</button>
    `;
  const div = document.createElement('div')
  div.innerHTML = string;
  content.appendChild(div);
}

export const printInfoUser = (result) => {
  const user = result.user;
  const div = document.createElement('div')
  content.appendChild(div);
  console.log(user);

  if (user.photoURL) {
    div.innerHTML = `Hello ${user.displayName} <img src=${user.photoURL}>`;
  } else {
    div.innerHTML = `Hello ${user.displayName}`;
  }
};

export const showContent = user => {
  if (user) {
    leaveSesion();
   }

  const buttonLogOut = document.getElementById('buttonLogOut');
  buttonLogOut.addEventListener('click', signOut);
};