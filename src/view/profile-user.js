import {
    signOutUser,
    getDataOfUser,
    deletePostAfterClick,
    editPostInCloudFireStore,
    handleFileUploadSubmit,
} from "../controller/controller1.js";

const renderOnePost = (post, user, current) => {
    let label = document.createElement('div');
    label.innerHTML = `
  <div id="comment-author" class='encabezado'>
  <img src="./css/img/error.png" id="btn-delete" class="delete" data-uid-post="${post.userId}" data-id-post="${post.id}">
  <p>Publicado por ${user.name}</p>
  <p>${post.hours}, ${post.today}</p> 
</div>
 

  <div class="text-comment height-auto" id="content-comment-div" data-id-post="${post.id}" >${post.content}
  <img class="img-post" src="${post.photoPost}" id="img-post" >
  </div>
  <img src="./css/img/like-1.png" class="icons like"id="btn-likes" alt="icon like">
  <span id="counter-likes">${post.likes}</span>
  <img src="./css/img/paper-plane-1.png" class="icons edit" alt="icon edit" id="btn-edit" data-uid-post="${post.userId}" data-id-post="${post.id}">
  <button id="btn-save-after-edit" class="boton share">Guardar</button>
  `;

    label.setAttribute('class', "box2 height-auto");

    if (post.photoPost === '' || post.photoPost === null) {
        label.querySelector('#img-post').style.display = 'none';
    }
    const deleteButton = label.querySelector("#btn-delete");
    deleteButton.addEventListener('click', (e) => {
        console.log(e.target)
        const postId = e.target.dataset.idPost;
        const userIdOfPost = e.target.dataset.uidPost;
        deletePostAfterClick(postId, userIdOfPost);
    });

    const divCommentContent = label.querySelector("#content-comment-div");
    const editButton = label.querySelector("#btn-edit");
    editButton.addEventListener('click', (e) => {
        const idPostAttributeOfDivContent = divCommentContent.dataset.idPost;
        const idPostAttributeOfEditButton = e.target.dataset.idPost;
        const userIdAttributeOfEditButton = e.target.dataset.uidPost;
        if (idPostAttributeOfDivContent === idPostAttributeOfEditButton) { //si el id del post del div content es  igual al id del post que quiere modificar
            if (current.userId === userIdAttributeOfEditButton) { // si el id del usuario actual es igual al id del usuario que publico el post
                divCommentContent.setAttribute("contenteditable", true);
                console.log("You can edit now");
                const saveBtn = label.querySelector("#btn-save-after-edit");
                saveBtn.addEventListener('click', () => {
                    divCommentContent.setAttribute("contenteditable", false);
                    const newContent = (divCommentContent.textContent);
                    editPostInCloudFireStore(idPostAttributeOfEditButton, userIdAttributeOfEditButton, newContent);
                });

            } else {
                alert("You can not edit a comment which was not published by you");
                divCommentContent.setAttribute("contenteditable", false);
            }
        } else {
            divCommentContent.setAttribute("contenteditable", false);
        }
    });

    return label
}

export default (user, posts) => {
    let photoUrl = '';
    try {
        new URL(user.photo);
        photoUrl = user.photo;
    } catch {
        photoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGjBhr15zxJ2Udj1pZ6S3ktJctBu51YukJOoetZc3VrKjxquwN";
    }
    const divElement = document.createElement("div");
    divElement.setAttribute("class", "container-view-profile");
    divElement.innerHTML = `
    <header class="header height-auto">
    <ul class="menu">
        <li class="small"><input type="checkbox" name="list" id="nivel1-1"><label for="nivel1-1">${user.name}</label>
            <ul class="interior">
                <li><a href="#/configuration">Configurar cuenta</a></li>
                <li><a href="#/edit-profile">Editar Perfil</a></li>
                <li><a id="sign-out-list" class="sign-out-list" href="#/privacity">Configuracion de la Privacidad</a></li>
            </ul>
        </li>
        <li class="title"><h1>Breath Life</h1></li>
        <li id="sign-out" class="small sign-out"><a><img class="icons cerrar" src="./css/img/exit-2.png">Cerrar sesión</a></li>
    </ul>
</header>
<div class="sub-container height-auto">
    <aside class="user-name height-auto">
        <div class="imagen-fondo"><img class="image" src="./css/img/cell.jpg">
            <div class="element"><img class="image-photo" id="image-user" src="${photoUrl}" alt="default photo">
                <div class="nombre"><h2 id="name-user">${user.name}</h2><p>${user.email}</p></div>
            </div>
        </div>
    </aside>
    <main class="post-zone height-auto">
        <div id="add-comment-form" class="write-post box height-auto">
            <textarea id="input-comment" class="text-write height-auto"
                name="comment" type="text" placeholder="Escribe un comentario"></textarea>
                <input type="file" id="image-file" class="inputfile"><img class="icon-photograph" src="./css/img/6799.png_860.png">          
        
                <fieldset class="privacity"><legend>¿Desea que sea público?</legend><input type="checkbox" id="private" value="true"><label for="private">No,solo para mi</label></fieldset>
            <button id="btn-share" class="share boton">Compartir</button></div>          
    <div class="filter height-auto" id="valores"><fieldset>
 <legend>¿Que publicaciones desea ver?</legend>
<input type="radio" class='input-filter' name="filterPost" id="allPost" checked value="publicPost"><label for="allPost">Todas</label>
<input type="radio" class='input-filter' name="filterPost" id="privatePost" value="myPosts"><label for="privatePost">Solo mías</label>
</fieldset></div>
        <div id="comment-list"></div>
    </main>
</div>
`;
    /*                 <progress value="0" max="100" id="uploader">0%</progress>       */
    let selectedFile;
    const inputFile = divElement.querySelector("#image-file");
    inputFile.addEventListener('change',
        (e) => {

            if (inputFile.value !== "") {
                console.log("file selected!!");
                selectedFile = e.target.files[0];

            }

        });

    const shareBtn = divElement.querySelector("#btn-share");
    //const btnPublic= divElement.querySelector("#allPost");
    shareBtn.addEventListener("click", () => {

        // const uploaderProgress = divElement.querySelector("#uploader");
        const inputComment = divElement.querySelector("#input-comment").value;
        const inputStatus = divElement.querySelector('#private').checked;
        let status;
        if (inputStatus) {
            status = true;
        } else {
            status = false;
        }
        return handleFileUploadSubmit(inputComment, user.userId, status, /* uploaderProgress, */ selectedFile);
    });
    const signOutOption = divElement.querySelector("#sign-out");
    signOutOption.addEventListener("click", signOutUser);

    const divCommentList = divElement.querySelector("#comment-list");

    const validar = () => {
        const e = divElement.querySelector('#privatePost');
        try {
            if (e.checked == true) {
                return 'myPosts';
            } else if (e.checked == false) {
                return 'publicPost';
            }
        } catch (err) {
            return 'publicPost';
        }
    };

    const estadosDePosts = (posts, user) => {
        switch (validar()) {
            case 'publicPost':
                posts.forEach((onePost) => {
                    if (onePost.state === false) {
                        getDataOfUser(onePost.userId)
                            .then((userdata) => {
                                const divPost = renderOnePost(onePost, userdata, user);
                                divCommentList.appendChild(divPost);
                            })
                    }
                });
                break
            case 'myPosts':
                posts.forEach((onePost) => {
                    getDataOfUser(onePost.userId)
                        .then((userdata) => {
                            if (userdata.userId === user.userId) {
                                const divPost = renderOnePost(onePost, userdata, user);
                                divCommentList.appendChild(divPost);
                            }
                        })
                });
                break
        }
    };

    const viewComments = divElement.querySelector('#valores');
    viewComments.addEventListener("click", () => {
        console.log(validar());
        divCommentList.innerHTML = '';
        estadosDePosts(posts, user);
    });


    estadosDePosts(posts, user);
    return divElement;
};