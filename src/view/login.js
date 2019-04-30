import { email, google, facebook, newVista } from "../controller/view-Controller.js";

export default () => {
  const formLogin = document.createElement("form");
  const templateFormLogin = `
    <h1>HIPAR-LOGIN</h1>
    <div>
      <input type="email" id="email-id" />
      <input type="password" id="password-id" />
      <button type="button" id="btn-sing-in">enviar</button>
      <button type="button" id="btn-google">iniciar con google</button>
      <button type="button" id="btn-facebook">iniciar con facebook</button>   
      <p>Si no tienes una cuenta</p><a>Regístrate</a>
    </div>
  `;
  formLogin.innerHTML = templateFormLogin;
  // document.getElementById("root").appendChild(formLogin);
  const btnSingIn = formLogin.querySelector("#btn-sing-in");
  const valueEmail = formLogin.querySelector("#email-id").value;
  const password = formLogin.querySelector("#password-id").value;
  const btnFacebook = formLogin.querySelector('#btn-facebook');
  const btnGoogle = formLogin.querySelector('#btn-google');
  btnSingIn.addEventListener("click", email(valueEmail, password));
  btnGoogle.addEventListener('click', google());
  btnFacebook.addEventListener('click', facebook());
  const btnNewPage = formLogin.querySelector('#btn-new-page');
  btnNewPage.addEventListener('click', newVista());
  return formLogin;
};
