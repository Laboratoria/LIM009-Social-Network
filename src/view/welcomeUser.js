import { logOut } from '../controller/view-controller.js';
import { imageFirestore } from '../lib/comple-firebase.js'
import { createPost } from '../model/model.js'

export default (user) => {
    const root = document.getElementById('root')
    const templateWelcome = `
    <div class = 'col-12'>
    <header>
        <ul class = 'header'>
            <li><a id = 'edit-perfil' href='#/edit-perfil'>${user.displayName}</a></li>
            <li><img src=""></li>
            <li><a id='sign-out'>Cerrar Sesión</a></li>
        </ul>
    </header>
    <div class = 'col-4'>       
    <p>Nombre del usuario</p>
    <span id='user-name'>${user.displayName}</span>
    <p>E-mail</p>
    <span>${user.email}</span>
    <p>Foto</p>
    <img src='${user.photoURL}'> 
    <div class = 'color-menu-post center'>
    <button id ='btn-view-post-public' class='btn-post-create'>Ver todos los post</button>
    <button id ='btn-view-post-privad' class='btn-post-create'>Mis Post</button>
    </div>  
    </div>
    <div id = 'post' class='col-7 col-xs-12 center'>     
    <article id = 'content-post' class= 'flex-container  margin-top border center'>     
      <header class='header-post'>         
        <img id='photo-post-user' src='${user.photoURL}' alt='feminismo' class='img-perfil-post'>                
        <label id='name-user-post' class=''>${user.displayName} </label> 
        <span id = 'user-id' class = 'opacity' >${user.uid}</span>
        <label id='fecha-post' class='center'></label>            
      </header>
      <section class='content-post'> 
      <div>    
      <img id='image-post-view' src="./image/image-post.png" alt="imagen-post" class='img-post-prev'> 
      <textarea id = 'description' class="textarea" placeholder='¿Qué estás pensando?'></textarea>
      </div>      
      </section>
      <footer class = 'margin-footer' id = 'foo-View'>
      <div class = 'style-color-header style-content-post-img'>
      <progress value="0" max="100" id="uploader" class = 'progress'>0%</progress>
      <input type="file" value="upload" id="file-button" class='btn-image-post'/>        
      </div >       
      <select id="estado-post" class = 'btn-post-create'>
      <option value="publico" select>Público</option>
      <option value="privado" >Privado</option>
      </select>
        <button id ='btn-share' class='btn-post-create'>🌎Compartir</button>
      </footer>
    </article>  
    
    <article id='post-list' class = 'margin-top'>    
    </article>
    <label class='center color-fecha'>Mis post :</label> 
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


    fileButton.onchange = (e) => {
        const imagePostView = document.querySelector('#image-post-view');
        let fr = new FileReader();
        fr.onload = () => {
            imagePostView.src = fr.result;
        };
        fr.readAsDataURL(e.target.files[0]);
    }


    btnSharePost.addEventListener('click', () => {
        state.onchange = () => {
            console.log(state.value)
        }
        let fecha = new Date();
        let fechaPost = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        let horaPost = `${fecha.getHours()}:${fecha.getMinutes()}`
        let selectImage = fileButton.files[0]
        let selectState = state.value;
        let description = document.querySelector('#description').value;
        let userID = document.querySelector('#user-id').textContent;



        if(selectImage === undefined && selectState === 'publico') {
            createPost('publico', './image/image-post.png', fechaPost, description, userID, horaPost)
        } else if(selectState === 'publico' || selectState === 'privado' && selectImage === undefined ) {
            createPost(selectState, './image/image-post.png', fechaPost, description, userID, horaPost)
        } else if(selectState === 'publico' || selectState === 'privado' && selectImage !== undefined) {
            const getImage = (image) => {
                //console.log(image)
                imagePostView.src = image
                createPost(selectState, image, fechaPost, description, userID, horaPost)
            }
            imageFirestore(selectImage, uploader, getImage)
        } else {
            createPost('publico', './image/image-post.png', fechaPost, description, userID, horaPost)   
        }
        // if (selectImage === undefined && selectState === 'publico') {
        //     createPost('publico', './image/image-post.png', fechaPost, description, userID, horaPost)             
        // } else if (selectState === 'publico' || selectState === 'privado' && selectImage === undefined) {
        //     createPost(selectState, './image/image-post.png', fechaPost, description, userID, horaPost)
        // } else if  (selectState === 'publico' || selectState === 'privado' && selectImage !== undefined) {
        //     const getImage = (image) => {
        //         // console.log(image)
        //         imagePostView.src = image
        //         createPost(selectState, image, fechaPost, description, userID, horaPost)
        //     }
        //     imageFirestore(selectImage, uploader, getImage)
        // } else if (selectState === 'publico' && selectImage !== undefined) {
        //     const getImage = (image) => {
        //         // console.log(image)
        //         imagePostView.src = image
        //         createPost('publico', image, fechaPost, description, userID, horaPost)
        //     }
        //     imageFirestore(selectImage, uploader, getImage)
        // }

    });
    return root;
};


