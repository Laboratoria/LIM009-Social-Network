import { signOutUser, createPostInCloudFirestore,getDataOfUser, deletePostAfterClick,/*editPostAfterClick*/ } from "../controller/controller1.js" ;
import {currentUser,editPostInCloudFireStore,} from "../services/firebase.js";

const renderOnePost = (post, user) => { // {}
    let label = document.createElement('div');
    label.innerHTML = `
  <div id="comment-author" class='encabezado'>Publicado por ${user.name}</div>
  <div class="text-comment" id="content-comment-div" data-id-post="${post.id}">${post.content}</div>
  <button class="fab fa-gratipay"></button>
  <button class="fas fa-paper-plane" id="btn-edit" data-uid-post="${post.userId}" data-id-post="${post.id}" ></button>
  <button id="btn-save-after-edit">Save</button>
  <button id="btn-delete" data-uid-post="${post.userId}" data-id-post="${post.id}"class="share boton">Eliminar</button>
 `;
    label.setAttribute('class', "box");
    label.setAttribute('data-id',`${post.id}`);

    const deleteButton = label.querySelector("#btn-delete");
    deleteButton.addEventListener('click',(e)=>{deletePostAfterClick(e)
    });

    const divCommentContent = label.querySelector("#content-comment-div");
     const idPostAttributeOfDivContent=divCommentContent.dataset.idPost;
    const editButton = label.querySelector("#btn-edit");
    editButton.addEventListener('click',(e)=>{
        console.log(idPostAttributeOfDivContent);
        const idPostAttributeOfEditButton=e.target.dataset.idPost;
        const userIdAttributeOfEditButton=e.target.dataset.uidPost;
        console.log(idPostAttributeOfEditButton);
        if(idPostAttributeOfDivContent===idPostAttributeOfEditButton){ //si el id del post del div content es  igual al id del post que quiere modificar
            if(currentUser().uid===userIdAttributeOfEditButton){ // si el id del usuario actual es igual al id del usuario que publico el post
                divCommentContent.setAttribute("contenteditable",true);
                console.log("You can edit now");
                const saveBtn=label.querySelector("#btn-save-after-edit");
                saveBtn.addEventListener('click',()=>{
                    divCommentContent.setAttribute("contenteditable",false);
                    const newContent=(divCommentContent.textContent);
                    console.log(newContent);
                    editPostInCloudFireStore(idPostAttributeOfEditButton,userIdAttributeOfEditButton,newContent);
                });

            }else{
                alert("You can not edit a comment which was not published by you");
                divCommentContent.setAttribute("contenteditable",false);

            }

        }else{
            divCommentContent.setAttribute("contenteditable",false);

        }
       
    });
    
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
        <li class="small"><input type="checkbox" name="list" id="nivel1-1"><label for="nivel1-1">${user.name}</label>
            <ul class="interior">
                <li><a href="#/configuration">Configurar cuenta</a></li>
                <li><a href="#/edit-profile">Editar Perfil</a></li>
                <li><a id="sign-out-list" class="sign-out-list" href="#/privacity">Configuracion de la Privacidad</a></li>
            </ul>
        </li>
        <li class="title"><h1>Breath Life</h1></li>
        <li id="sign-out" class="small sign-out"><a>Cerrar sesión</a></li>
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
        getDataOfUser(onePost.userId).then((userdata) => {
            console.log((userdata.name));
            const divPost = renderOnePost(onePost, userdata);
            divCommentList.appendChild(divPost);
        });

    })
    return divElement;
};




//Creando una funcion que reciba  [{}]como parametro con sus propiedades id,authorName,content ...fecha
