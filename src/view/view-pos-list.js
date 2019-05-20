import { likesPost } from '../model/model.js'
export default (doc, getUser, post) => {
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
      <label id='fecha-post' class='center color-fecha'>${post.fechaPost}  hora: ${post.horaPost}</label>            
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

  return article
}