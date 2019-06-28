import { errorUsername } from '../View_Controler.js/error.js'
import { changeHash } from '../View_Controler.js/view-Controle.js';

export default () => {
    const newDiv = document.createElement('div');
    newDiv.className='container_register'
    const viewRegister = `<form class= "form_register">
            <h1 class = 'form_titulo'>GREEN<img class='green' src="img/green.png"></h1>
            <h3 class = 'form_subtitulo'>¡Crea tu cuenta!</h3>
            <p id='parrafo2'></p>
            <input id = 'username' type= 'text' class= 'form_input' placeholder='nombre de usuario' pattern="[a-z]{1,15}" title="Us">
            <input id = 'email2' type= 'email' class= 'form_input' placeholder='email'>
            <input id = 'password2' type= 'password' class= 'form_input' placeholder='password'>
            <button id = 'button2' type= 'button' class= 'form_button'>Crear</button>
            <button id = 'btnReturn' type= 'button' class= 'form_button'>Regresar</button>
        </form>`
    newDiv.innerHTML = viewRegister;
    const button = newDiv.querySelector('#button2');
    button.addEventListener('click', errorUsername);
    const btnReturn = newDiv.querySelector('#btnReturn')
    btnReturn.addEventListener('click', () => {
        changeHash('#/home')
    })
    return newDiv;
}
