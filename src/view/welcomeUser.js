import { logOut, createPost} from '../controller/view-controller.js';
// import {createPost} from '../model/model.js'

export default (user) => {
    const root = document.getElementById('root')
    const templateWelcome = `
    <header>
        <ul class = 'header'>
            <li><a href='#'>${user.displayName}</a></li>
            <li><img src='../src/image/logo.png'></li>
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
    <div>
    <p>Crear una publicación</p>
    <input id='description' type='text' placeholder='¿Qué estás pensando?'></input>
    <button type ='button' id ='btn-share'>Compartir</button>
    </div>
    `;
    root.innerHTML = templateWelcome;
    const btnSignOut = document.querySelector('#sign-out');
    btnSignOut.addEventListener('click', logOut);
    const btnSharePost = document.querySelector('#btn-share');
    btnSharePost.addEventListener('click', createPost);
    return root;
};
