import{addCommentToUserDoc } from "../controller/controller1.js"
export default () => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "container-view-profile");
  divElement.innerHTML = `
<header class="header">
  <ul class="menu">
  <li class="small" ><a href="">MAYTE SOUZA</a></li>
  <li class="title"><h1>< Breath Life></h1></li>
  <li class="small"><a href="">Cerrar sesión</a></li>
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
<form id="add-comment-form" class="write-post box">
<input  id="input-comment"class="text-write" name="comment" type="text" placeholder="Escribe un comentario">
<div><img class="icon-photograph" src="./css/img/photo.png">
<button id="btn-share"class="share boton">Compartir</button></div>

</form>
<ul id="comment-list" class="comment-post box">
    <li>
    <div >Publicado por Mayte</div>
    <div class="text-comment">"Amo esta frase:Eres el error que estoy dispuesto a cometer"</div>
    <div><i class="fab fa-gratipay"></i>
    <i class="fas fa-paper-plane"></i></div>
    <button id="btn-delete"class="share boton">Eliminar</button></div>
    </li>

</ul>
</main>
</div>
`;
const shareBtn= divElement.querySelector("#btn-share");
shareBtn.addEventListener("click", addCommentToUserDoc );
return divElement;
};


/*
const renderPosts = (doc) => {
  const commentList=document.querySelector("#comment-list"); // elemento ul
  let li = document.createElement('li');
  li.innerHTML=` 
  <div id="comment-author">Publicado por Mayte</div>
  <div id="comment" class="text-comment">"Amo esta frase:Eres el error que estoy dispuesto a cometer"</div>
  <div>
  <i class="fab fa-gratipay"></i>
  <i class="fas fa-paper-plane"></i>
  </div>`;
  li.setAttribute('data-id', doc.id);
  const author=document.querySelector('#comment-author');
  const comment=document.querySelector('#comment');
  author.setAttribute('data-name', doc.name);
  comment.setAttribute('data-comment', doc.id);
  comment.textContent = doc.data().comment;
  author.textContent = doc.data().name;
 return commentList.appendChild(li);

};*/
//CREANDO FUNCION PNARA QUE PAAREZCA UNA LISTA 
//Create element and render posts 


/*
//GETTING DATA FROM FIRESTORE
db.collection('Users').get().then((snapshot)=>{
  snapshot.doc.forEach((doc)=>{
  renderPosts(doc);
  })
  });*/

/*
  const commentList=document.querySelector("#comment-list");
  const form=document.querySelector("#add-comment-form");

  
  
//  saving data  // add a document  // add a property comment to the user document
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  db.collection('users').update({
    comment:form.comment.value,

  });
  form.comment.value="";
  
  
});*/
 