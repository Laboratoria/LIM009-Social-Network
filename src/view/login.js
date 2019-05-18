import {     signInAfterClick,
  signInWithGoogleAfterClick,
  signInWithFacebookAfterClick
} from "../controller/controller1.js";
export default () => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "container");
  divElement.innerHTML = `
    <aside class="left ancho">
      <img src="./css/img/day.jpg" alt="cargando imagen" class="img">
    </aside>
    <main class="right ancho">
    <h1> Breath Life  </h1>
    <h3> Respira salud, respira vida </h3>
      <form action="" class="formulario acceder">
          <input id="email" class="input redondear" type="email" placeholder="Ingrese su correo">
          <input id="password" class="input redondear" type="password" placeholder="Ingrese su contraseña">
          <button type="button" class="button-acceder redondear boton"  id="btn-sign-in">Acceder</button>
      </form>
      <div>
          <div class="iconos">
            <ul>
              <li>
                <a><img class="icon-network" id="icon-facebook" src="./css/img/facebook.png"></a>
                <a><img class="icon-network" id="icon-google" src="./css/img/google-plus.png"></a>
              </li>
            </ul>
          </div>
          <p>¿No tienes una cuenta? <a href="#/registro" id="register-link">Regístrate</a></p>
      </div>
    </main>`;
  const btnSignIn = divElement.querySelector('#btn-sign-in');
  btnSignIn.addEventListener('click', signInAfterClick);
  const iconGoogle = divElement.querySelector("#icon-google");
  iconGoogle.addEventListener("click",signInWithGoogleAfterClick );
  const iconFacebook = divElement.querySelector("#icon-facebook");
  iconFacebook.addEventListener("click", signInWithFacebookAfterClick );

  return divElement;
};


