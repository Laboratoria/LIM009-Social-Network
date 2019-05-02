import { signInOnSubmit, signInOnSubmitGoogle, signInOnSubmitFacebook } from "../controller/controller1.js";

const root = document.getElementById("root");
export default () => {
  const divElement = document.createElement("div");
  const loginView = `
    <aside class="left ancho">
      <img src="./css/img/day.jpg" alt="cargando imagen" class="img">
    </aside>
    <main class="right ancho">
      <form action="" class="formulario acceder">
      <h1> < Breath Life > </h1>
      <h3> Respira salud, Respira vida </h3>
          <input id="email" class="input redondear" type="email" placeholder="Ingrese su correo">
          <input id="password" class="input redondear" type="password" placeholder="Ingrese su contraseña">
          <button type="submit" class="button-acceder redondear"  id="btn-sign-in">Acceder</button>
      </form>
      <div>
          <p>O bien ingresa con...</p>
          <div class="iconos">
             <button type="submit" class="button-acceder redondear"  id="icon-google">Google</button>
             <button type="submit" class="button-acceder redondear"  id="icon-facebook">Facebook</button>
                          
          </div>
          <p>¿No tienes una cuenta? <a href="#/registro" id="register-link">Resgístrate</a></p>
      </div>
    </main>`;

  divElement.setAttribute("class", "container", "iconos");
  divElement.innerHTML = loginView;

  root.appendChild(divElement);
  signInOnSubmit();
  signInOnSubmitGoogle();
  signInOnSubmitFacebook();
};


// <i id="icon-google" class="fab fa-google"></i>
// <i class="fab fa-facebook-square"></i>