import { signOut } from '../lib/index.js';

const content = document.getElementById('content')

const leaveSesion = () => {
    const string = `
    <p>Welcome </p>
    <button id="buttonLogOut">Cerrar sesión</button>
    `;
    const div = document.createElement('div')
    div.innerHTML = string;
    content.appendChild(div);
}

export const printInfoUser = (result) => {
    const user = result.user;
    const div = document.createElement('div')
    content.appendChild(div);
    console.log(user);

    if (user.photoURL) {
        div.innerHTML = `Hello ${user.displayName} <img src=${user.photoURL}>`;
    } else {
        div.innerHTML = `Hello ${user.displayName}`;
    }
};

export const showContent = user => {
    if (user) {
        leaveSesion();
    }

    const buttonLogOut = document.getElementById('buttonLogOut');
    buttonLogOut.addEventListener('click', signOut);
};