import { signUpOnSubmit } from "../controller/controller1.js";

export default () => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "container");
  divElement.innerHTML = `
    <aside class="left ancho">
      <img src="./css/img/day.jpg" alt="cargando imagen" class="img">
    </aside>
    <main class="right ancho">
    <h1> < Breath Life > </h1>
    <h3> Respira salud, respira vida </h3>
    <form action="" class="formulario acceder" id="register-form">
    <input type="name" id="name" class="Name input redondear" placeholder="Nombre">
    <input type="text" id="last-name" class="last-Name input redondear" placeholder="Apellidos">
    <input id="email2" class="input redondear" type="email" placeholder="Ingrese su correo">
    <input id="password2" class="input redondear" type="password" placeholder="Ingrese su contraseña">
    <button type="button" class="button-acceder redondear boton" id="btn-sign-up">Registrar</button>
     </form>
      <div>
          <p class="parrafo">Si ya tienes una cuenta <a href="">Inicia sesión</a></p>
      </div>
    </main>`;
  const registerClick = divElement.querySelector("#btn-sign-up");
  registerClick.addEventListener("click", signUpOnSubmit);
  return divElement;
};





