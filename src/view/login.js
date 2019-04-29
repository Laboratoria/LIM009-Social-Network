/**
 * Crea el elemento del DOM de la cabecera
 */
//export default () => {
//

const print = () => {
  const dmostrar = document.getElementById("first-screen");
  const divContent = ` 
  <div>
    <aside class="left ancho">
      <img src="./css/img/day.jpg" alt="cargando imagen" class="img">
    </aside>
    <main class="right ancho">
      <form action="" class="formulario acceder">
      <h1>< BreathLife></h1>
      <h3> Respira salud, Respira vida </h3>
  
          <input id="email2" class="input redondear" type="email" placeholder="Ingrese su correo">
          <input id="contrasena2" class="input redondear" type="password" placeholder="Ingrese su contraseña">
          <button type="submit" class="button-acceder redondear" onclick="acceder()">Acceder</button>
      </form>
      <div>
          <p>O bien ingresa con...
          </p>
          <div class="iconos">
              <i class="fab fa-facebook-square"></i>
              <i class="fab fa-google"></i>
          </div>
          <p>¿No tienes una cuenta? <span>Resgístrate</span></p>
      </div>
    </main>
  </div>`;

  dmostrar.innerHTML = divContent;
};
print();


//};