import login from "./view/login.js";
import register from './view/pagesRegister.js';
import welcomeUser from './view/welcomeUser.js';
import { setUpPost } from "./controller/view-controller.js";
import editPerfil from './view/edit-perfil.js';
import error from './view/page-error.js';
import { getUserReady } from "./lib/comple-firebase.js";

const getUserActiv = (user) => {
  welcomeUser(user);
  setUpPost(user);
};

const changeTmp = (hash) => {
  if (hash === '#/' || hash === '' || hash === '#') {
    return getRoute('#/login');
  } else if (hash === '#/registerUser' || hash === '#/welcomeUser' || hash === '#/edit-perfil' || hash === '#/login') {
    return getRoute(hash);
  } else {
    return getRoute('#/page-error');
  }
};

const getRoute = routers => {
  const router = routers.substr(2, routers.length - 2);
  const root = document.getElementById('root');
  root.innerHTML = '';
  switch (router) {
  case 'login':
    root.appendChild(login());
    break;
  case 'registerUser': root.appendChild(register());
    break;
    // case 'welcomeUser': infoUser();
  case 'welcomeUser': getUserReady(getUserActiv);

    break;
  case 'edit-perfil': root.appendChild(editPerfil());
    break;
  default:
    return root.appendChild(error());
  }
};

export const setRoute = () => {
  window.addEventListener('load', changeTmp(window.location.hash));
  if (("onhashchange" in window)) window.onhashchange = () => changeTmp(window.location.hash);
};