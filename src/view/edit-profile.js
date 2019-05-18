
import { signOutUser,editProfile } from "../controller/controller1.js";
export default (user) => {
    console.log(user)
    const divElement = document.createElement("div");
    divElement.setAttribute("class", "container");
    divElement.innerHTML = ` 
    <header class="header">
    <ul class="menu">
        <li class="small"><input type="checkbox" name="list" id="nivel1-1"><label for="nivel1-1">${user.name}</label>
            <ul class="interior">
                <li><a href="#/configuration">Configurar cuenta</a></li>
                <li><a href="#/user-profile">Página de Inicio</a></li>
                <li><a id="sign-out-list" class="sign-out-list" href="#/privacity">Configuracion de la Privacidad</a></li>
            </ul>
        </li>
        <li class="title"><h1>Breath Life</h1></li>
        <li id="sign-out" class="small sign-out"><a>Cerrar sesión</a></li>
    </ul>
</header>
<main class="right ancho">
    <h3> Respira salud, respira vida </h3>
    <div class="formulario acceder" id="edit-form">
    <div class="element"><img id="user-image" class="image-photo" src="${user.photo}" alt="default photo"></div>    
    <div id="full-name" class="Name input redondear" >${user.name}</div>
    <div id="email" class="input redondear" >${user.email}</div>
    <button type="button" class="button-acceder redondear boton" id="btn-edit-profile">Editar Datos</button>
    <button type="button" class="button-acceder redondear boton" id="btn-save-profile">Guardar Datos</button>
    <div></div>
</div>
    </main>`;
    const signOutOption = divElement.querySelector("#sign-out");
    signOutOption.addEventListener("click", signOutUser);
    const btnSave=divElement.querySelector('#btn-save-profile');
    const editProfileButton=divElement.querySelector('#btn-edit-profile');
    const email=divElement.querySelector('#email');
    const fullName=divElement.querySelector('#full-name');
    editProfileButton.addEventListener('click',()=>{
    fullName.setAttribute('contenteditable',true);
    email.setAttribute('contenteditable',true);});

  btnSave.addEventListener('click',()=>{
    fullName.setAttribute('contenteditable',false);
    email.setAttribute('contenteditable',false); 
    const newFullName=fullName.textContent;
const newEmail=email.textContent;
console.log(newFullName);
console.log(newEmail);
editProfile(newEmail,newFullName,user.userId);
  

    });

   
    return divElement;
  };