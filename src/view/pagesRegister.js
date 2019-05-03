import  {registerUser}  from '../controller/view-controller.js'

export default () => {
const formRegister = document.createElement('form');
const templateRegister = `<div><input type="email" id="email-register" />
<input type="password" id="password-register" />
<button type="button" id="btn-register">Registrarse</button>
</div>`;
formRegister.innerHTML = templateRegister;

const btnRegister = formRegister.querySelector('#btn-register');
btnRegister.addEventListener('click', registerUser)
return formRegister;
};