import  {registerUser}  from '../controller/view-controller.js'

export default () => {
const formRegister = document.createElement('form');
const templateRegister = `<div><input type="email" id="email-register" />
<input type="password" id="password-register" />
<button type="button" id="btn-register">Registrarse</button>
</div>`;
formRegister.innerHTML = templateRegister;
const btnRegister = formRegister.querySelector('#btn-register');
// const btnRegister = formRegister.querySelector('#btn-register');
const emailRegister = formRegister.querySelector('#email-register');
const passwordRegister = formRegister.querySelector('#password-register');

btnRegister.addEventListener('click',()=>{
    // console.log(emailRegister.value);
    // console.log(passwordRegister.value)
    registerUser(emailRegister.value,passwordRegister.value)
})
// btnRegister.addEventlistener('click', ()=>{
//     console.log('holaaaaaaa')
// });
console.log(formRegister)
return formRegister;

};