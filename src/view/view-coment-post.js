import { getDataDoc } from '../model/model.js'
import { deleteComment } from '../controller/view-controller.js'
export default (comment, doc, idUserAuth) => {
  const viewFormComent = document.createElement('form');

  const templateComent = `
      <div class= 'flex-container  margin-top  center'>    
        <div class = 'btn-post-edit-del'>
       <img class ='img-perfil-post' src='./image/editar.png' alt ='boton de editar' id='btn-edit-coment-${doc.id}'>
       <img class ='img-perfil-post' src='./image/boton-cancelar.png' alt ='boton para eliminar' id='btn-delete-coment-${doc.id}'>
       </div> 
        <header class='header-post'>       
        <img id='photo-coment-user' src='./image/icono-login-user.png' alt='feminismo' class='img-perfil-post'>                
        <label id='name-user-coment' class=''>nombre</label> 
        <label id='fecha-post' class='center color-fecha'>${comment.data().fecha}</label>            
        </header>
        <section class='content-post'>      
        <textarea id = 'description' class="textarea-coment center">${comment.data().comment}</textarea>           
        </section>
        <footer class = 'margin-footer center'>
        <div class = 'style-color-header style-content-post-img'>
        <button id ='btn-like' class='btn-post-create'>Like</button>
        <button id ='btn-love' class='btn-post-create'>Me encanta</button>           
        </footer>   
        </div>  
      
      `;
  viewFormComent.innerHTML = templateComent;
  const userPhotoComent = viewFormComent.querySelector('#photo-coment-user')
  const nameComment = viewFormComent.querySelector('#name-user-coment')
  const deleteCommentEvent = viewFormComent.querySelector(`#btn-delete-coment-${doc.id}`)
  const editComment = viewFormComent.querySelector(`#btn-edit-coment-${doc.id}`)
  getDataDoc(comment.data().user).then(result => {
    userPhotoComent.src = result.data().photo
    nameComment.innerHTML = result.data().name
  })
  deleteCommentEvent.addEventListener('click', () => {
    deleteComment(doc, comment.id)
  })
  return viewFormComent
}