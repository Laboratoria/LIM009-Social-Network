import { logInFirebase, changeHash } from '../View_Controler.js/view-Controle.js'
import { logInGoogle } from '../firebase.js'
import { collectionUser } from '../firestore.js'

export default () => {
    const newDiv = document.createElement('div');
    newDiv.className='container_home'
    const viewLogIn = `
    <div class='divHome'><img id="imgHome" src="http://www.formulaenlosnegocios.com.mx/wp-content/uploads/2016/06/SUSTENTABILIDAD-2.gif" alt="Environment"></div>
   
    <form class="formLogIn">
        <h1 class="form_titulo">GREEN<img class='green' src="img/green.png"></h1>
        <h3 class = 'form_subtitulo'>¡Bienvenido(a)!</h3>
        <p id='parrafo'></p>
        <input id = 'email' type= 'email' class= 'form_input' placeholder='email'>
        <input id = 'password' type= 'password' class= 'form_input' placeholder='password'>
        <button id= 'button' type= 'button' class= 'form_button'>Log in</button>
        <p class = 'form_parrafo'>También puedes ingresar con: </p>
        <img id ='google' src="img/busqueda.png">
        <p class= 'p_register'>¿No tienes una cuenta? <a href="#/register" id ='registrar'>Regístrate</a></p>
    </form>`

    newDiv.innerHTML = viewLogIn;
    const button = newDiv.querySelector('#button');
    button.addEventListener('click', logInFirebase)
    const iconGoogle = newDiv.querySelector('#google')
    iconGoogle.addEventListener('click', () => {
        logInGoogle()
        .then( (result) => {
            let user = result.user; //obj de informacion del user
            const objUser = {
                foto: user.photoURL,
                name: user.displayName,
                email: user.email,
                uid: user.uid
            }
            collectionUser(objUser)
            .then(() => {
                changeHash('#/post')
            })
        })
      })
    return newDiv;
}