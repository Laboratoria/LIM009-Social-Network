import { logOut, createPost } from '../controller/view-controller.js';
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
    <article class= 'flex-container  margin-top border center'>     
      <header class='header-post'> 
      <img id='photo-post-user' src='${user.photoURL}' alt='feminismo' class='img-perfil-post'>                
      <label id='name-user-post' class=''>${user.displayName} </label> 
      <label id='fecha-post' class='center'>hora</label>            
      </header>
      <section class='content-post'>
      <div class=''>
      <h2></h2> 
      <textarea id = 'description' class="textarea" placeholder='¿Qué estás pensando?'></textarea>            
          
      </div>        
      </section>
      <footer class = ''>
      <img id='image-post' src="./image/image-post.png" alt="imagen-post" class='img-post'> 
      <select name="" id="estado-post" class = 'btn-post-create'>
      <option selected="true" disabled="disabled">Elige una opción</option>
      <option value="publico">Público</option>
      <option value="privado" select>Privado</option>
      </select>
      <button id ='btn-share' class='btn-post-create'>Compartir</button>
      </footer>
    </article>  
    
    <li id='post-list' class = 'margin-top'>
    </li>
    </div>
    </div>
    `;
    root.innerHTML = templateWelcome;
    const btnSignOut = document.querySelector('#sign-out');
    btnSignOut.addEventListener('click', logOut);
    const btnSharePost = document.querySelector('#btn-share');
    const state = document.querySelector('#estado-post')
    state.addEventListener('change', () => {
        btnSharePost.addEventListener('click', () => {
            createPost(state.value)
        });

    })


    return root;
};


/*

 <form id= 'create-post'>
        <label>Crear una publicación</label>
        <input type = 'text' id = 'description' placeholder='¿Qué estás pensando?'></input>
        <button type = 'button' id ='btn-share'>Compartir</button>
    </form>
*/