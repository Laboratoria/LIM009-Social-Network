import { postFirestore, changeHash } from '../View_Controler.js/view-Controle.js';
import { signOut } from '../firebase.js';

export default (obj) => {
    const newDiv = document.createElement('div');
    newDiv.className = 'container'
    const textBox = `
    <header>
      <p id='name'>${obj.name}</p>
      <p id='title'>GREEN<img class='green' src="img/green.png"></p>
      <button id="signOut" type="button" >Cerrar Sesión</button>
    </header>
    <section class='container_post'>
    <div class='form_profile'>
      <img id='profile_img'src="${obj.foto === '' ? 'img/user.png' : obj.foto}" alt="avatar"/>
      <p id='profile_name'>${obj.name}</p>
      <p id='profile_email'>${obj.email}</p>
    </div>           
    <div class='form_postBlock'>
      <div class='post_header'>
        <textarea id ="post" class='estilotextarea' placeholder="Escribe aquí tu nuevo post" name="texto" spellcheck="true"></textarea>
        <select id='estado'>
          <option value='' disabled selected>Estado</option>
          <option value='Público'>Público</option>
          <option value='Privado'>Privado</option>
        </select>
        <button id="buttonPost" type= "button" >Compartir</button>
        <p id="msmError"></p>
      </div>
      <div id="containerPost" class='post_body'></div>
    </div>
    </section>
  `
    newDiv.innerHTML = textBox;

    const button = newDiv.querySelector('#buttonPost');
    button.addEventListener('click', () => {
        const error = document.getElementById('msmError');
        error.innerHTML = '';
        postFirestore(obj)
    })

    const btnSignOut = newDiv.querySelector('#signOut')
    btnSignOut.addEventListener('click', () => {
        signOut()
            .then(() => {
                changeHash('')
            })
    })
    return newDiv;
}



