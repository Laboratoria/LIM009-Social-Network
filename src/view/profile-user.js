import { signOutUser, createPostInCloudFirestore } from "../controller/controller1.js"
import { getOnePostInRealtime } from "../services/firebase.js"

export default (user) => {
    const divElement = document.createElement("div");
    divElement.setAttribute("class", "container-view-profile");
    divElement.innerHTML = `
<header class="header">
  <ul class="menu">
  <li class="small" ><a>${user.name} ></a></li>
  <li class="title"><h1>< Breath Life></h1></li>
  <li id ="sign-out" class="small"><a>Cerrar sesión</a></li>
  </ul>
</header>
<div class="sub-container">
<aside class="user-name">
  <div class="imagen-fondo"><img class="image" src="./css/img/habitos.jpg">
    <div class="element"><img class="image-photo" id="image-user"src="${user.photo}" >
      <div class="nombre"><h2 id="name-user">${user.name}</h2></div>
    </div>
  </div>
</aside>
<main class="post-zone">
<form id="add-comment-form" class="write-post box">
<input  id="input-comment"class="text-write" name="comment" type="text" placeholder="Escribe un comentario">
<div><img class="icon-photograph" src="./css/img/profile.png">
<button id="btn-share"class="share boton">Compartir</button></div>

</form>
<ul id="comment-list" class="comment-post box">
    <li>
    <div id="comment-author" >Publicado por Mayte</div>
    <div id="comment-content"class="text-comment">"Amo esta frase:Eres el error que estoy dispuesto a cometer"</div>
    <div><i class="fab fa-gratipay"></i>
    <i class="fas fa-paper-plane"></i>
    <button id="btn-delete"class="share boton">Eliminar</button>
    </div>
    
    </li>

</ul>
</main>
</div>
`;
    const shareBtn = divElement.querySelector("#btn-share");
    shareBtn.addEventListener("click", () => {
        createPostInCloudFirestore();
        getOnePostInRealtime(renderOnePost) // Primero se obtiene el arrOfOnePost [{}]
            //despues se le pasa como parametro al callback(renderOnePost) 
            //cuando se ejecuta el callback(renderOnePost) se imprime la info de un post

    });
    const signOutOption = divElement.querySelector("#sign-out");
    signOutOption.addEventListener("click", signOutUser);
    return divElement;
};


//Creando una funcion que reciba  [{}]como parametro con sus propiedades id,authorName,content ...fecha
const renderOnePost = (post) => { // [{}]
    const commentList = document.querySelector("#comment-list"); // elemento ul
    let li = document.createElement('li');
    li.innerHTML = ` 
  <div id="comment-author">${post[0].author}</div>
  <div id="comment-content" id="${post[0].id}" class="text-comment">${post[0].content}</div>
  <div>
  <i class="fab fa-gratipay"></i>
  <i class="fas fa-paper-plane"></i>
  <button id="btn-delete"class="share boton" id="${post[0].id}">Eliminar</button>
  </div>
 `;
    li.setAttribute('data-id', post[0].id);
    return commentList.appendChild(li); // que imprima una un post ,que se añada al ul element

};