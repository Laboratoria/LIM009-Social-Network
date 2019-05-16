import { signOutUser, createPostInCloudFirestore,getDataOfUser, deletePostAfterClick,editPostAfterClick } from "../controller/controller1.js" ;

const renderOnePost = (post, user) => { // {}
    let label = document.createElement('div');
    label.innerHTML = `
  <div id="comment-author" class='encabezado'>Publicado por ${user.name}</div>
  <div class="text-comment" id="content-comment-div" >${post.content}</div>
  <button class="fab fa-gratipay"></button>
  <button class="fas fa-paper-plane" id="btn-edit" data-uid-post="${post.userId}" data-id-post="${post.id}"></button>
  <button id="btn-save-after-edit">Save</button>  
  <button id="btn-delete" data-uidPost="${post.userId}"class="share boton">Eliminar</button>
 `;
    label.setAttribute('class', "box");
    label.setAttribute('data-id',`${post.id}`);

    const deleteButton = label.querySelector("#btn-delete");
    deleteButton.addEventListener('click',(e)=>{deletePostAfterClick(e)
    });

    
    const editButton = label.querySelector("#btn-edit");
    editButton.addEventListener('click',(e)=>{
       console.log(e);
        editPostAfterClick(e)});
    
    return label // que imprima una un post ,que se añada al ul element
};

export default (user, posts) => {
    let photoUrl = '';
    try {
        new URL(user.photo);
        photoUrl = user.photo;
    } catch (_) {
        photoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGjBhr15zxJ2Udj1pZ6S3ktJctBu51YukJOoetZc3VrKjxquwN";
    }

    console.log(photoUrl)
    const divElement = document.createElement("div");
    divElement.setAttribute("class", "container-view-profile");
    divElement.innerHTML = `
    <header class="header">
    <ul class="menu">
        <li class="small"><p>${user.name}</p>
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
        console.log(onePost);
        getDataOfUser(onePost.userId).then((userdata)=>{
            console.log((userdata.name));
            const divPost = renderOnePost(onePost,userdata);
        divCommentList.appendChild(divPost);
            });
        
    })


    return divElement;
};




//Creando una funcion que reciba  [{}]como parametro con sus propiedades id,authorName,content ...fecha