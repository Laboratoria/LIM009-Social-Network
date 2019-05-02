import { email, google, facebook } from "../controller/view-Controller.js";

export default () => {
  const formLogin = document.createElement("div");
  const templateFormLogin = `
  <div class= 'col-12 col-xs-12'>
  <aside class = 'col-lg-6 col-xs-12 center'>
  <header><img src="./image/apego.jpg" alt="educacion" class='block center'>
  </aside>
  <form class= 'col-lg-6 col-xs-12 center'>
  <img src="./image/logo.png" alt="educacion" class='block center'>
  <h2 class='center'> < Edu-Resp > </h2></header>
  <article>
  <input type="email" id="email-id" class='style-input center block border' placeholder ='Email'/>
    <input type="password" id="password-id" class='style-input center block border' placeholder ='Password'/>
    <button type="button" id="btn-sing-in" class='center style-btn-login block border' >Log in</button>
    <p>De manera opcional ingresa con :</p>
   <span class = 'center'>
   <img id="btn-google" class='btn-rss' alt="icono de google" height="36" width="36" src="./css/google-plus.png"/>
   <img id="btn-facebook" class='btn-rss' alt="icono de facebook" height="36" width="36" src="https://2.bp.blogspot.com/-28mh2hZK3HE/XCrIxxSCW0I/AAAAAAAAH_M/XniFGT5c2lsaVNgf7UTbPufVmIkBPnWQQCLcBGAs/s1600/facebook.png"/>
   </<span>
  </article>
    <button id = 'btn-new-page' class='style-login'>holaaa</button> 
  <footer><span><p class= 'style-register'>Si eres usuario nuevo, </p> <a href='#/registerUser' class= 'style-register'>Regístrate</a></span></footer>
        
    </form>
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
  btnGoogle.addEventListener("click", google);
  btnFacebook.addEventListener("click", facebook);
  // const btnNewPage = formLogin.querySelector('#btn-new-page');
  // btnNewPage.addEventListener('click', newVista());
  return formLogin;
};


// {/* <button type="button">f</button> */}