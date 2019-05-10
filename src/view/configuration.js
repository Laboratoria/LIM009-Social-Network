import {  signOutUser } from "../controller/controller1.js"


export default (user) => {
  const elemento = document.createElement("div");
 // elemento.setAttribute("class", "container");
  elemento.innerHTML = `
    <header class="header">
    <ul class="menu">
    <li class="small"><a class="name-list">${user.name}</a>
        <ul class="submenu">
          <li><a href="#/edita">Editar Perfil</a></li>
          <li><a>Configurar cuenta</a></li>
        </ul>
    </li>
    <li class="title"><h1>< Breath Life ></h1></li>
    <li id ="sign-out"><a>Cerrar sesión</a></li>
    </ul>
  </header>
<div class="sub-container">
<aside class="user-name">
</aside>
<main class="post-zone">
</main>
</div> `;
const signOutOption = divElement.querySelector("#sign-out");
signOutOption.addEventListener("click", signOutUser);

return elemento;
};
