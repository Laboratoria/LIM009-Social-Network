import { signOutUser } from "../controller/controller1.js";
export default (user) => {
    const divElement = document.createElement("div");
    divElement.setAttribute("class", "container");
    divElement.innerHTML = ` 
    <header class="header">
    <ul class="menu">
        <li class="small"><input type="checkbox" name="list" id="nivel1-1"><label for="nivel1-1">${user.name}</label>
            <ul class="interior">
                <li><a href="#/configuration">Configurar cuenta</a></li>
                <li><a href="#/user-profile">Página de Inicio</a></li>
                <li><a id="sign-out-list" class="sign-out-list" href="#/privacity">Configuracion de la Privacidad</a></li>
            </ul>
        </li>
        <li class="title"><h1>Breath Life</h1></li>
        <li id="sign-out" class="small sign-out"><a>Cerrar sesión</a></li>
    </ul>
</header>
<main class="right ancho">
    <h3> Respira salud, respira vida </h3>
    <form action="" class="formulario acceder" id="register-form">
    <input type="name" id="full-name" class="Name input redondear" placeholder="Nombres y Apellidos" readonly="readonly">
    <input id="email" class="input redondear" type="email" placeholder="Ingrese su correo" readonly="readonly">
    <input id="password" class="input redondear" type="password" placeholder="Ingrese su contraseña" readonly="readonly">
    <button type="button" class="button-acceder redondear boton" id="btn-edit-profile">Editar Datos</button>
    <button type="button" class="button-acceder redondear boton" id="btn-save-profile">Guardar Datos</button>
     </form>
    </main>`;
    const signOutOption = divElement.querySelector("#sign-out");
    signOutOption.addEventListener("click", signOutUser);
   
    return divElement;
  };
  
