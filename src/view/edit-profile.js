import { signOutUser,editProfile, } from "../controller/controller1.js";
export default (user) => {
    console.log(user)
    const divElement = document.createElement("div");
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
        <li id="sign-out" class="small sign-out"><a><img class="icons cerrar" src="./css/img/exit-2.png">Cerrar sesión</a></li>
        </ul>
    </header>
    <div class="container edit-body">
    <aside class="left ancho height-auto">
        <div class="image-left"><img class="image" src="./css/img/edit.jpg">
        <div class="element-photo"><img id="user-image" class="image-photo-edit " src="${user.photo}" alt="default photo">
        <img src="./css/img/photo-camera.png" class="change-photo" alt="Edit Image"></div>
        </div>       
    </aside>
    <main class="right edit-right">
    <div class="formulario1" id="edit-form">
    <div class="element-photo2"><img id="user-image" class="image-photo-edit " src="${user.photo}" alt="default photo">
    <img src="./css/img/photo-camera.png" class="photograph" alt="Edit Image"></div>
    </div>
    <div id="full-name" class="input2 redondear">${user.name}</div>
    <div id="user-age"   class="input2 redondear">${user.age}</div>
    <div id="user-sex"   class="input2 redondear">${user.sex}</div>
    <div id="user-birth-country"  class="input2 redondear">${user.country}</div>
    <button type="button" class="button-acceder redondear boton duo" id="btn-edit-profile">Editar Datos</button>
    <button type="button" class="button-acceder redondear boton duo" id="btn-save-profile">Guardar Datos</button>
    </div>
    </main>
    </div>
`;
/*   */
//
    const signOutOption = divElement.querySelector("#sign-out");
    signOutOption.addEventListener("click", signOutUser);
    const btnSave=divElement.querySelector('#btn-save-profile');
    const editProfileButton=divElement.querySelector('#btn-edit-profile'); 
    const fullName=divElement.querySelector('#full-name');
    const userAge=divElement.querySelector('#user-age');
    const userSex=divElement.querySelector('#user-sex');
    const userBirthCountry=divElement.querySelector('#user-birth-country');
    editProfileButton.addEventListener('click',()=>{
    fullName.setAttribute('contenteditable',true);
    userAge.setAttribute('contenteditable',true);
    userSex.setAttribute('contenteditable',true);
    userBirthCountry.setAttribute('contenteditable',true);

});

  btnSave.addEventListener('click',()=>{
    fullName.setAttribute('contenteditable',false);
    userAge.setAttribute('contenteditable',false);
    userSex.setAttribute('contenteditable',false);
    userBirthCountry.setAttribute('contenteditable',false);
const newFullName=fullName.textContent;

const newAge=userAge.textContent;
const newSex=userSex.textContent;
const newBirthCountry=userBirthCountry.textContent;

console.log(newFullName);
console.log(newAge);
console.log(newSex);
console.log(newBirthCountry);
editProfile(newFullName,newAge,newSex,newBirthCountry,user.userId);
    });

   
    return divElement;
  };