import { components } from '../view/index.js'
import { getData, getUser } from '../controller/controller1.js'
const changeview = (route) => { 
    const root = document.getElementById("root");
    root.innerHTML = ''; 
    switch (route) {
        case '':
            { return components.login() };
        case '#/registro':
            { return root.appendChild(components.registro()) };
        case '#/user-profile':
            {
                getData(getUser().uid)
                    .then((data) => {
                        return root.appendChild(components.profile(data))
                    })
            }
            break
        case '#/configura':
            {
               getData(getUser().uid)
                .then((data) => {
                return root.appendChild(components.configurar(data))
              }) 
            }
            break
        default:
            { return root.appendChild(components.error()) }
    }
};

export { changeview };