import { registerUser } from '../controller/view-controller.js'

export default () => {
  const formRegister = document.createElement('div');
  const templateRegister = `
    <div class= 'col-12 col-xs-12 style-border'>
    <div class= ' col-12 center'>
    <header><img src="./image/logo.png" alt="educacion" class='block center'>
       <h2 class='center'>  << Por una educación respetuosa >>  </h2>
    </header>
    <form class = 'center'>     
      <input type="email" id="email-register" class='style-input center block border' placeholder ='Escriba su email'/>
      <input type="password" id="password-register" class='style-input center block border' placeholder ='Escriba su contraseña' />
      <p id = 'mjs-error-register' class = 'center block' ></p>
      <button type="button" id="btn-register" class='center style-btn-login block border' >Registrarse</button>
    </form>
    <footer>
      <a href='#/login' class= 'style-register'>Regresar</a></span>
    <footer>
   </div>
   </div>
   `;
  formRegister.innerHTML = templateRegister;
  const btnRegister = formRegister.querySelector('#btn-register');
  btnRegister.addEventListener('click', registerUser)
  return formRegister;
};