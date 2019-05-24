import { likesPost, getDataDoc, getComentPost, createCommentPost } from '../model/model.js'
import { editPost, deletePost } from '../model/model.js'
import formComent from '../view/coment-post.js';
import viewformComent from '../view/view-coment-post.js';


export default (doc, getUser, post, idUserAuth) => {
  const article = document.createElement('article');
  const li = `
  <article id = 'content-post' class= 'flex-container margin-top'>               
  <header class='style-color-header flex-header-post'>
  <img id='photo-post-user' src='${getUser.data().photo}' alt='feminismo' class='img-perfil-post'>  
  <div class='cont-flex-column'>  
  <div>  
  <label id='name-user-post' class=''>${getUser.data().name}</label> 
  </div>
  <div class = 'header-post'>
  <label id='fecha-post' class=''>${post.fechaPost}</label>
  <img id='photo-post-user' src='./image/state.png' alt='feminismo' class='icono'> 
  </div>  
  </div>
  </header>      
  <section class='conte-flex-perfil style-cont-text-area'>
  <div class= 'cont-flex-column'>
  <img id='image-post-view' src='${post.image}' alt="imagen-post" class='img-post-prev'>  
  </div>
  <div class= 'cont-flex-column'>       
  <textarea id = 'description' class="textarea" placeholder='¿Qué estás pensando,?'>${post.description}</textarea>
  </div>     
  </section>
  <footer class = 'style-cont-text-area' id = 'foo-View'>
    <article class ='conte-flex-perfil style-color-header'>    
    <div class ='size-view-pos-list'>        
    <img id='btn-image-post' src="./image/me-gusta.png" alt="imagen-post" class='img-btn-post'> 
    <button id ='btn-like-${doc.id}' class = 'border-white '>Me gusta</button>
    <div class = 'size-view-pos-list'>
    <select name="" id="estado-post"  class = ''>       
    <option value="publico" select>Público</option>
    <option value="privado" select>Privado</option>
    </select>
    </div>
    </div>
    <div class ='size-view-pos-list'>        
    <img  src="./image/comentarios.png" alt="imagen-post" class='img-btn-post'>
    <button id ='btn-coment-${doc.id}' class = 'border-white btn-post'>Comentar</button>        
    </div>
    </article>      
    <div class='header-post-btn-view'>
  <img class ='img-perfil-post' src='./image/editar_lapiz.png' alt ='boton de editar' id='btn-edit-${doc.id}'>
  <img class ='img-perfil-post' src='./image/boton-cancelar.png' alt ='boton para eliminar' id='btn-delete-${doc.id}'>
  </div>
  </footer>
  <div id = 'view-photo'>    
  </div>
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
  });

  let btnDelete = article.querySelector(`#btn-delete-${doc.id}`);
  btnDelete.addEventListener('click', () => {
    // console.log(post.user)
    // console.log(idUserAuth.uid)
    if (post.user === idUserAuth.uid) {
      alert('Post eliminado correctamente')
      deletePost(doc.id);
    } else {
      alert('Permiso denegado para eliminar este post')
    }
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
        // const formDescription = document.querySelector(`form-comment`);
        // formDescription.reset();
        // .then(result => {
        //   console.log(result)
        //   const formDescription = document.querySelector(`form-${result.id}`)
        //   formDescription.reset();
        // });
        getComentPost(doc.id).onSnapshot(snapshot => {
          //console.log(snapshot.docs);
          contComentList.innerHTML = ''
          snapshot.forEach((result) => {
            //console.log(result.data());
            contComentList.appendChild(viewformComent(result, doc, idUserAuth))
            //doc es la data de cada post por lo tanto doc.id es el ID de cada post.
            //result es la data de cada comentario por lo tanto result.id es el ID de cada comentario.
          })
        })
      })
      getComentPost(doc.id).get().then(querySnapshot => {
        contComentList.innerHTML = ''
        querySnapshot.forEach(idPost => {
          contComentList.appendChild(viewformComent(idPost, doc, idUserAuth))
          //console.log(idPost.id, " => ", idPost.data());
        });
      });
    })
  });

  return article
}


