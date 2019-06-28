import { logIn, createUser, currentUs } from '../firebase.js';
import { errorLogin, errorRegister } from './error.js';
import { editFirestore, collectionUser, databasePost } from '../firestore.js'

export const changeHash = (hash) => {
    window.location.hash = hash;
}

export const logInFirebase = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    logIn(email, password)
    .then(() => {
        changeHash('#/post')
    })
    .catch(function (error) {
        const errorCode = error.code;
        const msmError = document.querySelector('#parrafo');
        msmError.innerHTML = errorLogin(errorCode);
    });
}

export const registerFirebase = () => {
    const nameUser = document.getElementById('username').value;
    const email = document.getElementById('email2').value;
    const password = document.getElementById('password2').value;
    createUser(email, password)
    .then((result) => {
        const objUser = {
            foto: '',
            name: nameUser,
            email: result.user.email,
            uid: result.user.uid
        }
        collectionUser(objUser)
        .then( () => {
            changeHash('#/post')
        })
        
    })

    .catch(function (error) {
        const errorCode = error.code;
        const msmError = document.querySelector('#parrafo2');
        msmError.innerHTML = errorRegister(errorCode);;
    });
}

export const postFirestore = (obj) => {
    const post = document.getElementById('post').value.trim();
    const estado = document.getElementById('estado').value;
    const error = document.getElementById('msmError')
    const fecha = new Date();

    let options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
    };

    if (post.length === 0 || estado.length === 0) {
        return error.innerHTML = 'Escribe tu post y/o elige el estado'
    }

    const dataUser = currentUs()
    const objPost = {
        post: post,
        uidUsuario: dataUser.uid,
        name: obj.name,
        privacidad: estado,
        weather: `${fecha.toLocaleDateString("es-ES", options)}`
    };
    databasePost(objPost)
    document.getElementById('post').value = '';
    document.getElementById('estado').value = '';

}

export const edit = (property, value, id) => {
    const objPost = {}
    objPost[property] = value

    editFirestore(id, objPost)
   
}

