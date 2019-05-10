import {  signOutUser } from "../controller/controller1.js"
export default (user) => {
    const divElement = document.createElement("div");
    divElement.setAttribute("class", "container-view-profile");
    divElement.innerHTML = `
<header class="header">
  <ul class="menu">
  <li class="small"><a>${user.name} ></a>
  <ul>
    <li><a>Configura tu cuenta</a></li>
    <li><a></a></li>
  </ul>
  </li>
  <li class="title"><h1> Breath Life </h1></li>
  <li id ="sign-out" class="small"><a>Cerrar sesión</a></li>
  </ul>
</header>
<div class="sub-container">
<aside class="user-name">
  <div class="imagen-fondo"><img class="image" src="./css/img/cell.jpj.jpg">
    <div class="element"><img class="image-photo" id="image-user"src="${user.photo}" >
      <div class="nombre"><h2 id="name-user">${user.name}</h2><p>${user.email}</p></div>
    </div>
  </div>
</aside>
<main class="post-zone">
<div id="add-comment-form" class="write-post box">
<input  id="input-comment"class="text-write" name="comment" type="text" placeholder="Escribe un comentario">
<img class="icon-photograph" src="./css/img/photo.png">
<button id="btn-share"class="share boton">Compartir</button>
</div>
<div id="comment-list" class="comment-post box">
    <div class="encabezado">Publicado por Mayte</div>
    <div class="text-comment"></div>
    <div class="like"><i class="fab fa-gratipay"></i>
    <i class="fas fa-paper-plane"></i></div>
    <button id="btn-delete"class="share boton">Eliminar</button></div>
</div>
</main>
</div>
`;
    //const shareBtn = divElement.querySelector("#btn-share");
    //shareBtn.addEventListener("click", addCommentToUserDoc);
    const signOutOption = divElement.querySelector("#sign-out");
    signOutOption.addEventListener("click", signOutUser);
    //activeUserObserver();

    return divElement;
};
