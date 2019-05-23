import { logOut } from '../controller/view-controller.js';
import { imageFirestore } from '../lib/comple-firebase.js'
import { createPost } from '../model/model.js'

export default (user) => {
    const root = document.getElementById('root')
    const templateWelcome = `
    <div class = 'col-12 '>
    <header>
        <ul class = 'header'>
            <li><a id = 'edit-perfil' href='#/edit-perfil'>${user.displayName}</a></li>
            <li> < Crianza Respetuosa > </li>
            <li><a id='sign-out'>Cerrar Sesión</a></li>
        </ul>
    </header>
    <div class = 'col-4 margin-top size-perfil'> 
        <div class='conte-flex-perfil color-perfil'>    
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
      <header class='style-color-header flex-header-post'>
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
      <section class=''>     
      <span id = 'user-id' class = '' ></span>                
      </section>
      <img id='image-post-view' src="./image/image-post.png" alt="imagen-post" class='img-post-prev'> 
      <div class = ' style-content-post-img'>
      <progress value="0" max="100" id="uploader" class = 'progress'>0%</progress>
      <input type="file" value="upload" id="file-button" class='btn-image-post'/>        
      </div >       
      <select name="" id="estado-post" class = 'btn-post-create'>
      <option selected="true" disabled="disabled">Amigos</option>
      <option value="publico">Público</option>
      <option value="privado" select>Privado</option>
      </select>
        <button id ='btn-share' class=''>Compartir</button>
      </footer>
    </article>  
    
    <article id='post-list' class = ''>    
    </article>
    <label class=''>Mis post :</label> 
    <article id='post-list-privados'>
     
    </article>
    </div>
    </div>
    `;
    root.innerHTML = templateWelcome;
    const btnSignOut = document.querySelector('#sign-out');
    btnSignOut.addEventListener('click', logOut);
    const btnSharePost = document.querySelector('#btn-share');
    const contentPost = document.querySelector('#content-post');
    const imagePostView = document.querySelector('#image-post-view');
    const state = document.querySelector('#estado-post')
    const uploader = document.querySelector('#uploader');
    const fileButton = document.querySelector('#file-button');
    const fooView = document.querySelector('foo-View');

    console.log(user.uid)
    fileButton.onchange = (e) => {
        const imagePostView = document.querySelector('#image-post-view');
        let fr = new FileReader();
        fr.onload = () => {
            imagePostView.src = fr.result;
        };
        fr.readAsDataURL(e.target.files[0]);
    }
    state.onchange = () => {
        console.log('holaaaaaaaaa')
    }

    btnSharePost.addEventListener('click', () => {
        let fecha = new Date();
        let fechaPost = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        let horaPost = `${fecha.getHours()}:${fecha.getMinutes()}`
        let selectImage = fileButton.files[0]
        let selectState = state.value;
        let description = document.querySelector('#description').value;

        console.log(fechaPost, horaPost, selectImage, selectState, description, user.uid)
        if (selectImage === undefined && selectState === 'Amigos') {
            createPost('publico', './image/image-post.png', fechaPost, description, user.uid, horaPost)
        } else if (selectState === 'publico' || selectState === 'privado' && selectImage === undefined) {
            createPost(selectState, './image/image-post.png', fechaPost, description, user.uid, horaPost)
        } else if (selectState === 'publico' || selectState === 'privado' && selectImage !== undefined) {
            const getImage = (image) => {
                console.log(image)
                imagePostView.src = image
                createPost(selectState, image, fechaPost, description, user.uid, horaPost)

            }
            imageFirestore(selectImage, uploader, getImage)
        }
        else if (selectState === 'Amigos' && selectImage !== undefined) {
            const getImage = (image) => {
                console.log(image)
                imagePostView.src = image
                createPost('publico', image, fechaPost, description, user.uid, horaPost)
            }
            imageFirestore(selectImage, uploader, getImage)
        }
    })



    return root;
};


