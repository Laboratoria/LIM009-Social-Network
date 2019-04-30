import { signInOnSubmit } from "../controller/controller1.js";
//Exportando loginView
const root=document.getElementById("root");
export default ()=>{
  const divElement = document.createElement("div");
  const loginView = `
    <aside class="left ancho">
      <img src="./css/img/day.jpg" alt="cargando imagen" class="img">
    </aside>
    <main class="right ancho">
      <form action="" class="formulario acceder">
      <h1>< BreathLife></h1>
      <h3> Respira salud, Respira vida </h3>
  
          <input id="email" class="input redondear" type="email" placeholder="Ingrese su correo">
          <input id="password" class="input redondear" type="password" placeholder="Ingrese su contraseña">
          <button type="submit" class="button-acceder redondear"  id="btn-sign-in">Acceder</button>
      </form>
      <div>
          <p>O bien ingresa con...</p>
          <div class="iconos">
              <i class="fab fa-facebook-square"></i>
              <i class="fab fa-google"></i>
          </div>
          <p>¿No tienes una cuenta? <span>Resgístrate</span></p>
      </div>
    </main>`;

divElement.setAttribute("class", "container");
divElement.innerHTML=loginView;


root.appendChild(divElement);
signInOnSubmit();

};



