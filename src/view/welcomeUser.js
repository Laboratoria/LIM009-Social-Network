import { logOut, createPost } from '../controller/view-controller.js';
// import {createPost} from '../model/model.js'

export default (user) => {
    const root = document.getElementById('root')
    const templateWelcome = `
    <header>
        <ul class = 'header'>
            <li><a id='user-name' href='#'>${user.displayName}</a></li>
            <li><img src=""></li>
            <li><a id='sign-out'>Cerrar Sesión</a></li>
        </ul>
    </header>
    <div>
    <p>Nombre del usuario</p>
    <span>${user.displayName}</span>
    <p>E-mail</p>
    <span>${user.email}</span>
    <p>Foto</p>
    <img src='${user.photoURL}'>
    </div>
    <form id= 'create-post'>
        <label>Crear una publicación</label>
        <input type = 'text' id = 'description' placeholder='¿Qué estás pensando?'></input>
        <button type = 'button' id ='btn-share'>Compartir</button>
    </form>
    <li id='post-list'>
    </li>
    `;
    root.innerHTML = templateWelcome;
    const btnSignOut = document.querySelector('#sign-out');
    btnSignOut.addEventListener('click', logOut);
    const btnSharePost = document.querySelector('#btn-share');   
    btnSharePost.addEventListener('click', createPost);
    return root;
};
