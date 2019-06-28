import home from '../View/home.js';
import register from '../View/register.js';
import post from '../View/post.js';
import { readOneUser, readData } from '../firestore.js';
import { observer } from '../firebase.js';
import postBlock from '../View/post-block.js'

const changeView = (route) => {
    const root = document.getElementById('root');
    root.innerHTML = '';
    switch (route) {

        case '': {
            root.appendChild(home());
            break;
        }
        case '#/register': {
            root.appendChild(register());
            break;
        }
        case '#/post': {
            observer((user) => { //observador del user
                if (user) {
                    readOneUser(user.uid) //obj user según uid
                    .then((result) => {
                        if (result && result.exists) {
                            root.appendChild(post(result.data()));
                           
                            readData((query) => {
                                postBlock(query, user.uid)
                            });
                            //data del objeto user de firebase
                        }
                    })
                }
                else {
                }
            })
            break;
        }
        default: {
            root.appendChild(home());
        }
    }
}

export { changeView };