import login from "./view/login.js"
import register  from './view/pagesRegister.js'
import welcomeUser from './view/welcomeUser.js'
import { setUpPost } from "./controller/view-controller.js";

const infoUser = () => {
  firebase.auth().onAuthStateChanged(user => {
      if(user) {
        let db = firebase.firestore();
        db.collection('posts').onSnapshot(snapshot => {
        setUpPost(snapshot.docs);
        });
        welcomeUser(user);
      } else {
        welcomeUser(null);
      }
  })
};

const changeTmp = (hash) => {
  if (hash === '#/' || hash === '' || hash === '#') {
    return getRoute('#/login');
  } else if ( hash === '#/registerUser' || hash === '#/welcomeUser' ) {
    return getRoute(hash);
  } else {
    return getRoute('#/login');
  }
}

const getRoute = routers => {
  const router = routers.substr(2, routers.length - 2)
  const root = document.getElementById('root');
  root.innerHTML = '';
  switch (router) {
    case 'login':
      root.appendChild(login());
    break;
    case 'registerUser': root.appendChild(register());
      break;
    case 'welcomeUser': infoUser();
    // getDataDoc(getUserUid())
    // .then(data => {
    // return root.appendChild(welcomeUser(data));
    // })
    break;
  }
};



export const setRoute = () => {
  window.addEventListener('load', changeTmp(window.location.hash))
  if (("onhashchange" in window)) window.onhashchange = () => changeTmp(window.location.hash)
  // return window.addEventListener("load", getRoute(location.href));
};

  
 




// export { changeview };
  
  // if (router === 'login') {
  //   root.appendChild(login());
  //   // console.log(login)
  //   // root.
  // }
  // switch (router) {
  //   // case 'home':
  //   //   getNotes((notes) => {
  //   //     root.innerHTML = '';        
  //   //     root.appendChild(Home(notes));  
  //   //   })
  //   //   break;
  //   case 'login':
  //     root.appendChild(Login);
  //     break;
  //   default:
  //     root.appendChild(login);
  //     break;
  // }


/* import Inite from './templates/pagInite.js';
import Login from './templates/pagLogin.js';
import Register from './templates/pagRegister.js';
import Home from './templates/home.js';
import Post from './templates/post.js';
import CommentPost from './templates/commentPost.js';

import {editCreatePost, idPostCommentGlobal} from './view-controller.js';

const changeTmp = (hash) => {
  if (hash === '#/' || hash === '' || hash === '#') {
    return viewTmp('#/inite');
  } else if (hash === '#/pagIniteSesion' || hash === '#/pagRegister'||
  hash === '#/home' || hash === '#/createPost' || hash === '#/updatePost' || hash === '#/createPostComment') {
    return viewTmp(hash);
  } else {
    return viewTmp('#/inite');
  }
};

const viewTmp = (routers) => {
  const router = routers.substr(2, routers.length - 2);
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (router) {
  case 'inite':
    Inite(); break;
  case 'pagIniteSesion':
    Login(); break;
  case 'pagRegister':
    Register(); break;
  case 'home':
    Home(); break;
  case 'createPost':
    Post(editCreatePost); break;
  case 'createPostComment':
    CommentPost(idPostCommentGlobal); break;
  default:
    Inite(); break;
  }
};

export const initRouter = () => {
  window.addEventListener('load', changeTmp(window.location.hash));
  if (('onhashchange' in window)) window.onhashchange = () => changeTmp(window.location.hash);
}; */