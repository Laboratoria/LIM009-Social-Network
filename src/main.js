// Este es el punto de entrada de tu aplicacion

import SignInForm from './view/SignInForm.js';
import Utils from './services/Utils.js';

const keyFirebase = () => {
    var config = {
        apiKey: "AIzaSyCkwXG7Zx6u0mEUPjzTL19bG6O8bLQSyZY",
        authDomain: "red-social-e9df5.firebaseapp.com",
        databaseURL: "https://red-social-e9df5.firebaseio.com",
        projectId: "red-social-e9df5",
        storageBucket: "red-social-e9df5.appspot.com",
        messagingSenderId: "258184809756"
      };
      firebase.initializeApp(config);
}

keyFirebase();

const routes = {
    '/': SignInForm
    // , '/register': SignUpForm
    // , '/login': login
    // , '/post': p                                                                                                     ost
  };
  
   export const router = async() => {
        const content = null || document.getElementById('page_container');
        content.innerHTML = await SignInForm.render();
        // console.log('yo pinto');
        await SignInForm.after_render();

        console.log('agrego eventos');
        

        let request = Utils.parseRequestURL();
        let currentURL = (request.resource ? '/' + request.resource : '/');
        let currentPage = routes[currentURL] ? routes[currentURL] : Error404;
        content.innerHTML = await currentPage.render();
        await currentPage.after_render();

  };
  
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);