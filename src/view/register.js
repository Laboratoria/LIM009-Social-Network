import { signUpAfterClick } from "../controller/controller1.js";

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
<input type="text" id="name" class="input redondear" placeholder="Nombre y Apellidos">
<input type="text" id="age" class="input redondear" placeholder="Edad">
<input type="text" id="sex" class="input redondear" placeholder="Sexo">
<input type="text" id="birth-country" class="input redondear" placeholder="País de Origen">
<input type="url" id="user-photo" class="photo input redondear" placeholder="Ingrese el url de su foto">                  
<input id="email2" class="input redondear" type="email" placeholder="Ingrese su correo">
<input id="password2" class="input redondear" type="password" placeholder="Ingrese su contraseña"><br>
<input type="file" id="user-photo2" class="photo input redondear" placeholder="Ingrese su foto"><br>
<button type="button" class="button-acceder redondear boton" id="btn-sign-up">Registrar</button>
 </form>
  <div>
      <p class="parrafo">Si ya tienes una cuenta <a href="">Inicia sesión</a></p>
  </div>
</main>`;
  const registerClick = divElement.querySelector("#btn-sign-up");
  registerClick.addEventListener("click", signUpAfterClick);
  return divElement;
};





