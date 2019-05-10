import { components } from '../view/index.js'
import { getData, getUserActive } from '../controller/controller1.js'
const changeview = (route) => { 
    const root = document.getElementById("root");
    console.log (route);
    root.innerHTML = '';
    switch (route) {
        case '':
             root.appendChild(components.login());
            break;
        case '#/registro':
            root.appendChild(components.registro());
            break;
        case '#/user-profile':
            {
                const userInfo =(user)=>{
                    if (user) {
                         const uid = user.uid;
                        getData(uid) 
                        .then((data) => {
                            root.appendChild(components.profile(data))
                        })
                    } else {
                        console.log("no hay usuario");
                    }

                
                }
                getUserActive(userInfo);
                
            }
            break;
        case '#/configuration':
            root.appendChild(components.config());
        default:
            { return root.appendChild(components.error()) }
    }
};

export { changeview };
