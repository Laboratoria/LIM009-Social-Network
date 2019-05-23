import { getDataDoc, deleteComment } from '../model/model.js'

export default (com, doc,idUserAuth) => {
  const viewFormComent = document.createElement('form');

  const templateComent = `
      <div class= 'flex-container  margin-top  center'>    
        <div class = 'btn-post-edit-del'>
       <img class ='img-perfil-post' src='./image/editar.png' alt ='boton de editar' id='btn-edit-coment-${doc.id}-${com.id}'>
       <img class ='img-perfil-post' src='./image/boton-cancelar.png' alt ='boton para eliminar' id='btn-delete-coment-${doc.id}-${com.id}'>
       </div> 
        <header class='header-post'>       
        <img id='photo-coment-user' src='./image/icono-login-user.png' alt='feminismo' class='img-perfil-post'>                
        <label id='name-user-coment' class=''>nombre</label> 
        <label id='fecha-post' class='center color-fecha'>${com.data().fecha}</label>            
        </header>
        <section class='content-post'>      
        <textarea id = 'description' class="textarea-coment center">${com.data().comment}</textarea>           
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
  const nameComent = viewFormComent.querySelector('#name-user-coment')
  // const nameComent = viewFormComent.querySelector('#name-user-coment')
  // const nameComent = viewFormComent.querySelector('#name-user-coment')
  getDataDoc(com.data().user).then(result => {
    userPhotoComent.src = result.data().photo
    nameComent.innerHTML = result.data().name
  })
  console.log(doc.id,com.id);
  const btnDeleteComment = viewFormComent.querySelector(`#btn-delete-coment-${doc.id}-${com.id}`)
            btnDeleteComment.addEventListener('click',() => {
              //console.log(`${doc.id},${com.id}`)
              if (com.data().user === idUserAuth.uid) {
                alert('Comentario eliminado correctamente')
                deleteComment(doc.id, com.id);
                // postList.innerHTML = ''
              } else {
                alert('Permiso denegado para eliminar este comentario')
              }
              
            });
            
            //poner a la vista de comentario
            //console.log(result.id, " => ", result.data());
  return viewFormComent
}