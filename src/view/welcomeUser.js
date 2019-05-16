import { logOut, createPost } from '../controller/view-controller.js';
import imagePost from '../lib/comple-firebase.js'
// import {createPost} from '../model/model.js'

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
      <select name="" id="estado-post" class = 'btn-post-create'>
      <option selected="true" disabled="disabled">Amigos</option>
      <option value="publico">Público</option>
      <option value="privado" select>Privado</option>
      </select>
        <button id ='btn-share' class='btn-post-create'>Compartir</button>
      </footer>
    </article>  
    
    <div id='post-list' class = 'margin-top'>
    </div>
    </div>
    </div>
    `;
    root.innerHTML = templateWelcome;
    const btnSignOut = document.querySelector('#sign-out');
    btnSignOut.addEventListener('click', logOut);
    const btnSharePost = document.querySelector('#btn-share');
    const constentPost = document.querySelector('#content-post');
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
    state.onchange = () => {
        console.log(state.value)
    }

    btnSharePost.addEventListener('click', () => {
        let selectImage = fileButton.files[0]
        let selectState = state.value;
        if (selectImage === undefined && selectState === 'Amigos') {
            createPost('publico', './image/image-post.png')
        } else if (selectState === 'publico' || selectState === 'privado' && selectImage === undefined) {
            createPost(selectState, './image/image-post.png')
        } else if (selectState === 'publico' || selectState === 'privado' && selectImage !== undefined) {
            const getImage = (image) => {
                // console.log(image)
                imagePostView.src = image
                createPost(selectState, image)

            }
            imagePost(selectImage, uploader, getImage)
        }
        else if (selectState === 'Amigos' && selectImage !== undefined) {
            const getImage = (image) => {
                // console.log(image)
                imagePostView.src = image
                createPost('publico', image)

            }
            imagePost(selectImage, uploader, getImage)
        }

    })

    // constentPost.addEventListener('change', (e) => {
    //     if (e.target.id === 'file-button') {
    //         const imagePostView = document.querySelector('#image-post-view');
    //         let file = e.target.files[0];
    //         const getImage = (image) => {
    //             // console.log(image)
    //             imagePostView.src = image
    //             createPost('publico', image)

    //         }
    //         imagePost(file, uploader, getImage)
    //     }
    // })
    // constentPost.addEventListener('change', (e) => {
    //     if (e.target.id === 'file-button') {
    //         const imagePostView = document.querySelector('#image-post-view');
    //         let file = e.target.files[0];
    //         const getImage = (image) => {
    //             console.log(image)
    //             imagePostView.src = image
    //             state.addEventListener('change', (e) => {
    //                 if (e.target.id === 'btn-share') {
    //                     btnSharePost.addEventListener('click', () => {
    //                         createPost(state.value, image)
    //                     })

    //                 }
    //             })
    //         }
    //         imagePost(file, uploader, getImage)
    //     } else if (e.target.id === 'estado-post') {
    //         btnSharePost.addEventListener('click', () => {
    //             createPost(state.value, './image/image-post.png')
    //         })
    //     } else {
    //         btnSharePost.addEventListener('click', () => {
    //             createPost('publico', './image/image-post.png')
    //         })
    //     }

    // })

    return root;
};


/*

 <form id= 'create-post'>
        <label>Crear una publicación</label>
        <input type = 'text' id = 'description' placeholder='¿Qué estás pensando?'></input>
        <button type = 'button' id ='btn-share'>Compartir</button>
    </form>
*/