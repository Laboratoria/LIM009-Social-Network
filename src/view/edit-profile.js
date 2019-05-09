
export default (user) => {
    const divElement = document.createElement("div");
    divElement.setAttribute("class", "container");
    divElement.innerHTML = ` 
      <main class="right ancho">
      <h1> < Breath Life > </h1>
      <h3> Respira salud, respira vida </h3>
      <form action="" class="formulario acceder" id="register-form">
      <input type="name" id="name" class="Name input redondear" placeholder="">
      <input type="text" id="last-name" class="last-Name input redondear" placeholder="Apellidos">
      <input id="email2" class="input redondear" type="email" placeholder="Ingrese su correo">
      <input id="password2" class="input redondear" type="password" placeholder="Ingrese su contraseña">
      <button type="button" class="button-acceder redondear boton" id="btn-edit-profile">Editar Datos</button>
       </form>
      </main>`;
   
    return divElement;
  };
  