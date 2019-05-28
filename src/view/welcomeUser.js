import { logOut } from '../controller/view-controller.js';
import { imageFirestore } from '../lib/comple-firebase.js';
import { createPost } from '../model/model.js';

export default (user) => {
  const root = document.getElementById('root');
  const templateWelcome = `
    <div class = 'col-12 height-100 '>
      <header>
          <ul class = 'header'>
              <li><a id = 'edit-perfil' href='#/edit-perfil' class = 'color-white'>${user.displayName}</a></li>
              <li> < Crianza Respetuosa > </li>
              <li><a id='sign-out'>Cerrar Sesión</a></li>
          </ul>
      </header>
      <div class = 'col-4 margin-top size-perfil'> 
          <div class='conte-flex-perfil color-perfil flex-xl-cont'>    
            <div class ='cont-flex-column'>
                  <img src='${user.photoURL}' class = 'img-perfil-aside'>    
              </div>    
              <div class='cont-flex-column cont-text-perfil'>                             
                  <h3>${user.email}</h3> 
              </div>  
          </div>    
      </div>
      <div id = 'post' class='col-7'>     
        <article id = 'content-post' class= 'flex-container margin-top'>               
          <header class='style-color-header flex-header-post color-head-pink'>
            <h3>Crear Publicación</h3>
          </header>      
          <section class='conte-flex-perfil style-cont-text-area'>
            <div class= 'cont-flex-column'>
              <img id='photo-post-user' src='${user.photoURL}' alt='feminismo' class='img-perfil-post'>
            </div>
            <div class= 'cont-flex-column'>      
              <textarea id = 'description' class="textarea" placeholder='¿Qué estás pensando,${user.displayName}?'></textarea>
            </div>     
          </section>
          <footer class = 'style-cont-text-area' id = 'foo-View'>
            <article class ='conte-flex-perfil style-color-header'>
              <div class ='size-btn-img'>        
                <img id='btn-image-post' src="./image/icons8-foto-64.png" alt="imagen-post" class='img-btn-post'>
                <button id='btn-phot-post'  class = 'border-white'>Foto<input type="file" value="upload" id="file-button" class='btn-file'/></button>
                <p value="0" max="100" id="uploader"></p>              
              </div>
              <div class ='size-btn-img'>        
                <img id='btn-image-post' src="./image/publico.png" alt="imagen-post" class='img-btn-post'>        
                <select name="" id="estado-post"  class = 'border-white btn-post'>       
                  <option value="publico" select>Público</option>
                  <option value="privado" select>Privado</option>
                </select>
              </div>
              <div class ='size-btn-img'>        
                <img  src="./image/publicar.png" alt="imagen-post" class='img-btn-post'>
                <button id ='btn-share' class = 'border-white btn-post'>Compartir</button>        
              </div>
            </article>      
          </footer>
          <div id = 'view-photo'>    
          </div>
        </article>     
        <article id='post-list' class = ''>    
        </article>
        <label class=''>Mis post :</label> 
        <article id='post-list-privados'></article>
      </div>
    </div>
    `;
  root.innerHTML = templateWelcome;
  const btnSignOut = document.querySelector('#sign-out');
  btnSignOut.addEventListener('click', logOut);
  const btnSharePost = document.querySelector('#btn-share');
  const btnPhotoPost = document.querySelector('#btn-phot-post');
  const state = document.querySelector('#estado-post');
  const uploader = document.querySelector('#uploader');
  const imagePostView = document.querySelector('#image-post-view');
  const fileButton = document.querySelector('#file-button');
  const viewPhoto = document.querySelector('#view-photo');

  fileButton.onchange = (e) => {
    let fr = new FileReader();
    fr.onload = () => {
      // imagePostView.src = fr.result;
    };
    fr.readAsDataURL(e.target.files[0]);
  };

  btnSharePost.addEventListener('click', () => {
    state.onchange = () => {
      console.log(state.value);
    };
    let fecha = new Date();
    let fechaPost = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
    let horaPost = `${fecha.getHours()}:${fecha.getMinutes()}`;
    let selectImage = fileButton.files[0];
    let selectState = state.value;
    let description = document.querySelector('#description').value;
    // console.log(selectImage);
    // console.log(selectState);
    // console.log(fechaPost, horaPost, selectImage, selectState, description, user.uid);
    if (selectImage === undefined) {
      // console.log('./image/image-post.png');
      createPost(selectState, './image/image-post.png', fechaPost, description, user.uid, horaPost);
    } else {
      const getImage = (image) => {
        // console.log(image);
        createPost(selectState, image, fechaPost, description, user.uid, horaPost);
      };
      imageFirestore(selectImage, uploader, getImage);
    }
  });
  return root;
};


