import { email, google, facebook } from "../controller/view-controller.js";

export default () => {
  const formLogin = document.createElement("div");
  const templateFormLogin = `
  <div class= 'container col-xs-12'>
  <aside class = 'col-lg-6 col-xs-12 '>
  <header><img src="./image/portada1.jpeg" class = 'img-login' alt="educacion" class=''>
  </aside>
  <form class= 'col-lg-6 col-xs-12 '>
  <img src="./image/logo.png" alt="educacion" class='block center img-logo'>
  <h2 class='center font-size-16'>"La infancia es fugaz. Que nuestra obsesión por corregirla no nos impida disfrutarla."</h2></header>
  <article>
    <input type="email" id="email-id" class='style-input center block border' placeholder ='Email'/>
    <input type="password" id="password-id" class='style-input center block border' placeholder ='Password'/>
    <button type="button" id="btn-sing-in" class='center style-btn-login block border' >Log in</button>
    <p>De manera opcional ingresa con : </p>
    <span class = 'center'>
      <img id="btn-google" class='btn-rss' alt="icono de google" src="./css/google-plus.png"/>
      <img id="btn-facebook" class='btn-rss' alt="icono de facebook"  src="https://2.bp.blogspot.com/-28mh2hZK3HE/XCrIxxSCW0I/AAAAAAAAH_M/XniFGT5c2lsaVNgf7UTbPufVmIkBPnWQQCLcBGAs/s1600/facebook.png"/>
    </span>
  </article>
    <footer><span><p class= 'style-register'>Si eres usuario nuevo, </p> <a href='#/registerUser' class= 'style-register'>Regístrate</a></span></footer>
    </form>
  </div>
  `;
  formLogin.innerHTML = templateFormLogin;
  // formLogin.classList.add('page-login');
  const btnSingIn = formLogin.querySelector("#btn-sing-in");
  const btnFacebook = formLogin.querySelector('#btn-facebook');
  const btnGoogle = formLogin.querySelector('#btn-google');
  btnSingIn.addEventListener('click', email);
  btnGoogle.addEventListener('click', google);
  btnFacebook.addEventListener('click', facebook);
  return formLogin;
};


