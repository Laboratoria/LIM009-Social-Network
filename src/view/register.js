import { signUpOnSubmit } from "../controller/controller1.js";

const root = document.getElementById('root');
export default () => {
  const divElement = document.createElement("div");
  const registerView = `
    <aside class="left ancho">
      <img src="./css/img/day.jpg" alt="cargando imagen" class="img">
    </aside>
    <main class="right ancho">
      <form action="" class="formulario acceder" id="register-form">
      <h1>< BreathLife></h1>
      <h3> Respira salud, Respira vida </h3>
  
          <input id="email2" class="input redondear" type="email" placeholder="Ingrese su correo">
          <input id="password2" class="input redondear" type="password" placeholder="Ingrese su contraseña">
          <button type="button" class="button-acceder redondear" id="btn-sign-up">Registrar</button>
      </form>
    </main>`;

  divElement.setAttribute("class", "container");
  divElement.innerHTML = registerView;

  root.appendChild(divElement);  
  signUpOnSubmit();
};