import { signOutUser, createPostInCloudFirestore } from "../controller/controller1.js" ;

const renderOnePost = (post) => { // {}

    let label = document.createElement('div');
    label.innerHTML = `
  <div id="comment-author" class='encabezado'>Publicado por ${post.author}</div>
  <div id="${post.userId}" class="text-comment">${post.content}</div>
  <div class="icons-like">
      <i class="fab fa-gratipay"></i>
      <i class="fas fa-paper-plane"></i></div>
      <button id="${post.userId}" class="share boton">Eliminar</button>
 `;
    label.setAttribute('class', "box");
    return label // que imprima una un post ,que se añada al ul element
};

export default (user, posts) => {
    let photoUrl='';
    if(user.photo!==''||user.photo!==null){
        photoUrl=user.photo;

    }else{
        photoUrl= "../css/img/usuario.png";
    }
    console.log(photoUrl)
    const divElement = document.createElement("div");
    divElement.setAttribute("class", "container-view-profile");
    divElement.innerHTML = `
    <header class="header">
    <ul class="menu">
        <li class="small"><a>${user.name} ></a>
            <ul>
                <li><a>Configurar cuenta</a></li>
                <li><a>Editar Perfil</a></li>
            </ul>
        </li>
        <li class="title"><h1>Breath Life</h1></li>
        <li id="sign-out" class="small"><a>Cerrar sesión</a></li>
    </ul>
</header>
<div class="sub-container">
    <aside class="user-name">
        <div class="imagen-fondo"><img class="image"
                src="./css/img/cell.jpg">
            <div class="element"><img class="image-photo" id="image-user" src="${photoUrl}" alt="default photo">
                <div class="nombre"><h2 id="name-user">${user.name}</h2><p>${user.email}</p></div>
            </div>
        </div>
    </aside>
    <main class="post-zone">
        <div id="add-comment-form" class="write-post box">
            <textarea id="input-comment" class="text-write"
                name="comment" type="text" placeholder="Escribe un comentario"></textarea>
                <img class="icon-photograph"
                src="./css/img/6799.png_860.png">
            <button id="btn-share" class="share boton">Compartir</button></div>
        <div id="comment-list" >        
        </div>
    </main>
</div>
`;
//class="comment-post box"
    const divCommentList = divElement.querySelector("#comment-list");

    const shareBtn = divElement.querySelector("#btn-share");
    shareBtn.addEventListener("click", () => {
        createPostInCloudFirestore();
    });
    const signOutOption = divElement.querySelector("#sign-out");
    signOutOption.addEventListener("click", signOutUser);


    posts.forEach((onePost) => {
        const divPost = renderOnePost(onePost);
        divCommentList.appendChild(divPost);
    })


    return divElement;
};




//Creando una funcion que reciba  [{}]como parametro con sus propiedades id,authorName,content ...fecha