import { getDataDoc, deleteComment, editComment } from '../model/model.js';

export default (com, doc, idUserAuth) => {
  const viewFormComent = document.createElement('form');

  const templateComent = `
    <div class= 'flex-container  margin-top  center'>    
      <div class = 'btn-post-edit-del'>
        ${(com.data().user === idUserAuth.uid) ? `<img class ='btn-options' src='./image/editar.png' alt ='boton de editar' id='btn-edit-coment-${doc.id}-${com.id}'/>` : ''}
        ${(com.data().user === idUserAuth.uid) ? `<img class ='btn-options' src='./image/boton-cancelar.png' alt ='boton para eliminar' id='btn-delete-coment-${doc.id}-${com.id}'>` : ''}
      </div> 
      <header class='header-post'>       
        <img id='photo-coment-user' src='./image/icono-login-user.png' alt='feminismo' class='img-perfil-post'>                
        <label id='name-user-coment' class=''>nombre</label> 
        <label id='fecha-post' class='center color-fecha'>${com.data().fecha}</label>            
      </header>
      <form id = 'form'class='content-post'>      
        <textarea id = 'description-${doc.id}-${com.id}' class="textarea-coment center">${com.data().comment}</textarea>           
       </form>
      <footer class = 'margin-footer center'>
         <div class = 'style-color-header style-content-post-img'>
         <button id ='btn-like' class='btn-post-create'>Like</button>
         <button id ='btn-love' class='btn-post-create'>Me encanta</button>           
      </footer>   
    </div>  
      
      `;
  viewFormComent.innerHTML = templateComent;
  const userPhotoComent = viewFormComent.querySelector('#photo-coment-user');
  const nameComment = viewFormComent.querySelector('#name-user-coment');
  getDataDoc(com.data().user).then(result => {
    userPhotoComent.src = result.data().photo;
    nameComment.innerHTML = result.data().name;
  });

  // console.log(doc.id, com.id);  
  if (com.data().user === idUserAuth.uid) {
    const btnDeleteComment = viewFormComent.querySelector(`#btn-delete-coment-${doc.id}-${com.id}`);
    btnDeleteComment.addEventListener('click', () => {
      deleteComment(doc.id, com.id);
      alert('Comentario eliminado correctamente');
    });
    const btnEditComment = viewFormComent.querySelector(`#btn-edit-coment-${doc.id}-${com.id}`);
    btnEditComment.addEventListener('click', () => {
      const editDescriptionComment = viewFormComent.querySelector(`#description-${doc.id}-${com.id}`).value;
      // console.log(editDescriptionComment);
      editComment(doc.id, com.id, editDescriptionComment);
      alert('Comentario editado correctamente');
    });
  }; 
  return viewFormComent;
};