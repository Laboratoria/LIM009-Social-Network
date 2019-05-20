import { likesPost, getDataDoc, getPost, createComentPost } from '../model/model.js'
import { editPost, deletePost } from '../controller/view-controller.js'
import formComent from '../view/coment-post.js';
import viewformComent from '../view/view-coment-post.js'
export default (doc, getUser, post, idUserAuth) => {
  const article = document.createElement('article');
  const li = `
    <article id = 'content-post' class= 'flex-container  margin-top border center'> 
    <div class = 'btn-post-edit-del'>
    <img class ='img-perfil-post' src='./image/editar.png' alt ='boton de editar' id='btn-edit-${doc.id}'>
    <img class ='img-perfil-post' src='./image/boton-cancelar.png' alt ='boton para eliminar' id='btn-delete-${doc.id}'>
    </div>    
      <header class='header-post'>       
      <img id='photo-post-user' src='${getUser.data().photo}' alt='feminismo' class='img-perfil-post'>                
      <label id='name-user-post' class=''>${getUser.data().name}</label> 
      <label id='fecha-post' class='center color-fecha'>${post.fechaPost}-Hora: ${post.horaPost}</label>            
      </header>
       
      <select name="" id="estado-post-view-Post-${doc.id}" class = 'size-state-post btn-post-create'>
      <option  value="${post.state}" class='color-fecha' select>👥${post.state}</option>
      <option  value="publico">Público</option>
      <option  value="privado">Privado</option>
      </select>
      <section class='content-post'>     
      <img id='image-post-view' src='${post.image}' alt="imagen-post" class='img-post-prev'> 
      <textarea id = 'description-${doc.id}' class="textarea center">${post.description}</textarea>      
      </section>
      <footer class = 'margin-footer center'>
      <div class = 'style-color-header style-content-post-img'>
      <button id ='btn-like-${doc.id}' class='btn-post-create'>Like</button>
      <button id ='btn-love' class='btn-post-create'>Me encanta</button>
      <button id ='btn-coment-${doc.id}' class='btn-post-create'>Comentar</button> 
      <div id = 'comment-form'></div>      
      </div >       
      </footer>
      <div id = 'cont-coment-${doc.id}'></div>
      <div id = 'comment-form-list-${doc.id}'>        
      </div>       
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

  btnLike.addEventListener('click', () => {
    let like = 0
    like = post.likes + 1
    likesPost(doc.id, like)
    console.log(like)
    // postList.innerHTML = ''
  })
  let btnComent = article.querySelector(`#btn-coment-${doc.id}`)
  const coment = article.querySelector(`#cont-coment-${doc.id}`)
  const contComentList = article.querySelector(`#comment-form-list-${doc.id}`)
  // console.log(coment)         

  btnComent.addEventListener('click', () => {
    getDataDoc(idUserAuth.uid).then(result => {
      console.log(result.data())
      coment.innerHTML = formComent(doc.id, result)


      const textComentPost = document.querySelector(`#text-coment-post-${doc.id}`)
      const btnViewComentPost = document.querySelector(`#btn-coment-id-${doc.id}`)

      btnViewComentPost.addEventListener('click', () => {
        let fecha = new Date();
        let fechaPost = `Fecha: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}  hora: ${fecha.getHours()}:${fecha.getMinutes()} `;
        createComentPost(doc, idUserAuth.uid, textComentPost.value, fechaPost)
        getPost(doc).onSnapshot(snapshot => {
          contComentList.innerHTML = ''
          snapshot.forEach(function (result) {
            console.log(result.id, " => ", result.data());
            contComentList.appendChild(viewformComent(result.data()))
          })

        })
      })

      getPost(doc).get().then(function (querySnapshot) {
        contComentList.innerHTML = ''
        querySnapshot.forEach(function (idPost) {
          contComentList.appendChild(viewformComent(idPost.data()))
          // doc.data() is never undefined for query doc snapshots
          console.log(idPost.id, " => ", idPost.data());
        });
      });
    })
  })

  return article
}