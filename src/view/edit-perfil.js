import { editPErfilUser } from '../controller/view-controller.js';
import { updatePhoto } from '../model/model.js';
import { imageFirestore, getUserReady } from '../lib/comple-firebase.js';

export default () => {
  const formPerfil = document.createElement('form');
  const templateEditPerf = `
  <div>
    <header>
      <ul class = 'header style-header-perfil'>
          <li><a id = 'edit-perfil' href='#/welcomeUser' class='color-white'>Home</a></li>
          <li><img src=""></li>
          <li><a id='sign-out'>Cerrar Sesión</a></li>
      </ul>
    </header>
    <div  class = 'col-6 container col-xs-12 center'>
        <aside class=''>          
         <article class = ''>
            <section class = 'header-perfil center'>
            <h1> EDITAR MIS DATOS :</h1>                     
           </section>
           <section id = 'new-photo' class = 'margin-top'>
           
           <div class = 'col-9 style-color-header'>
           <label  class = 'block center margin-top'>Editar nombre usuario: </label>
            <input id = 'name-user-edit' class='style-input center block border' placeholder ='Escriba su nombre'></input>
            <label  class = 'block margin-top'>Editar email: </label>
            <input id = 'email-email-edit' class='style-input center block border' placeholder ='Escriba su email'></input>  
            <button type="button" id="btn-edit" class='center style-btn-login block border' >Guardar</button>  
            <label  class = 'block'>Editar mi foto: </label>  
            <progress value="0" max="100" id="uploader" class = 'margin-top border'>0%</progress>
            <input type="file" value="upload" id="file-button" class='center  block border margin-top' />  
            </div>          
           </section>           
         </article>
        </aside>           
      </div>
    </div>
        `
        ;
  formPerfil.innerHTML = templateEditPerf;
  formPerfil.classList.add("width-100", "height-100");
  const name = formPerfil.querySelector('#name-user-edit');
  const email = formPerfil.querySelector('#email-email-edit');
  const btnEdit = formPerfil.querySelector('#btn-edit');
  const uploader = formPerfil.querySelector('#uploader');
  const fileButton = formPerfil.querySelector('#file-button');
  const getUserIdEdit = (idUser) => {
    btnEdit.addEventListener('click', () => {
      editPErfilUser(idUser, name.value, email.value);
    });
    fileButton.addEventListener('change', (e) => {
      let file = e.target.files[0];
      const getImage = (image) => {
        updatePhoto(idUser, image);
      };
      imageFirestore(file, uploader, getImage);
    });
  };
  getUserReady(getUserIdEdit);
  return formPerfil;
};