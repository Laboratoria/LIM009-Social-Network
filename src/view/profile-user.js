import { signOutAll } from "../controller/controller1.js";
export default () => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "container-view-profile");
  divElement.innerHTML = `
<header class="header">
  <ul class="menu">
  <li class="small">
  <a>nose</a>
  </li>
  <li class="title"> 
    <h1>
    < Breath Life>
    </h1> 
  </li>
  <li class="small"><a href="" id ="sign-out">Cerrar sesión</a></li>
  </ul>
</header>
<div class="sub-container">
<aside class="user-name">
  <div class="imagen-fondo"><img class="image" src="./css/img/habitos.jpg">
    <div class="element"><img class="image-photo" src="./css/img/profile.png">
      <div class="nombre"><h2>Name</h2></div>
    </div>
  </div>
</aside>
<main class="post-zone">
  <div class="write-post box">
      <textarea class="text-write" name="" id="" cols="20" rows="10">¿Que quieres compartir?</textarea>
      <div><img class="icon-photograph" src="./css/img/photo.png">
      <button class="share boton">Compartir</button></div>
  </div>
  <div class="comment-post box">
      <textarea class="text-comment" name="" id="" cols="30" rows="10"></textarea>
      <i class="fab fa-gratipay"></i>
      <i class="fas fa-paper-plane"></i>
  </div>
</main>
</div>`;
const signOutAllPage = divElement.querySelector("#sign-out");
signOutAllPage.addEventListener("click", signOutAll );
  return divElement;
};
