import {getDataDoc,updateDatos} from '../model/model.js'

export default () => {
    const welcome = document.createElement('div');
    const templateWelcome = `
   <p>Name</p>
   <span id="user-name"></span>
   <p>Foto</p>
   <span id="user-photo"></span>
   <p>E-mail</p>
   <span id="user-email"></span>
   `;
    welcome.innerHTML = templateWelcome; 
    return welcome;
};


