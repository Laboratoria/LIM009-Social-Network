import {facebookLogin,googleLogin,createUser,userSesionActive,loginUser,exit} from './index.js'

export const activeUserPage = (user) => {
  const content = document.getElementById('content');
  const User = user;
  if (User != null) {
    let bienvenida = `
    <button id="exit">Cerrar sesión</button>
    <p>Bienvenidx ${User.displayName}</p>
    <p> Email: ${User.email}<p>
		<figure><img src="${User.photoURL}" alt="foto"></figure>
    `;
    content.innerHTML = bienvenida;

    const buttonExit = document.getElementById('exit');
    buttonExit.addEventListener('click', () => {
      exit();
    });
  }
}

export const page1 = () => {
  const content = document.getElementById('content');
  const loginPage = `  
  <figure>
    <img src="../images/undraw_chef_lbjx.svg" alt="" style="width:300px;">
  </figure>
<div id='login'>
  <section class="bienvenida">
    <h1>FoodBook</h1>
    <h3>¡Bienvenido, comensal!</h3>
  <form id="login-user">
    <input type="email" id="email-login" placeholder="Email">
    <input type="password" id="password-login" placeholder="Password">
    <button id="login-btn">Log in</button>
    <div>
      <p>O bien ingresa con...</p>
      <button id="googleBtn"><img src="../images/search.svg" alt="Google" style="width:30px;"></img></button>
      <button id="fbBtn"><img src="../images/facebook-logo-in-circular-button-outlined-social-symbol.svg" alt="Facebook" style="width:30px;"></img></button>
    </div>
  </form>
  <div>
  <p>¿No tienes una cuenta? <a id="myBtn" href="#">Regístrate.</a></p>
  </div>
</div>`;
  content.innerHTML = loginPage;


  const registerPage = () => {
    const login = document.getElementById('login')
    login.innerHTML = '';
    const register =
      `<form id="add-profile">
        <input type="text" id="name-signup" placeholder="Nombre">
        <input type="text" id="lastName-signup" placeholder="Apellido">
        <input type="email" id="email-signup" placeholder="Email">
        <input type="password" id="password-signup" placeholder="Password">
        <div id="signup-btns">
          <button id="register-btn">Registrarse</button>
          <button id="regresarHome"><img src="">Regresar</button>
        </div>
      </form> `;
    const div = document.createElement('div')
    div.innerHTML = register;
    login.appendChild(div);
  };

  const registerUserOk = () => {
    const buttonRegisterEmail = document.getElementById('register-btn');
    const emailSignIn = document.getElementById('email-signup');
    const passwordSignIn = document.getElementById('password-signup');

    buttonRegisterEmail.addEventListener('click', (event) => {
      event.preventDefault();
      createUser(emailSignIn.value, passwordSignIn.value);
    });
  }

  const registerBtn = document.getElementById('myBtn');
  registerBtn.addEventListener('click', e => {
    e.preventDefault();
    registerPage();
    registerUserOk();
  });

  const buttonLogInEmail = document.getElementById('login-btn');
  const emailLogInEmail = document.getElementById('email-login');
  const passwordLogInEmail = document.getElementById('password-login');
  buttonLogInEmail.addEventListener('click', (event) => {
    event.preventDefault();
    loginUser(emailLogInEmail.value, passwordLogInEmail.value);
  });
  userSesionActive();

  const loginFacebook = document.getElementById('fbBtn');
  loginFacebook.addEventListener('click', e => {
    e.preventDefault();
    facebookLogin();
  })

  const loginGoogle = document.getElementById('googleBtn');
  loginGoogle.addEventListener('click', e => {
    e.preventDefault();
    googleLogin();
  });
};