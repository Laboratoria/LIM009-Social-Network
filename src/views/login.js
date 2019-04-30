import { clickRegister } from './register.js'
import { loginButtons } from '../controllers/login.js'

const main = document.getElementById('main');

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
      <div class="fs-20 px-0 "> Â¿No tienes una cuenta? <a id="showRegister">Registrate</a> </div> 
  
    </div>
  `
    const div = document.createElement('div')
    div.className = 'fluid-flex';
    div.innerHTML = back1;
    main.appendChild(div);
    loginButtons();
    clickRegister()
  };
  