import { likesPost, getDataDoc, getPost, createCommentPost, deleteComment } from '../model/model.js'
import { editPost, deletePost } from '../model/model.js'
import formComent from '../view/coment-post.js';
import viewformComent from '../view/view-coment-post.js'

export default (doc, getUser, post, idUserAuth) => {
  const article = document.createElement('article');
  const li = `
  <article id = 'content-post' class= 'flex-container  margin-top border center'> 
    <div class = 'btn-post-edit-del'>
      <img id='photo-post-user' src='${getUser.data().photo}' alt='feminismo' class='img-perfil-post'>                
      <label id='name-user-post' class='center'>${getUser.data().name}</label> 
      <label id='fecha-post' class='center'>${post.fechaPost}-Hora:${post.horaPost}</label>  
      <img class ='img-perfil-post' src='./image/boton-cancelar.png' alt ='boton para eliminar' id='btn-delete-${doc.id}'>
    </div>    
    <section class='content-post'>     
      <img id='image-post-view' src='${post.image}' alt="imagen-post" class='img-post-prev'> 
      <textarea id = 'description-${doc.id}' class="textarea center">${post.description}</textarea>      
    </section>
    <footer class = 'margin-footer center'>
      <div class = 'style-content-post-img'>
        <button id ='btn-like-${doc.id}' class='btn-post-create'>${post.likes}👍</button>
        <img class ='img-perfil-post' src='./image/editar_lapiz.png' alt ='boton de editar' id='btn-edit-${doc.id}'>
        <img class ='img-perfil-post' src='./image/comentarios.png' id ='btn-coment-${doc.id}'>
        <select name="" id="estado-post-view-Post-${doc.id}" class = 'size-state-post btn-post-create'>
          <option  value="${post.state}"select>👥${post.state}</option>
          <option  value="publico">👥</option>
          <option  value="privado">🔐</option>
        </select>
        <div id = 'comment-form'></div>      
      </div >       
    </footer>
    <div id = 'cont-coment-${doc.id}'></div>
    <div id = 'comment-form-list-${doc.id}'></div>       
</article>  
    `
  article.innerHTML = li;
  let btnEdit = article.querySelector(`#btn-edit-${doc.id}`);
  btnEdit.addEventListener('click', () => {
    let editDescription = article.querySelector(`#description-${doc.id}`).value;
    const state = article.querySelector(`#estado-post-view-Post-${doc.id}`)
    state.onchange = () => {
      console.log(state.value)
    }
    if (post.user === idUserAuth.uid) {
      editPost(doc.id, editDescription, state.value);
      alert('Post editado correctamente');

    } else {
      alert('Permiso denegado para editar este post');
    }
    // postList.innerHTML = ''
  });
  let btnDelete = article.querySelector(`#btn-delete-${doc.id}`);
  btnDelete.addEventListener('click', () => {
    // console.log(post.user)
    // console.log(idUserAuth.uid)
    if (post.user === idUserAuth.uid) {
      alert('Post eliminado correctamente')
      deletePost(doc.id);
      // postList.innerHTML = ''
    } else {
      alert('Permiso denegado para eliminar este post')
    }
    // postList.innerHTML = ''
  })
  let btnLike = article.querySelector(`#btn-like-${doc.id}`)
  var listener = function (event) {
    let like = 0
    like = post.likes + 1
    likesPost(doc.id, like)
    // e.target.removeEventListener(e.type, likeEvent,);


  }
  btnLike.addEventListener('click', () => {
    listener()
    btnLike.removeEventListener('click', listener);
  })


  let btnComent = article.querySelector(`#btn-coment-${doc.id}`)
  const coment = article.querySelector(`#cont-coment-${doc.id}`)
  const contComentList = article.querySelector(`#comment-form-list-${doc.id}`)
  // console.log(coment)         

  /*Realiza click en el botón de comentar.Obtiene datos del usuario logeado y ID del post.
   muestra el formulario de comentar */
  
  btnComent.addEventListener('click', () => {
    getDataDoc(idUserAuth.uid).then(result => {
      //console.log(result.data())
      coment.innerHTML = formComent(doc.id, result)

      const textComentPost = document.querySelector(`#text-coment-post-${doc.id}`)
      const btnViewComentPost = document.querySelector(`#btn-coment-id-${doc.id}`)

      btnViewComentPost.addEventListener('click', () => {
        let fecha = new Date();
        let fechaPost = `Fecha: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}  hora: ${fecha.getHours()}:${fecha.getMinutes()} `;
        createCommentPost(doc.id, idUserAuth.uid, textComentPost.value, fechaPost)
        getPost(doc.id).onSnapshot(snapshot => {
          //console.log(snapshot.docs);
          contComentList.innerHTML = ''
          snapshot.forEach((result) => {
            //console.log(result.data());
             contComentList.appendChild(viewformComent(result, doc,idUserAuth))
             //doc es la data de cada post por lo tanto doc.id es el ID de cada post.
            //result es la data de cada comentario por lo tanto result.id es el ID de cada comentario.
          })
        })
      })

      getPost(doc.id).get().then(function (querySnapshot) {
        contComentList.innerHTML = ''
        querySnapshot.forEach(function (idPost) {
          contComentList.appendChild(viewformComent(idPost, doc,idUserAuth))
          // doc.data() is never undefined for query doc snapshots
          //console.log(idPost.id, " => ", idPost.data());
        });
      });
    })
  });

  return article
}