// import {signOut} from '../lib/lib-firebase.js'
 
export default (user) => {
    const root = document.getElementById('root')
    const templateWelcome = `
    <div>
    <p>Nombre del usuario</p>
    <span>${user.displayName}</span>
    <p>E-mail</p>
    <span>${user.email}</span>
    <p>Foto</p>
    <img src='${user.photoURL}'>
    </div>
    `;
root.innerHTML = templateWelcome;
return root;
};










